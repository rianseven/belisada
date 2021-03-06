import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from '@belisada/core/config';
import {
  CreateStoreRequest, CreateStoreResponse, CheckStoreRequest,
  CheckStoreResponse, DetailStoreResponse, DetailStoreRequest,
  ProfileStoreResponse, UpdateStoreResponse, UpdateStoreRequest,
  UpdateDescriptionRequest, OpenStoreResponse, EtalaseStore, EtalaseStoreData
} from '@belisada/core/models/store/store.model';
import { Province, City, District, Village } from '@belisada/core/models/store/address';


@Injectable({
  providedIn: 'root',
})
export class StoreService {

  constructor(private cfg: Configuration, private http: HttpClient) { }

  // param: {name: string, address: string, description: string?, picture: string?}
  // used by create-store component
  create(data: CreateStoreRequest) {
    return this.http.post(this.cfg.apiURL + '/store/upgrade', data)
      .pipe(
        map(rsl => rsl as CreateStoreResponse)
      );
  }

  // param: {name: string, address: string, description: string}
  // used by create-store component
  isExist(data: CheckStoreRequest): Observable<CheckStoreResponse> {
    // return new Observable(obs => {
    //   setTimeout(() => {
    //     const res: CheckStoreResponse = new CheckStoreResponse();
    //     res.status = 5;
    //     res.message = 'toko sudah diambil orang';
    //     obs.next(res);
    //     obs.complete();
    //   }, 1500);
    // });
    return this.http.post(this.cfg.apiURL + '/store/check', data)
      .pipe(
        map(rsl => rsl as CheckStoreResponse)
      );
  }

  // param: {name: string, address: string, description: string}
  // used by detail-store component
  detail(data: DetailStoreRequest): Observable<DetailStoreResponse> {
    return new Observable(obs => {
      const respOk: DetailStoreResponse = new DetailStoreResponse();
      const respEr: DetailStoreResponse = new DetailStoreResponse();
      setTimeout(() => {
        respOk.status = 1;
        respOk.data = {
          name: 'Toko Segala aya',
          address: 'Jalan kaki selamanya',
          description: 'Stok ga udah-udah',
          picture: ''
        };
        obs.next(respOk);
      }, 1500);
      setTimeout(() => {
        respEr.status = 0;
        respEr.message = 'Internal Error';
        obs.error(respEr);
        obs.complete();
      }, 3000);
    });
    // return this.http.post(this.cfg.apiURL + '/store/check', data).map(rsl => rsl as DetailStoreResponse);
  }
  profile() {
    return this.http.get(this.cfg.apiURL + '/store/profile')
      .pipe(
        map(rsl => rsl as ProfileStoreResponse)
      );
  }

  // param: {status: string}
  // used by edit-store component
  updateStatus(data: UpdateStoreRequest) {
    return this.http.put(this.cfg.apiURL + '/store/update-status', data)
      .pipe(
        map(rsl => rsl as UpdateStoreResponse)
      );
  }

  // param: {description: string?, storeUrl: string, imageStoreUrl: string, phone: string?}
  // used by edit-store component
  updateDesc(data: UpdateDescriptionRequest) {
    return this.http.put(this.cfg.apiURL + '/store/update/store', data)
      .pipe(
        map(rsl => rsl as UpdateStoreResponse)
      );
  }

  // param: {addressName: string, address: string, description: string?, vilageId: string?, postal: string?}
  // used by edit-store component
  updateAddress(data: UpdateStoreRequest) {
    return this.http.put(this.cfg.apiURL + '/store/update/store-address', data)
      .pipe(
        map(rsl => rsl as UpdateStoreResponse)
      );
  }

  openStore(stat: boolean) {
    return new Observable(obs => {
      const rsp: OpenStoreResponse = new OpenStoreResponse();
      setTimeout(() => {
        rsp.status = 1;
        rsp.message = 'sukses buka/tutup toko';
        obs.next(rsp);
      }, 1500);
    });
  }

  /*
  With model Province
  used by create-store.component.ts
  */
  getProvince(id: any): Observable <Province[]> {
    return this.http.get(this.cfg.apiURL + '/location' + '/region/' + id)
      .pipe(
        map(response => response as Province[])
      );
  }

  /*
  With model City
  used by create-store.component.ts
  */

  getCity(id: any): Observable <City[]> {
    return this.http.get(this.cfg.apiURL + '/location' + '/city/' + id)
      .pipe(
        map(response => response as City[])
      );
  }

  /*
  With model District
  used by create-store.component.ts
  */
  getDistrict(id: any): Observable <District[]> {
    return this.http.get(this.cfg.apiURL + '/location' + '/district/' + id)
      .pipe(
        map(response => response as District[])
      );
  }

  /*
  With model Village
  used by create-store.component.ts
  */
  getVillage(id: any): Observable<Village[]> {
    return this.http.get(this.cfg.apiURL +  '/location' + '/village/' + id)
      .pipe(
        map(response => response as Village[])
      );
  }

  getEtalase(id: any): Observable<EtalaseStore> {
    return this.http.get(this.cfg.apiURL + '/store/' + id)
      .pipe(
        map(response => response as EtalaseStore)
      );
  }

  getStoreProductList(queryParams: Object): Observable<any> {
    let params = new HttpParams();
    Object.keys(queryParams).forEach(function(k) {
      params = params.append(k, queryParams[k]);
    });
    console.log(params)
    return this.http.get( this.cfg.elasticSearchUrl + '/seller', {params: params})
    .pipe(
      map(response => response as any)
    );
  }

}
