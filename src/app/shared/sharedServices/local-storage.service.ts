import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { STORAGE_KEYS } from '../apiKeys/storage-keys-constants';

export const CONSTANT = {
  SESSION_TIME_OUT: 100000000000,
};

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  storageKeys = {
    SESSION: 'lawyerIt_admin',
    PERMISSION: 'permissions'
  };
  constructor(private cookieService: CookieService) {
    // Constructor body
  }
  /**
   * @method setLocalStorageData
   * @description Method to set local storage data.
   * @param key: string; key for the local storage.
   * @param value: any; value for the local storage.
   */
  setLocalStorageData(key, value): void {
    const expired = new Date();
    expired.setTime(expired.getTime() + (CONSTANT.SESSION_TIME_OUT));
      localStorage.setItem(key, value)
    if (value === 'null') {
         localStorage.clear()
       }
   
  }
  /**
   * @method getLocalStorageData
   * @description Method to get local storage data.
   * @param key: string; key for the local storage.
   */
  getLocalStorageData(key): any {
    return localStorage.getItem(key) 
      ? localStorage.getItem(key) : 'null';
  }
  /**
   * @method getAllStorageData
   * @description Method to get All local storage data.
   * @param key: string; key for the local storage.
   */
  getAllStorageData(): any {
    return this.cookieService.getAll();
  }
}
