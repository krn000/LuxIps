// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,  Router} from "@angular/router";
// import { AuthService } from '../services/auth.service';
// @Injectable({
//   providedIn: 'root'
// })
// export class LoginService implements CanActivate{

//   constructor( private authService: AuthService,private router: Router) { }
//   canActivate() {
//     console.log(this.authService.isLoggedIn())
//     if (this.authService.isLoggedIn()) {
//       this.router.navigate(["/dashboard"]);
//         return false;
//     }

//     return true;
//   }
// }
