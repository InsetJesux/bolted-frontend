import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { UserRole } from 'src/app/users/enums/user-role.enum';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private readonly authenticationService: AuthenticationService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.validate();
    }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.validate();
    }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.validate();
  }

  validate() {
    return this.authenticationService.getProfile().pipe(
      map((res) => {
        if (res.role === UserRole.Admin) return true

        return false;
      }),
      catchError((err) => {
        return of(false);
      })
    );
  }
}
