import { SearchService } from './../../../core/services/search/search.service';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FilterM } from '@belisada/core/models/filter/filter-m';
import { FilterSService } from '@belisada/core/services';
import { ListSearch, DataFilter } from '../../../core/models/search/search.model';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';

import { Options, LabelType } from 'ng5-slider';
import { CurrencyPipe, isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  Arr = Array;

  minValue: Number = 0;
  maxValue: Number = 0;
  options: Options = new Options();
  valueRate: Number = 0;
  optionsRate: Options = {
    floor: 0,
    ceil: 5,
    showTicks: true,
    showSelectionBar: true,

    getSelectionBarColor: (valueRate: number): string => {
      return '#2AE02A';
    },

    getPointerColor: (value: number): string => {
      return '#2AE02A';
    },

    translate: (valueRate: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<font size=2>' + valueRate + '</font>';
        case LabelType.High:
          return '<font size=2>' + valueRate + '</font>';
        default:
        // <i class="fas fa-star"></i>
          // return '<fa-icon [icon]="[fa, start]"></fa-icon>' + valueRate;
          return '<font size=2>' + valueRate + '</font>';
      }
    }

  };


  ceil: any;

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
  testing: FilterM = new FilterM();
  userlist: any;
  userlistClass: any;
  userlistCourier: any;
  a;
  en;
  functionOnStore;
  produkIMG: any;

  listFilter: DataFilter[];

  curType = [];
  isTracking = false;

  currentLat: any;
  currentLong: any;
  zipCode: any;
  address: any;
  okeOce: any = [];

  listLocation: DataFilter[];
  getLocation: string;
  getSortBy: string;
  activeQueryParams: any;

  min: number;
  max: number;

  listSort: any = ['name', 'brandname', 'rate', 'review', 'pricelist', 'discount', 'seen'];
  perPage: any = ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'];
  itemperpage: number;

  public displayMode: number;

  starDefault: number;
  starYellow: number;
  value: any;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private activatedRoute: ActivatedRoute,
    private filterService: FilterSService,
    private router: Router,
    private searchService: SearchService,
    private http: HttpClient,
    private cp: CurrencyPipe,
  ) {
    this.produkIMG = environment.thumborUrl + 'unsafe/fit-in/180x180/center/filters:fill(fff)/';
    this.displayMode = 1;
  }

  ngOnInit() {

    this.value = 12345;
    this.value = this.cp.transform(this.value, 'Rp', true, '1.0-0');
    // const queryParams = {
    //   postal: '52181',
    // };


    // this.searchService.getLocation(queryParams).subscribe(response => {
    //   this.listLocation = response.data;
    // });

    // this.trackMe();

    this.filterSearch(this.activatedRoute.snapshot.queryParams);

    this.activatedRoute.queryParams.subscribe((params: Params) => {

      this.activeQueryParams = Object.assign({}, params);
      // this.filterSearch(params);
      this.loadData(params);
    });
  }

  changePrice() {
    this.activeQueryParams['min'] = this.minValue;
    this.activeQueryParams['max'] = this.maxValue;

    this.router.navigate(['/search-result/product-list'], {
      queryParams: this.activeQueryParams
    });
  }

  changeRating() {
    this.activeQueryParams['rate'] = this.valueRate;

    this.router.navigate(['/search-result/product-list'], {
      queryParams: this.activeQueryParams
    });
  }

  filterSearch(params) {

    const queryParams = {
      q: params.q,
    };

    this.searchService.getSearchFilter(queryParams).subscribe(response => {

      const listF = response.find(x => x.filter === 'courierTypes');
      this.listFilter = listF.data;

      const listL = response.find(x => x.filter === 'Location');
      this.listLocation = listL.data;

      const maxV = response.find(x => x.filter === 'Price');
      this.maxValue = (maxV.data[0]) ? maxV.data[0].max : 0;

      const minV = response.find(x => x.filter === 'Price');
      this.minValue = (minV.data[0]) ? minV.data[0].min : 0;

      this.options = {
        floor: 0,
        ceil: (response[5].data[0]) ? response[5].data[0].max : 0,


        translate: (value: number, label: LabelType): string => {
          switch (label) {
            case LabelType.Low:
              return '<font size=2><b>Min:</b>' + this.cp.transform(value, 'Rp ', 'symbol', '1.0') + '</font>';
            case LabelType.High:
              return '<font size=2><b>Max:</b>' + this.cp.transform(value, 'Rp ', 'symbol', '1.0') + '</font>';
            default:
              return '<font size=2>Rp ' + value + '</font>';
          }
        }
      };

      this.listFilter.forEach((item, index) => {
        this.curType.push('');
      });

      if (params.courier) {
        const couriers = params.courier.split(',');
        couriers.forEach(courier => {
          const index = this.listFilter.findIndex(x => x.type === courier);
          this.curType[index] = courier;
        });
      }
    });

  }

  selectLocation() {
    this.activeQueryParams['location'] = this.getLocation;
    this.router.navigate(['/search-result/product-list'], {
      queryParams: this.activeQueryParams
    });
  }

  selectSortBy() {
    this.activeQueryParams['sortName'] = this.sortName;
    this.router.navigate(['/search-result/product-list'], {
      queryParams: this.activeQueryParams
    });
  }

  onDisplayModeChange(mode: number): void {
    this.displayMode = mode;
  }

  selectPerPage() {
    this.activeQueryParams['itemperpage'] = this.itemperpage;
    this.router.navigate(['/search-result/product-list'], {
      queryParams: this.activeQueryParams
    });
  }

  trackMe() {
    if (navigator.geolocation) {
      this.isTracking = true;
      navigator.geolocation.getCurrentPosition((position) => {
        this.showTrackingPosition(position);
      });
    } else {
      alert('Geolocation is not supported by this browser');
    }
  }

  showTrackingPosition(position) {
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;
        this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='
        + this.currentLat + ',' + this.currentLong +
        '&key=AIzaSyBfDG211qt5jJswzivewQ1wMNe-Uj6MCu0').
        subscribe((res) => {
          this.a = res;
          for (const b of this.a.results) {
            const m = b.types.includes('street_address');
            if (m) {
              this.address = b.formatted_address;
            }
              for (const d of b.address_components) {
                const n = d.types.includes('postal_code');
                if (n) {
                  this.zipCode = d.long_name;

                  const queryParams = {
                    postal: this.zipCode,
                  };

                  this.searchService.getLocation(queryParams).subscribe(response => {
                  });

                  // this.http.get('https://api0.belisada.id/belisada/rates/v2?productId=2532&postal=' + this.zipCode).
                  // subscribe((kad) => {
                  //   this.okeOce = kad;
                  // });
                } else {
                  break;
                }
              }
            }
        });
  }

  changeCourier(type, checked, i) {
    if (checked) {
      this.curType[i] = type;
    } else {
      // const index = this.curType.findIndex(x => x === type);
      // if (index !== -1) { this.curType.splice(index, 1); }
      this.curType[i] = '';
    }
    this.activeQueryParams['courier'] = this.curType.toString();
    if (this.curType.includes('')) {
      this.activeQueryParams['courier'] = this.activeQueryParams['courier'].replace(/,/g, '');
    }
    // const newQueryParams = this.activeQueryParams;
    // newQueryParams['courier'] = this.curType.toString();
    this.router.navigate(['/search-result/product-list'], {
      queryParams: this.activeQueryParams
    });

  }


  loadData(params) {
    // this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.pages = [];
      this.currentPage = (params['page'] === undefined) ? 1 : +params['page'];
      this.cat = params.location === undefined ? [] : params.location;
      this.shippingOpt = params.shipping === undefined ? [] : params.shipping;
      this.categoryOPT = params.category === undefined ? [] :  params.category;
      this.classificationOpt = params.classification === undefined ? [] : params.classification;
      this.keys = params.q;
      this.keyST = 'product';
      this.brandOPT = params.brand === undefined ? [] : params.brand;

      (params.itemperpage) ? this.itemperpage = params.itemperpage : this.itemperpage = 10;
      (params.sortName) ? this.sortName = params.sortName : this.sortName = 'name';

      const queryParams = {
        page: this.currentPage,
        itemperpage: this.itemperpage,
        ob: this.sortName,
        ot: this.sortUrut,
        q: params.q ? params.q : '',
        st: params.st,
        location: this.cat,
        shipping: this.shippingOpt,
        classification: this.classificationOpt,
        brand: this.brandOPT,
        category: this.categoryOPT,
      };

      if (params.courier) queryParams['couriertype'] = params.courier;

      if (params.max) queryParams['max'] = params.max;
      if (params.min) queryParams['min'] = params.min;
      if (params.rate) queryParams['rate'] = params.rate;
      if (params.sortName) queryParams['sortName'] = params.sortName;

      if (params.sortName) this.sortName = params.sortName;
      if (this.cat) this.getLocation = this.cat;

      // this.searchService.getSearchList(queryParams).subscribe(res => {
      //   console.log(res)
      //   this.list = res;
      //   this.lastPage = this.list.totalPages;
      //   this.maxValue = this.list.max_price;
      //   for (let r = (this.currentPage - 3); r < (this.currentPage - (-4)); r++) {
      //         if (r > 0 && r <= this.list.totalPages) {
      //           this.pages.push(r);
      //         }
      //       }
      // })
      this.searchService.getList(queryParams).subscribe(response => {
        this.list = response;

        console.log('list data', this.list);

        this.lastPage = this.list.totalPages;
        for (let r = (this.currentPage - 3); r < (this.currentPage - (-4)); r++) {
          if (r > 0 && r <= this.list.totalPages) {
            this.pages.push(r);
          }
        }
      });
    // });
  }

  setPage(page: number, increment?: number) {
    if (increment) { page = +page + increment; }
    if (page < 1 || page > this.list.totalPages) { return false; }
    // tslint:disable-next-line:max-line-length
    this.router.navigate(['/search-result/product-list'], { queryParams: {page: page, ob: this.sortName, ot: this.sortUrut}, queryParamsHandling: 'merge' });
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
  }

  goDetail(id, name) {
    const r = name.replace(new RegExp('/', 'g'), ' ');
    this.router.navigate(['/product/product-detail/' + id + '/' + r]);
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
  }

  public getUser() {
  }

}
