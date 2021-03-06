import { BaseResponseModel } from '@belisada/core/models';

export class CreateStoreRequest {
  name: string;
  address: string;
  description?: string;
  picture?: string;
}

export class CreateStoreResponse extends BaseResponseModel {

}

export class CheckStoreRequest {
  name: string;
}

export class CheckStoreResponse extends BaseResponseModel {

}

export class DetailStoreRequest {
  id: string;
}

class DetailStoreData {
  name: string;
  address: string;
  description?: string;
  picture?: string;
}

export class DetailStoreResponse {
  status: number;
  message?: string;
  data?: DetailStoreData;
}

export class ProfileStoreResponse {
  storeId: number;
  name: string;
  phone: string;
  address: string;
  description: string;
  rating: number;
  villageId: number;
  villageName: string;
  districtId: number;
  districtName: string;
  cityId: number;
  cityName: string;
  regionId: number;
  regionName: string;
  postal: number;
  mUserLocationId: number;
  isoffday: boolean;
  imageStoreUrl: any;
  url: string;
}
export class UpdateStoreRequest {
  address: string;
  villageId: number;
  description?: string;
  picture?: string;
  isoffday: boolean;
}

export class UpdateDescriptionRequest {
  description: string;
  imageStoreUrl: string;
}

export class UpdateStoreResponse extends BaseResponseModel {
  data: DetailStoreData;
}

export class OpenStoreResponse extends BaseResponseModel {

}


export class EtalaseStore {
  status: number;
  message: string;
  data: EtalaseStoreData;
}

export class EtalaseStoreData {
  productSold: number;
  storeImageUrl: string;
  joinFrom: string;
  storeName: string;
  storeUrl: string;
  locationName: string;
  description: string;
  storeId: number;
  isoffday: any;
  longProcess: any;
  follower: any;
}

