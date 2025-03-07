import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/sign-in-form/sign-in-form.component').then(
        (component) => component.SignInFormComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(
        (component) => component.DashboardComponent
      ),
    canActivate: [AuthGuard],
  },
];
