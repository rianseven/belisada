import { TransactionsService } from './../../../../core/service/transactions/transactions';
import { TransactionListService } from './../../../../core/service/transcations-list/transaction-list.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TrasnactionList } from '../../../../core/model/trasnaction-list';

@Component({
  selector: 'app-confirmation-buyer',
  templateUrl: './confirmation-buyer.component.html',
  styleUrls: ['./confirmation-buyer.component.scss']
})
export class ConfirmationBuyerComponent implements OnInit {

  updateImg: Boolean = false;
  imageTrans: string;
  fm: any = {};
  tigo: any;
  cart: TrasnactionList = new TrasnactionList();
  constructor(private router: Router, private route: ActivatedRoute, private tsBuyer: TransactionListService,
    private transactions: TransactionsService) { }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.tigo = params.id;
      // console.log('pa', this.tsId);
      this.tsBuyer.getAll().subscribe(data => {
        console.log('data', data);
        this.cart = data.find(x => x.transactionId == params.id);
        // console.log('this.cart', this.cart);
      });
    });
  }

  setCanvas(e, newIMG) {
    if (!this.updateImg) { return false; }
    const cnv = document.createElement('canvas');
    const el = e.target;
    const w = el.width;
    const h = el.height;

    cnv.width = w;
    cnv.height = h;
    cnv.getContext('2d').drawImage(el, 0, 0, w, h);

    this.fm[newIMG] = cnv.toDataURL('image/jpeg', 0.5).slice(23).replace(' ', '+');
  }

  setUrl(event, img) {
    const fr = new FileReader();
    const f = event.target.files[0];
    const that = this;

    if (!f.type.match(/image.*/)) { return alert('Not valid image file'); }
    fr.onload = function() {
      that.updateImg = true;
      img.src = fr.result;
    };
    fr.readAsDataURL(f);
  }
  uploadBukti() {
    this.route.params.subscribe( params3 => {
      this.tigo = params3.id;
      // console.log('pa', this.tsId);
      this.tsBuyer.getAll().subscribe(data2 => {
        console.log('data', data2);
        this.cart = data2.find(xx => xx.transactionId == params3.id);
        console.log('this.cart', this.cart.orderNumber);
      });
    });
    const data = {
      orderNumber: this.cart.orderNumber,
      imageEvidence: this.fm.imageID
    };
    this.transactions.completions(data).subscribe( result => {
     console.log(result);
    });
  }

}
