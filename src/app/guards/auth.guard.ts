import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor( private AFAuth: AngularFireAuth, private router: Router) {
  }

  /*
    Este metodo revisa si el usuario esta conectado o no. En caso de estar conectado no deja el acceso al login ni al registro
    ya que en la parte de app-routing utilizamos este guard para Home.
  */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.AFAuth.authState.pipe(map(auth => {
      if ( isNullOrUndefined(auth) ) {
        this.router.navigate(['/login']);
        return false;
      } else {
        return true;
      }
    }));
  }
}
