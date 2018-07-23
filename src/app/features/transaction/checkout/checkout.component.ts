import { AddShippingRequest, GetShippingResponse } from '@belisada/core/models/address/address.model';
import { AddressService } from './../../../core/services/address/address.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, NgForm, Validators } from '@angular/forms';
import { Province, City, District, Village } from '@belisada/core/models/store/address';
import { StoreService } from '@belisada/core/services';
import { PaymentService } from './../../../core/services/payment/payment.service';
import { Payment, PaymentList } from '@belisada/core/models/payment/payment.model';
import { ShoppingCartService } from '@belisada/core/services/shopping-cart/shopping-cart.service';
import { CheckoutTrx, UpdateShippingReq } from '@belisada/core/models/checkout/checkout-cart';
import { ShippingRate } from '@belisada/core/models/shopping-cart/delivery-option.model';
import { CheckoutService } from '@belisada/core/services/checkout/checkout.service';
import { CheckoutReq } from '@belisada/core/models/checkout/checkout-transaction';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
// import { CheckoutModel } from '@belisada/core/models/checkout/checkout-transaction';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  // ![(ngModel)]
  checkoutAddress: any = '';
  rates = [];
  shippingAddressDatas = [];
  shippingRates: string[];
  itemCartIds: number[];

  public formAddCrtl: FormGroup;
  provinces: Province[];
  cities: City[];
  districts: District[];
  villages: Village[];
  showDialogPilihAlamat: Boolean = false;
  simpan_sebagai: FormControl;
  penerima: FormControl;
  hp: FormControl;
  kodepos: FormControl;
  alamat: FormControl;

  listShip: GetShippingResponse[];
  listPayment: PaymentList[];
  payment: Payment[];

  isPayment: boolean;
  isNote: boolean;

  checkoutTrx: CheckoutTrx = new CheckoutTrx;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private storeService: StoreService,
    private addressService: AddressService,
    private paymentService: PaymentService,
    private shoppingCartService: ShoppingCartService,
    private checkoutService: CheckoutService
  ) {
    this.itemCartIds = [];
    this.shippingRates = [];
  }

  ngOnInit() {
    this.isNote = false;
    this.isPayment = false;
    this.getCartCheckout();
    this.formAdd();
    this.getProvince();
    this.onChanges();
    this.dataShipping();
    this.allPayment();
  }

  getCartCheckout() {
    this.shoppingCartService.getCartV2().subscribe(response => {
      this.checkoutTrx = response;

      response.cart.forEach((cart, index) => {
        cart.itemCartIds.forEach((item) => {
          if (this.itemCartIds.indexOf(item) === -1) { this.itemCartIds.push(item); }
        });
        this.shippingRates[index] = (cart.courierCode === '') ? '' : cart.courierCode + '~' + cart.courierService;
        console.log(this.shippingRates);
        this.shippingAddressDatas[index] = cart.destinations.find(x => x.shippingAddressId === cart.shippingAddressId);
        const queryParam = {
          itemCartIds: cart.itemCartIds,
          originId: cart.originId,
          destinationId: cart.destinationId,
          weight: cart.totalWeight
        };
        this.getShippingRates(queryParam, index, () => {});
      });
    });
  }

  allPayment() {
    this.paymentService.getPayment().subscribe(respon => {
    this.listPayment = respon[0].data;
    });
  }

  byTransfer() {
    this.isPayment = true;
    this.paymentService.getPayment().subscribe(respon => {
      this.listPayment = respon[0].data;
    });
  }

  byCart() {
    this.isPayment = true;
    this.paymentService.getPayment().subscribe(respon => {
    this.listPayment = respon[1].data;
    });
  }

  byInstan() {
    this.isPayment = true;
    this.paymentService.getPayment().subscribe(respon => {
    this.listPayment = respon[2].data;
  });
  }

  // dataShipping() {
  //   this.addressService.getShipping().subscribe(respon => {
  //     this.listShip = respon;
  //   });
  // }

  formAdd() {
      this.formAddCrtl = this.fb.group({
        simpan_sebagai: new FormControl(null, Validators.required),
        penerima: new FormControl(null, Validators.required),
        hp: new FormControl(null, Validators.required),
        kodepos: new FormControl(null, [Validators.required, Validators.minLength(5)]
        ),
        province: new FormControl(null, Validators.required),
        city: new FormControl(null, Validators.required),
        district: new FormControl(null, Validators.required),
        villageId: new FormControl(null,
            Validators.required,
        ),
        alamat: new FormControl(null, Validators.required),
    });
  }

  isFieldValid(field: string) {
    return !this.formAddCrtl.get(field).valid && this.formAddCrtl.get(field).touched;
  }

  onSent() {

    if (this.formAddCrtl.valid) {
      const data = new AddShippingRequest();
      data.address = this.formAddCrtl.value.alamat;
      data.addressName = this.formAddCrtl.value.simpan_sebagai;
      data.isDefault = false;
      data.name = this.formAddCrtl.value.penerima;
      data.phone = this.formAddCrtl.value.hp;
      data.postal = this.formAddCrtl.value.kodepos;
      data.villageId = this.formAddCrtl.value.villageId;

      this.addressService.addShipping(data).subscribe(respon => {
        if (respon.status === 1) {
          this.showDialogPilihAlamat = false;
          this.getCartCheckout();
        }
      });
    } else {
      this.validateAllFormFields(this.formAddCrtl);
    }

  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
        const control = formGroup.get(field);
        if (control instanceof FormControl) {
            control.markAsTouched({
                onlySelf: true
            });
        } else if (control instanceof FormGroup) {
            this.validateAllFormFields(control);
        }
    });
  }

  onChanges() {
    this.formAddCrtl.get('province').valueChanges.subscribe(val => {
        this.getCity(val);
    });
    this.formAddCrtl.get('city').valueChanges.subscribe(val => {
        this.getDistrict(val);
    });

    this.formAddCrtl.get('district').valueChanges.subscribe(val => {
        this.getVillage(val);
    });

    this.formAddCrtl.get('villageId').valueChanges.subscribe(val => {
      const postalCode = this.villages.find(x => x.villageId === val).postal;
      this.formAddCrtl.patchValue(
        {
          kodepos: postalCode,
        });
    });
  }

  getProvince() {
    this.storeService.getProvince('209').subscribe(data => {
        this.provinces = data;
    });
  }

  getCity(id) {
      this.storeService.getCity(id).subscribe(data => {
          this.cities = data;
      });
  }
  getDistrict(id) {
      this.storeService.getDistrict(id).subscribe(data => {
          this.districts = data;
      });
  }

  getVillage(id) {
      this.storeService.getVillage(id).subscribe(data => {
          this.villages = data;
          const model = this.formAddCrtl.value;
          const a = this.formAddCrtl.value.villageId = id.district;
      });
  }

  note() {
    this.isNote = true;
  }

  cancelNote() {
    this.isNote = false;
  }

  addressChange(event, itemCartIds, originId, weight, destinations, index) {
    const val = event.target.value;
    if (val === 'tambah') {
      this.showDialogPilihAlamat = !this.showDialogPilihAlamat;
    } else {
      this.shippingAddressDatas[index] = destinations.find(x => x.shippingAddressId === +val);
      const queryParam = {
        itemCartIds: itemCartIds,
        originId: originId,
        destinationId: this.shippingAddressDatas[index].destinationId,
        weight: weight
      };
      this.getShippingRates(queryParam, index, (rates) => {
        console.log('rate: ', rates);
        console.log(rates.courierCode + '~' + rates.courierService + '--------' + this.shippingRates[index]);
        const isShipFound = rates.some(x => x.courierCode + '~' + x.courierService === this.shippingRates[index]);
        if (isShipFound) {
          this.updateShipping(itemCartIds, index);
        } else {
          this.shippingRates[index] = '';
          this.updateShipping(itemCartIds, index);
        }
      });
    }
  }

  shippingChange(itemCartIds, index) {
    this.updateShipping(itemCartIds, index);
  }

  updateShipping(itemCartIds, index) {
    const data: UpdateShippingReq = new UpdateShippingReq();
    console.log('this.shippingRates[index]: ', this.shippingRates[index]);
    data.courierCode = this.shippingRates[index].split('~')[0];
    data.courierService = this.shippingRates[index].split('~')[1];
    data.itemCartIds = itemCartIds;
    data.shippingAddressId = this.shippingAddressDatas[index].shippingAddressId;
    this.shoppingCartService.updateShipping(data).subscribe(response => {
      if (response.status === 1) {
        this.getCartCheckout();
        this.dataShipping();
      }
    });
  }

  getShippingRates(queryParam, index, callbackSc) {
    this.shoppingCartService.getShippingRates(queryParam).subscribe(response => {
      this.rates[index] = response;
      console.log('this.rates: ', this.rates);
      return callbackSc(response);
    });
  }

  doCheckout() {
    const data: CheckoutReq = new CheckoutReq();
    data.itemCartIds = this.itemCartIds;
    data.paymentMethodCode = 'BT';
    this.checkoutService.doCheckout(data).subscribe(response => {
      if (response.status === 1) {
        this.shoppingCartService.empty();
        this.router.navigateByData({
          url: ['/transaction/terimakasih'],
          data: response.data,
        });
        // this.router.navigateByUrl('/transaction/terimakasih');
      } else {
        swal('belisada.id', response.message, 'error');
      }
    });
  }

  dataShipping() {
    this.checkoutService.getShippingAddress().subscribe(response => {
      console.log('response: ', response);
    });
  }

  deleteCart(id, prodId, quantity) {
    swal({
      title: 'belisada.co.id',
      text: 'Apakah anda ingin menghapus item ini?',
      type: 'question',
      showCancelButton: true,
      confirmButtonText: 'Iya',
      cancelButtonText: 'Tidak',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.shoppingCartService.deleteCart(id).subscribe(response => {
          console.log('deleteCart response: ', response);
          if (response.status === 1) {
            swal(
              'Success!',
              'Item berhasil di hapus.',
              'success'
            );
            this.shoppingCartService.addItem(prodId, -quantity);
            this.getCartCheckout();
          } else {
            swal(
              'Error!',
              response.message,
              'error'
            );
          }
        });
      }
    });
  }

  decreaseQty(cartItem) {
    if (cartItem.quantity > 1) {
      const data = {
        itemCartId: cartItem.itemCartId,
        note: '',
        quantity: --cartItem.quantity
      };
      this.shoppingCartService.updateCart(data).subscribe(response => {
        if (response.status === 1) {
          this.shoppingCartService.updateQuantity(cartItem.productId, -1);
          this.getCartCheckout();
        }
      });
    }
  }

  increaseQty(cartItem) {
    const data = {
      itemCartId: cartItem.itemCartId,
      note: '',
      quantity: ++cartItem.quantity
    };
    this.shoppingCartService.updateCart(data).subscribe(response => {
      if (response.status === 1) {
        this.shoppingCartService.updateQuantity(cartItem.productId, +1);
        this.getCartCheckout();
      }
    });
  }
}
