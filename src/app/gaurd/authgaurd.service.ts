// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router';
// import {AuthService} from '../services/auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthgaurdService {
//   constructor(private authService: AuthService, private router: Router) { }

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

//      return this.isAuthenticated(state.url);
//   }

//   isAuthenticated(url: string): boolean {

//     if (this.authService.isLoggedIn()) {
//         return true;
//     }  
//     this.router.navigate(['/login']);
//     return false;
//   }
// }
