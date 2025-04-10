import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockRoute = (path: string): ActivatedRouteSnapshot =>
    ({ routeConfig: { path } } as ActivatedRouteSnapshot);

  const mockState = {} as RouterStateSnapshot;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [AuthGuard, { provide: Router, useValue: routerSpy }],
    });

    guard = TestBed.inject(AuthGuard);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should allow access when user is logged in and path is not "" or "dashboard"', () => {
    localStorage.setItem('token', 'abc123');
    const result = guard.canActivate(mockRoute('profile'), mockState);
    expect(result).toBeTrue();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should redirect to /dashboard if logged in and accessing "" (root)', () => {
    localStorage.setItem('token', 'abc123');
    const result = guard.canActivate(mockRoute(''), mockState);
    expect(result).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should redirect to "" (login) if not logged in and accessing dashboard', () => {
    const result = guard.canActivate(mockRoute('dashboard'), mockState);
    expect(result).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['']);
  });

  it('should allow access when not logged in and accessing non-protected route', () => {
    const result = guard.canActivate(mockRoute('register'), mockState);
    expect(result).toBeTrue();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});
