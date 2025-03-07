import { Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const isLoggedIn = localStorage.getItem('token') !== null;

    if (isLoggedIn && route.routeConfig?.path === '') {
      this.router.navigate(['/dashboard']);
      return false;
    }

    if (!isLoggedIn && route.routeConfig?.path === 'dashboard') {
      this.router.navigate(['']);
      return false;
    }

    return true;
  }
}
