import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/sign-in-form/sign-in-form.component').then(
        (component) => component.SignInFormComponent
      ),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(
        (component) => component.DashboardComponent
      ),
  },
];
