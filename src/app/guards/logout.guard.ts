import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { UtilisateurService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutGuard implements CanActivate {
  helper = new JwtHelperService();
  token=localStorage.getItem('at')
   isExpired = this.helper.isTokenExpired();
  constructor(
    private router: Router, 
    private authService: UtilisateurService){}
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        var token:any = localStorage.getItem('at');
        var decodedtoken = this.helper.decodeToken(token);
        console.log(decodedtoken);
        var tokenExpired:boolean = this.helper.isTokenExpired(JSON.stringify(token));
        console.log("tokenExpired was:" + tokenExpired);
        if (tokenExpired)
      { 
        this.router.navigate(['/login']);
        localStorage.clear();
       return false;

      }
        else{
          
                  return true;
        }
      }

      
      
}
