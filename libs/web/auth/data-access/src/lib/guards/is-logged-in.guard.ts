import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { WebAuthStore } from '../web-auth-data-access.store'

@Injectable()
export class IsLoggedInGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private readonly store: WebAuthStore, private readonly router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.isAuthenticated(state.url)
  }

  canActivateChild(): Observable<boolean | UrlTree> {
    return this.isAuthenticated()
  }

  canLoad(): Observable<boolean | UrlTree> {
    return this.isAuthenticated()
  }

  private isAuthenticated(url?: string): Observable<boolean | UrlTree> {
    return this.store.loggedIn$.pipe(
      map((loggedIn: boolean) => {
        if (!loggedIn) {
          return this.router.createUrlTree(['/sign-in'], {
            queryParams: { url },
          })
        }
        return true
      }),
    )
  }
}
