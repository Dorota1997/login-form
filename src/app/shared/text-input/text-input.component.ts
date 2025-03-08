import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-text-input',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextInputComponent {
  @Input() control: FormControl;
  @Input() type: string = 'text';
  @Input() label: string = '';
  @Input() placeholder: string = '';

  get isInvalid(): boolean {
    return (this.control?.invalid && this.control?.touched) ?? false;
  }

  get errorMessages(): string[] {
    const errors: string[] = [];

    if (this.control?.hasError('required')) {
      errors.push('Pole jest wymagane');
    }

    if (this.control?.hasError('invalidEmailPattern')) {
      const errorValue = this.control.errors
        ? this.control.errors['invalidEmailPattern']
        : null;
      errors.push(errorValue);
    }

    return errors;
  }
}
