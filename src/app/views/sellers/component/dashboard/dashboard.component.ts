import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StoreService } from '../../../../core/service/store/store.service';
import { Store } from '@ngrx/store';

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
  receiveMessage: any;
  stores: any[] = [];
  isReady: Boolean = false;
  constructor(private storeService: StoreService, private router: Router) {
    // private categoryService: CategoryService, private searchService: SearchService, private router: Router
    // tadi nya ada di dalem () sekarang pindah ke search-dashboard/search-dasboard.ts
  }

  ngOnInit() {
    this.getAllStore();
  }
    // this.veryfyProduct = this.verify.length;
    // this.rejectedProduct = this.rejected.length;
    // this.sendProduct = this.send.length;
    // this.sellProduct = this.sell.length;
    // this.pendingProduct = this.pending.length;
    // this.returnProduct = this.return.length;
    // isi ini sudah di pindah di  dashboard produk-report/produk-report.ts

  // search(event) {
  //   const key = event.target.value;
  //   this.searchService.Search(key).subscribe(data => {
  //     console.log(data);
  //   });
  // }

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

  daftarToko() {
    // this.router.navigateByUrl('/seller/toko');
    this.router.navigateByUrl('/seller/new-seller');
  }

  getAllStore() {
    this.storeService.getAll().subscribe(response => {
      console.log('getAllStore response: ', response);
      this.stores = response;
      this.isReady = true;
    });
  }
}


