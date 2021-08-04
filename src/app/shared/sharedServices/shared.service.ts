import { Injectable } from '@angular/core';
import {LocalStorageService} from './local-storage.service';
import {STORAGE_KEYS} from '../apiKeys/storage-keys-constants';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
   constructor(private localStorageService: LocalStorageService) { }

  /**
   * @method setDataInStorage()
   * @desc used to set data in local storage using localStorageService.
   * @param key :string .
   * @param value :string .
   */
  setDataInStorage(key, value): any {
    value = JSON.stringify(value);
    this.localStorageService.setLocalStorageData(key, value);
  }

  /**
   * @method getDataFromStorage()
   * @desc used to get data from local storage using localStorageService.
   * @param key :string .
   */
  getDataFromStorage(key): any {
    try {
      let data = this.localStorageService.getLocalStorageData(key);
      data = JSON.parse(data);
      return data;
    } catch (ex) {
      return null;
    }

  }

  /**
   * @method isUserHasPermission()
   * @desc used to check whether user has an authentication or not by using seesion(token).
   * @param key :string .
   */
  isUserHasPermission(entity, permission): any {
    const data = this.getDataFromStorage(STORAGE_KEYS.PERMISSION_SESSION);
    let permissionGrant = false;
    if ((data) && (data.permissions) && (data.permissions.length)) {
        data.permissions.forEach(element => {
          if (element.entity === entity && element.actions.includes(permission)) {
            permissionGrant = true;
          }
        });
    }
    return permissionGrant;
  }
  /**
   * @method isUserAuthenticated()
   * @desc used to check whether user has an authentication or not by using seesion(token).
   * @param key :string .
   */
  isUserAuthenticated(): any {
    const data = this.getDataFromStorage(STORAGE_KEYS.SESSION);
    if (data) {
      return true;
    } else {
      return false;
    }
  }
  /**
   * @method getUserId()
   * @desc used to check whether user has an authentication or not by using seesion(token).
   * @param key :string .
   */
  getUserId(): any {
    const data = this.getDataFromStorage(STORAGE_KEYS.SESSION);
    if (data) {
      return data.id;
    } else {
      return -1;
    }
  }



}
