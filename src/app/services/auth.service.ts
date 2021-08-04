// import {Injectable} from '@angular/core';
// import {HttpClient} from '@angular/common/http';
// import { Observable, Subject, throwError } from 'rxjs';
// import { ApiService } from '../shared/sharedServices/api.service';
// import { IapiBaseObject } from '../shared/iModels/IApiBaseObject';
// import { API_KEYS } from '../shared/apiKeys/api-keys-constants';
// import { SharedService } from '../shared/sharedServices/shared.service';
// import { Router } from '@angular/router';
// import { BehaviorSubject } from 'rxjs';
// import { map, catchError } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   currentUser:any
//   constructor(private http: HttpClient, private _api: ApiService, private _shared: SharedService, private router: Router) {}

//   public $userSource = new BehaviorSubject<any>(null);
//   public $pagesource = new BehaviorSubject<any>(0);
//   public $navRoute = new BehaviorSubject<any>(null);

//   login(data): Observable <any> {
//     const apiObj: IapiBaseObject = {
//       tokenRequiredFlag: false,
//       endpoint: API_KEYS.LOGIN,
//       apiData: data

//     };
//     return this._api.postApi(apiObj).
//       pipe(map((response:any) => {
//          this._shared.setDataInStorage('lawyerIt_admin', response.user);
//         this._shared.setDataInStorage('adminToken', 'Bearer ' + response.token );

//          this.setUser(response.user);
//            return response;
//       }),
//         catchError((error) => {
//           return throwError(error);
//         })
//       );
//   }

//   setUser(user?): void {
//     if (user) {

//       user.isAdmin = (user.name === 'Admin') ? true : false;
//       this.$userSource.next(user);
//     } else {
//       let userData = this._shared.getDataFromStorage('lawyerIt_admin');
//        if (userData) {
//         this.$userSource.next(userData);
//       } else {
//         this.signOut();
//       }
//     }
//   }

//   setPageIndex(pageIndex) {
//     if(pageIndex) {
//       this.$pagesource.next(pageIndex)
//     } else {
//       this.$pagesource.next(0)
//     }
//   }

//   getPageIndex(): Observable<any> {
//     return this.$pagesource.asObservable();
//   }


//   setNavRoute(route) {
//     if(route) {
//       this.$navRoute.next(route)
//     } else {
//       this.$navRoute.next('')
//     }
//   }

//   getNavRoute(): Observable<any> {
//     return this.$navRoute.asObservable();
//   }

//   getUser(): Observable<any> {
//     return this.$userSource.asObservable();
//   }

//   isLoggedIn(): boolean {
//     try {
//       const theUser: any = this._shared.getDataFromStorage('lawyerIt_admin');
//       if (theUser || theUser != null) {
//         this.currentUser = theUser;
//       } else {
//         this.currentUser = false;
//       }
//     } catch (e) {
//       return false;
//     }
//     return !!this.currentUser;
//   }
//   forgotPassword(data) {
//     const apiObj: IapiBaseObject = {
//       tokenRequiredFlag: false,
//       endpoint: API_KEYS.FORGOTPASSWORD,
//       apiData: data
//     };
//     return this._api.postApi(apiObj).
//       pipe(map((response: any) => {
//         // this._shared.setDataInStorage('resettoken',response.token);
//            return response;
//       }),
//         catchError((error) => {
//            return throwError(error);
//         })
//       );
//   }

//   resetPassword(obj) {
//     const apiObj: IapiBaseObject = {
//       tokenRequiredFlag: false,
//       endpoint: API_KEYS.RESETPASSWORD,
//       apiData: obj
//     };

//     return this._api.postApi(apiObj).
//       pipe(map((response: any) => {
//            return response;
//       }),
//         catchError((error) => {
//            return throwError(error);
//         })
//       );
//   } 
//   signOut(): void {
//     if (this._shared.getDataFromStorage('lawyerIt_admin')) {
//       this._shared.setDataInStorage('lawyerIt_admin', null);
//       this._shared.setDataInStorage('adminToken', null);
//       this.$userSource.next(null);
//       this.router.navigate(['/login']);
//     } else {
//       this.router.navigate(['']);
//     }
//   }
// }
