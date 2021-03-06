import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CheckoutService } from '@belisada/core/services/checkout/checkout.service';
import { SuccessTransactionRes, SuccessTransactionData, ListBankAccount } from '@belisada/core/models/checkout/checkout-transaction';
import { PaymentService } from '@belisada/core/services/payment/payment.service';
import { PaymentList } from '@belisada/core/models/payment/payment.model';
@Component({
  selector: 'app-terimakasih-page',
  templateUrl: './terimakasih-page.component.html',
  styleUrls: ['./terimakasih-page.component.scss']
})
export class TerimakasihPageComponent implements OnInit {
  public _trialEndsAt;

  status_code: any;

  successTransactionRes: SuccessTransactionRes = new SuccessTransactionRes();
  listPayment: PaymentList[];
  expiredTimeIndo: any;
  constructor(
    private router: Router,
    private checkoutService: CheckoutService,
    private activatedRoute: ActivatedRoute,
    private paymentService: PaymentService
  ) {
    this.successTransactionRes.data = new SuccessTransactionData();
    this.successTransactionRes.data.bankAccount = new ListBankAccount();
  }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.checkoutService.getSuccessTransaction(params['order_id']).subscribe(response => {
        if (params['status_code']) {
          this.status_code = params['status_code'];
        } else {
          this.status_code = '0';
        }
        this.successTransactionRes = response;
        // this.expiredTimeIndo = response.data[0].expiredTimeIndo;
        const arrD = response.data.expiredTime.split(' ')[0].split('/');
        const newDate = arrD[2] + '-' + arrD[1] + '-' + arrD[0];
        this._trialEndsAt = newDate + ' ' + response.data.expiredTime.split(' ')[1];

        this.paymentService.getPayment().subscribe(respon => {

          this.listPayment = respon.find(x => x.paymentMethodCode === response.data.paymentMethodCode).data;
        });

      });
    });

    this._trialEndsAt = '2018-07-12 00:00:00';
  }
  goHome() {
    this.router.navigateByUrl('/');
  }

  goToOrder() {
    this.router.navigateByUrl('/buyer/order?page=1&status=133');
  }
}
