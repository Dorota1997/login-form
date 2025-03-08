import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { emailPatternValidator } from '../../validators/email.validator';
import { TextInputComponent } from '../../shared/text-input/text-input.component';

@Component({
  standalone: true,
  selector: 'app-sign-in-form',
  imports: [ReactiveFormsModule, TextInputComponent],
  templateUrl: './sign-in-form.component.html',
})
export class SignInFormComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  signInForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, emailPatternValidator()]],
    password: ['', Validators.required],
  });

  get emailControl(): FormControl {
    return this.signInForm.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.signInForm.get('password') as FormControl;
  }

  onSubmit(): void {
    if (this.signInForm.valid) {
      this.authService.generateToken();
      this.router.navigate(['/dashboard']);
    }
  }
}
