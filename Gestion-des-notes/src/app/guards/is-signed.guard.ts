import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsSignedGuard implements CanActivate {
  constructor(private router: Router) { }

/** 
 *Autoriser l'acces au dashboard si l'utilisateur est connecté
  */ 

 canActivate(): boolean {
   if (localStorage.getItem('at') != null) {
     return true;
   } else {
     this.router.navigate(['/login']);
     return false;
   }

}
}
