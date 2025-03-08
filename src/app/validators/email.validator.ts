import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function emailPatternValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const emailPattern =
      /^[a-z0-9](?:[a-z0-9._%+-]*[a-z0-9])?@[a-z0-9.-]+\.[a-z]{2,}$/;

    const isValid = emailPattern.test(control.value);

    return isValid
      ? null
      : { invalidEmailPattern: 'Nieprawidłowy adres e-mail' };
  };
}
