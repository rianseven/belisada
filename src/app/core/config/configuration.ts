import { environment } from '@env/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Configuration {
  apiURL: string = environment.apiUrl;
  urlMidtrans: string = environment.urlMidtrans;
  apiUrlMongo: string = environment.apiUrlMongo;
  thumborUrl: string = environment.thumborUrl;
  domainUrl: string = environment.domain;
  elasticSearchUrl: string = environment.elasticSearchUrl;
  // imgUrl163x179: string = environment.imgUrl163x179;
}
