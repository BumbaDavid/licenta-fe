import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {map, Observable} from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }
  canActivate(): boolean | Observable<boolean> | Promise<boolean> {
    const apiKey = localStorage.getItem('api_key');
    if(apiKey) {
     return this.authService.validateKey(apiKey).pipe(
       map(valid=> {
         if(valid)
           return true;
         else {
           this.router.navigate(['/login']).then(()=>console.log("invalid api key",apiKey))
           return false;
         }
       })
     );
    } else {
      this.router.navigate(['/login']).then(()=>
      console.log("you must be logged in"))
      return false;
    }
  }
}
