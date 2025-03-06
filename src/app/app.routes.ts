import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/sign-in-form/sign-in-form.component').then(
        (component) => component.SignInFormComponent
      ),
  },
];
