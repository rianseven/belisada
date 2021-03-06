import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ListSearch } from '../../../core/models/search/search.model';
import { SearchService } from './../../../core/services/search/search.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.scss']
})
export class StoreListComponent implements OnInit {

  list: ListSearch = new ListSearch();
  currentPage: number;
  lastPage: number;
  pages: any = [];

  sortUrut: string;
  sortName: string;


  cat;
  shippingOpt;
  brand;
  brandOPT;
  categoryOPT;
  category;
  classificationOpt;
  keys: string;
  keyST: string;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private activatedRoute: ActivatedRoute, private router: Router,
    private searchService: SearchService
    ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.pages = [];
      this.currentPage = (params['page'] === undefined) ? 1 : +params['page'];
      this.cat = params.location === undefined ? [] : params.location;
      this.shippingOpt = params.shipping === undefined ? [] : params.shipping;
      this.categoryOPT = params.category === undefined ? [] :  params.category;
      this.classificationOpt = params.classification === undefined ? [] : params.classification;
      this.keys = params.q;
      this.brandOPT = params.brand === undefined ? [] : params.brand;

      const queryParams = {
        st: 'store',
        page: this.currentPage,
        itemperpage: 10,
        // ob: this.sortName,
        // ot: this.sortUrut,
        q: params.q,
        location: this.cat,
        shipping: this.shippingOpt,
        classification: this.classificationOpt,
        brand: this.brandOPT,
        category: this.categoryOPT
      };
      this.searchService.getList(queryParams).subscribe(response => {

        this.list = response;
        this.lastPage = this.list.totalPages;
        for (let r = (this.currentPage - 3); r < (this.currentPage - (-4)); r++) {
          if (r > 0 && r <= this.list.totalPages) {
            this.pages.push(r);
          }
        }
      });

    });
  }

  setPage(page: number, increment?: number) {
    if (increment) { page = +page + increment; }
    if (page < 1 || page > this.list.totalPages) { return false; }
    // tslint:disable-next-line:max-line-length
    this.router.navigate(['/search-result/product-list'], { queryParams: {page: page}, queryParamsHandling: 'merge' });
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
  }


}
