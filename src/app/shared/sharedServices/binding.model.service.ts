import { Injectable } from '@angular/core';
import {SharedService} from './shared.service';
import {RESPONSE_KEYS, STORAGE_KEYS} from '../apiKeys/storage-keys-constants';
import {IApiBaseObject} from '../iModels/api-base-object.model';
import {IApiResponse} from '../iModels/apiResponce.model';
import {IForgotModel} from '../iModels/forgot.model';
import {ILoginModel} from '../iModels/login.model';
import {IProfileModel} from '../iModels/profile.model';
import {IResetPasswordModel} from '../iModels/resetPassword.model';

@Injectable({
  providedIn: 'root'
})
export class ModelBindingService {
  constructor(private sharedService: SharedService, ) { }

  apiResponseDecoder(json): IApiResponse {
    return {
      code: json.code,
      message: json.message,
      data: json.data,
      itemCount: json.itemCount,
      headerData: json.headerData ? json.headerData : []
    };
  }

  apiResponseSuccessDecoder(res): IApiResponse {
    return {
      code: res[RESPONSE_KEYS.STATUS],
      message: (res.json()) ? res.json()[RESPONSE_KEYS.MESSAGE] : '',
      data: (res.json()) ? res.json()[RESPONSE_KEYS.DATAKEY] : [],
      itemCount: res.headers.get(RESPONSE_KEYS.TOTAL_COUNT),
      headerData: res.headers ? res.headers : []
    };
  }
  apiResponseErrorDecoder(res): IApiResponse {
    return {
      code: res[RESPONSE_KEYS.STATUS],
      message: res[RESPONSE_KEYS.MESSAGE],
      error: res.error || res[RESPONSE_KEYS.ERRORKEY],
    };
  }
  mappingDataReturn(functionName, apiresponseData): any {
    apiresponseData.data = apiresponseData.data.map(
      res => this[functionName](res)
    );
    apiresponseData = this.apiResponseDecoder(apiresponseData);
    return apiresponseData;
  }
  loginModelEncoder(loginRequestData: ILoginModel): any {
    return {
      password: loginRequestData.password,
      username: loginRequestData.username
    };
  }
  loginDifferentDecoader(): any {
    return {
      code: 40123,
      data: {}
    };
  }
}
