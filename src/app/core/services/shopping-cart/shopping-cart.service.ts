import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import {
    ShoppingCart, AddToCartRequest, AddToCartResponse,
    CartItemResponse,
    DeleteCartResponse
  } from '@belisada/core/models/shopping-cart/shopping-cart.model';
import { DeliveryOption, ShippingRate } from '@belisada/core/models/shopping-cart/delivery-option.model';
import { StorageService } from '@belisada/core/services/local-storage/storage.service';
import { ProductService } from '@belisada/core/services/product/product.service';
import { CartItem } from '@belisada/core/models/shopping-cart/cart-item.model';
import { Router } from '@angular/router';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Configuration } from '@belisada/core/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert2';
import { BaseResponseModel } from '@belisada/core/models';
import { AuthService } from '@belisada/core/services/auth/auth.service';
import { CheckoutTrx, UpdateShippingReq, UpdateShippingRes, UpdateCartReq } from '@belisada/core/models/checkout/checkout-cart';

const CART_KEY = 'cart';
const CART_POST_KEY = 'cartpost';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private storage: Storage;
  private subscriptionObservable: Observable<ShoppingCart>;
  private subscribers: Array<Observer<ShoppingCart>> = new Array<Observer<ShoppingCart>>();

  public constructor(
    private http: HttpClient,
    private configuration: Configuration,
    private storageService: StorageService,
    private productService: ProductService,
    private routes: Router,
    private authService: AuthService) {

      this.storage = this.storageService.get();

      this.subscriptionObservable = new Observable<ShoppingCart>((observer: Observer<ShoppingCart>) => {
        this.subscribers.push(observer);
        observer.next(this.retrieve());
        return () => {
          this.subscribers = this.subscribers.filter((obs) => obs !== observer);
        };
      });
  }

  public get(): Observable<ShoppingCart> {
    return this.subscriptionObservable;
  }

  public addItem(productId: number, quantity: number, itemCartId?: number): void {

    const cart = this.retrieve();
    let item = cart.items.find((p) => p.productId === productId);
    if (item === undefined) {
      item = new CartItem();
      item.productId = productId;
      if (itemCartId) {
        item.itemCartId = itemCartId;
      }
      cart.items.push(item);
    }

    item.quantity += quantity;
    cart.items = cart.items.filter((cartItem) => cartItem.quantity > 0);
    if (cart.items.length === 0) {
      cart.freightRate = undefined;
      this.empty();
    }

    this.calculateCart(cart, (modifiedCart, prod) => {
      this.save(modifiedCart);
      this.dispatch(modifiedCart);
      if (quantity > 0) {
        this.popupSuccess(prod);
      }
    });
  }

  public updateQuantity(productId: number, quantity: number) {
    const cart = this.retrieve();
    let item = cart.items.find((p) => p.productId === productId);
    if (item === undefined) {
      item = new CartItem();
      item.productId = productId;
      cart.items.push(item);
    }

    item.quantity += quantity;
    cart.items = cart.items.filter((cartItem) => cartItem.quantity > 0);
    if (cart.items.length === 0) {
      cart.freightRate = undefined;
    }

    this.calculateCart(cart, (modifiedCart) => {
      this.save(modifiedCart);
      this.dispatch(modifiedCart);
    });
  }

  public empty(): void {
    const newCart = new ShoppingCart();

    this.storage.setItem(CART_KEY, JSON.stringify(newCart));
    this.storage.setItem(CART_POST_KEY, JSON.stringify(newCart));

    this.save(newCart);
    this.dispatch(newCart);
  }

  public setDeliveryOption(deliveryOption: DeliveryOption): void {
    const cart = this.retrieve();
    this.calculateCart(cart, (modifiedCart) => {
      this.save(modifiedCart);
      this.dispatch(modifiedCart);
    });
  }

  private calculateCart(cart: ShoppingCart, calculateCartCb): void {
    cart.itemsTotal = 0;
    cart.deliveryTotal = 0;
    cart.items.forEach((item, index) => {
      this.productService.get(item.productId)
      .subscribe(product => {
        const prod = product.data;
        prod.weight = (prod.weight === 0) ? 1 : prod.weight;
        cart.itemsTotal += item.quantity * ((prod.specialPrice > 0) ? prod.specialPrice : prod.pricelist);
        cart.deliveryTotal +=
          (cart.freightRate === undefined) ? 0 : cart.freightRate.amount * item.quantity * prod.weight;
        cart.grossTotal = cart.itemsTotal + cart.deliveryTotal;
        if (index === (cart.items.length - 1)) {
          return calculateCartCb(cart, prod);
        } else {
          return;
        }
      });
    });
  }

  private retrieve(): ShoppingCart {
    const cart = new ShoppingCart();
    const storedCart = this.storage.getItem((this.authService.getToken()) ? CART_POST_KEY : CART_KEY);
    if (storedCart) {
      cart.updateFrom(JSON.parse(storedCart));
    }

    return cart;
  }

  private popupSuccess(prod) {
    swal({
      html:
        `<div class="add-to-card-info">
          <div class="">
            <img class="ui image" src="` + prod.imageUrl + `"/>
          </div>
          <div class="detail-add-to-cart">
            <div class="detail-add-to-cart-container">
              <span class="name-added-to-cart">` + prod.name + `</span>
              <span class="added-to-cart">WAS ADDED TO YOUR CART</span>
            </div>
          </div>
        </div>
        `,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      buttonsStyling: false,
      confirmButtonClass: 'bs-btn btn-modal-view-cart',
      cancelButtonClass: 'bs-btn btn-modal-contionue-shopping',
      confirmButtonText:
        `View Cart`,
      cancelButtonText:
        `Continue to Shop`,
    }).then((result) => {
      if (result.value) {
        this.routes.navigateByUrl('/transaction/checkout');
      }
    });
  }

  private save(cart: ShoppingCart): void {
    this.storage.setItem((this.authService.getToken()) ? CART_POST_KEY : CART_KEY, JSON.stringify(cart));
  }

  public dispatch(cart: ShoppingCart): void {
    this.subscribers
        .forEach((sub) => {
          try {
            sub.next(cart);
          } catch (e) {
            // we want all subscribers to get the update even if one errors.
          }
        });
  }

  public retrievePostLogin(cbSuccess) {
    const cart = new ShoppingCart();
    this.getSingleResult().subscribe(response => {
      cart.grossTotal = response.grandTotal;
      cart.deliveryTotal = response.deliveryTotal;
      cart.itemsTotal = response.grandTotal;

      response.items.forEach((item, index) => {
        const cartItem = new CartItem();
        cartItem.productId = item.productId;
        cartItem.quantity = item.quantity;
        cart.items.push(cartItem);
        if (index === (response.items.length - 1)) {
          return cbSuccess(cart);
        } else {
          return;
        }
      });
    });
  }

  // !------ SHOPPING CART HIT API ------
  getSingleResult(): Observable<CartItemResponse> {
    return this.http.get(this.configuration.apiURL + '/buyer/cart/simple')
      .pipe(
        map(response => response as CartItemResponse)
      );
  }

  create(data: AddToCartRequest): Observable<AddToCartResponse> {
    return this.http.post(this.configuration.apiURL + '/buyer/cart/create', data)
      .pipe(
        map(response => response as AddToCartResponse)
      );
  }

  delete(id: number): Observable<BaseResponseModel> {
    return this.http.delete(this.configuration.apiURL + '/delete/' + id)
      .pipe(
        map(response => response as BaseResponseModel)
      );
  }

  getShippingRates(queryParams: Object): Observable<ShippingRate[]> {
    let params = new HttpParams();
    Object.keys(queryParams).forEach(function(k) {
      params = params.append(k, queryParams[k]);
    });
    return this.http.get(this.configuration.apiURL + '/rates/v2', { params: params })
      .pipe(
        map(response => response as ShippingRate[])
      );
  }

  getCartV2(): Observable<CheckoutTrx> {
    return this.http.get(this.configuration.apiURL + '/buyer/cart/v2')
      .pipe(
        map(response => response as CheckoutTrx)
      );
  }

  updateCart(data: UpdateCartReq): Observable<UpdateShippingRes> {
    return this.http.post(this.configuration.apiURL + '/buyer/cart/itemcart/update', data)
      .pipe(
        map(response => response as UpdateShippingRes)
      );
  }

  updateShipping(data: UpdateShippingReq): Observable<UpdateShippingRes> {
    return this.http.post(this.configuration.apiURL + '/buyer/cart/shipping/update', data)
      .pipe(
        map(response => response as UpdateShippingRes)
      );
  }

  deleteCart(id: number): Observable<DeleteCartResponse> {
    return this.http.delete(this.configuration.apiURL + '/buyer/cart/delete/' + id)
      .pipe(
        map(response => response as DeleteCartResponse)
      );
  }

  updateNote(data): Observable<UpdateShippingRes> {
    return this.http.post(this.configuration.apiURL + '/buyer/cart/itemcart/update/note', data)
      .pipe(
        map(response => response as UpdateShippingRes)
      );
  }
}
