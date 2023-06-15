import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatedGuard
  implements CanActivate, CanActivateChild, CanLoad
{
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.validate();
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.validate();
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.validate();
  }

  validate() {
    return this.authenticationService.getProfile().pipe(
      map((res) => true),
      catchError((err) => {
        localStorage.clear();
        this.router.navigateByUrl('/auth/login');
        return of(false);
      })
    );
  }
}
