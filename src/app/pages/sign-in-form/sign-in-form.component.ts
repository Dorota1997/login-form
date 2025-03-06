import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { emailPatternValidator } from '../../validators/email.validator';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-sign-in-form',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in-form.component.html',
  styleUrl: './sign-in-form.component.scss',
})
export class SignInFormComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);

  signInForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, emailPatternValidator()]],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    if (this.signInForm.valid) {
      this.authService.generateToken();
    }
  }
}
