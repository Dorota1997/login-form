import { of } from 'rxjs';
import { Router } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { SignInFormComponent } from './sign-in-form.component';

class MockAuthService {
  generateToken() {
    return of(true);
  }
}

class MockRouter {
  navigate(path: string[]) {}
}

describe('SignInFormComponent', () => {
  let component: SignInFormComponent;
  let fixture: ComponentFixture<SignInFormComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignInFormComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a form with email and password controls', () => {
    expect(component.signInForm.contains('email')).toBeTruthy();
    expect(component.signInForm.contains('password')).toBeTruthy();
  });

  it('should make the email field required', () => {
    let email = component.emailControl;
    email.setValue('');
    expect(email.valid).toBeFalsy();

    email.setValue('test@test.com');
    expect(email.valid).toBeTruthy();
  });

  it('should make the password field required', () => {
    let password = component.passwordControl;
    password.setValue('');
    expect(password.valid).toBeFalsy();

    password.setValue('password123');
    expect(password.valid).toBeTruthy();
  });

  it('should call authService.generateToken() and router.navigate() when the form is valid and submitted', () => {
    spyOn(authService, 'generateToken').and.callThrough();
    spyOn(router, 'navigate');

    component.signInForm.setValue({
      email: 'test@test.com',
      password: 'password123',
    });

    component.onSubmit();

    expect(authService.generateToken).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should not call authService.generateToken() or router.navigate() if the form is invalid', () => {
    spyOn(authService, 'generateToken');
    spyOn(router, 'navigate');

    component.signInForm.setValue({
      email: '',
      password: 'password123',
    });

    component.onSubmit();

    expect(authService.generateToken).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should validate email pattern', () => {
    let email = component.emailControl;

    email.setValue('invalid-email');
    expect(email.valid).toBeFalsy();

    email.setValue('valid@test.com');
    expect(email.valid).toBeTruthy();
  });

  it('should not call generateToken when form is not valid and onSubmit is triggered', () => {
    spyOn(authService, 'generateToken');
    spyOn(router, 'navigate');

    component.signInForm.setValue({
      email: 'test@test.com',
      password: '',
    });

    component.onSubmit();

    expect(authService.generateToken).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
