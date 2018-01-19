import swal from 'sweetalert2';
import { Component, OnInit, NgZone, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShippingAddressService } from '../../../../core/service/shipping-address/shipping-address.service';
import { ShippingAddress } from '../../../../core/model/shipping-address';
import { BilingAddressService } from '../../../../core/service/billing-address/biling-address.service';
import { BillingAddress } from '../../../../core/model/billing-address';
import { ShareService } from '../../../../core/service/shared.service';
import { Title } from '@angular/platform-browser';
import { Checkout } from '../../../../core/model/checkout';
import { LocalStorageService } from '../../../../core/service/storage.service';

const CHECKOUT_KEY  = 'checkout';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {

  private storage: Storage;

  shippingAddress: ShippingAddress;
  shippingAddressList: ShippingAddress[];

  billingAddress: BillingAddress;
  billingAddressList: BillingAddress[];

  selShippingAddress: any = '';
  selBillingAddress: any = '';
  totalbilling: BillingAddress[];
  isTriggered: Boolean = false;
  billing: Boolean = false;
  first: Boolean;
  second: Boolean;


  constructor(
    private router: Router,
    private ngZone: NgZone,
    private title: Title,
    private storageService: LocalStorageService,
    private shareService: ShareService,
    private shippingAddressService: ShippingAddressService,
    private bilingAddressService: BilingAddressService
  ) {
    this.storage = this.storageService.get();
  }

  ngOnInit() {

    this.title.setTitle('Belisada - Shipping & Billing Address');
    this.getAllShippingAddress();

    this.bilingAddressService.getAll().subscribe(datas => {
      this.ngZone.run(() => {
        this.shareService.shareData = datas;
        this.billingAddressList = this.shareService.shareData;
        if (this.billingAddressList.length === 0) {
          this.billing = true;
        }
        console.log('this.billingAddressList: ', this.billingAddressList);
      });
    });
  }

  receiveTrigger($event) {
    this.getAllShippingAddress();
  }

  getAllShippingAddress() {
    this.shippingAddressService.getAll().subscribe(datas => {
      this.ngZone.run(() => {
        this.shareService.shareData = datas;
        this.shippingAddressList = this.shareService.shareData;
      });
    });
  }

  getShippingAddress(selShippingAddress) {
    this.shippingAddress = this.shippingAddressList.find(x => x.addressId === +selShippingAddress);
  }

  getBillingAddress(selBillingAddress) {
    this.billingAddress = this.billingAddressList.find(x => x.addressId === +selBillingAddress);
  }

  getCheckout() {
    const checkout = new Checkout();
      const storedCheckout = this.storage.getItem(CHECKOUT_KEY);
      if (storedCheckout) {
        checkout.updateFrom(JSON.parse(storedCheckout));
    }
    return checkout;
  }

  next() {
    if (this.shippingAddress && this.billingAddress) {
      const checkout = this.getCheckout();
      checkout.shippingAddress = this.shippingAddress.addressId;
      checkout.billingAddress = this.billingAddress.addressId;
      this.storage.setItem(CHECKOUT_KEY, JSON.stringify(checkout));
      this.router.navigateByUrl('/payment-method');
    } else {
      swal('Pastikan anda memilih alamat pengiriman dan alamat penagihan');
    }
  }

  prev() {
    this.router.navigateByUrl('/cart');
  }
}