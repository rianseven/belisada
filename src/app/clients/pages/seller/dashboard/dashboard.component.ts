import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../servers/service/category/category.service';
import { SearchService } from '../../../../servers/service/search/search.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // veryfyProduct: number;
  // rejectedProduct: number;
  // sendProduct: number;
  // sellProduct: number;
  // pendingProduct: number;
  // returnProduct: number;
  // searchText: string;

  // verify = [];
  // rejected = [];
  // send = [];
  // sell = [];
  // pending = [];
  // return = [];
  // isi ini sudah di pindah di  dashboard produk-report/produk-report.ts

  // productList = [];
  // isi di atas sudah di pidah di  dashboard/status-invoice.ts

  constructor() {
    // private categoryService: CategoryService, private searchService: SearchService, private router: Router
    // tadi nya ada di dalem () sekarang pindah ke search-dashboard/search-dasboard.ts
  }

  ngOnInit() {
    // this.veryfyProduct = this.verify.length;
    // this.rejectedProduct = this.rejected.length;
    // this.sendProduct = this.send.length;
    // this.sellProduct = this.sell.length;
    // this.pendingProduct = this.pending.length;
    // this.returnProduct = this.return.length;
    // isi ini sudah di pindah di  dashboard produk-report/produk-report.ts

    // this.productList = [
    //   {
    //     'orderId': '#5765675655',
    //     'product': 'Asus ROG',
    //     'qty': '3',
    //     'status': 'success',
    //     'date': '2017-12-09'
    //   },
    //   {
    //     'orderId': '#5765675615',
    //     'product': 'Macbook pro 15"',
    //     'qty': '1',
    //     'status': 'success',
    //     'date': '2017-12-10'
    //   },
    //   {
    //     'orderId': '#5765675673',
    //     'product': 'iPhone X',
    //     'qty': '6',
    //     'status': 'pending',
    //     'date': '2017-12-20'
    //   }
    // ];
    // isi di atas sudah di pidah di  dashboard/status-invoice.ts
    // this.getCategory();
    // ^^ pindah ke search-dashboard/search-dasboard.ts
  }

  // search(event) {
  //   const key = event.target.value;
  //   this.searchService.searchProduct(key).subscribe(data => {
  //     console.log(data);
  //   });
  // }
  // ^^ pindah ke search-dashboard/search-dasboard.ts

  // getCategory() {
  //   this.categoryService.getAll().subscribe(data => {
  //     console.log(data);
  //   });
  // }
  // ^^ pindah ke search-dashboard/search-dasboard.ts

  // addProducts() {
  //   this.router.navigate(['seller/add-products']);
  // }
  // ^^ pindah ke search-dashboard/search-dasboard.ts
}