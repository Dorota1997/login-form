import { FormControl } from '@angular/forms';

import { emailPatternValidator } from './email.validator';

describe('emailPatternValidator', () => {
  const validator = emailPatternValidator();

  it('should return null when value is empty', () => {
    const control = new FormControl('');
    const result = validator(control);
    expect(result).toBeNull();
  });

  it('should return null for valid email addresses', () => {
    const validEmails = [
      'test@example.com',
      'john.doe@domain.co.uk',
      'user123@sub.domain.org',
      'a@b.cd',
      'name+tag@domain.io',
      'a_b-c.d+1@sub-domain.domain.com',
      'user.name@domain.travel',
    ];

    validEmails.forEach((email) => {
      const control = new FormControl(email);
      const result = validator(control);
      expect(result).toBeNull(`Expected "${email}" to be valid`);
    });
  });

  it('should return validation error for invalid email addresses', () => {
    const invalidEmails = [
      'plainaddress',
      '@missingusername.com',
      'username@.com',
      'username@com',
      'user@@doubleat.com',
    ];

    invalidEmails.forEach((email) => {
      const control = new FormControl(email);
      const result = validator(control);
      expect(result).toEqual(
        {
          invalidEmailPattern: 'Nieprawidłowy adres e-mail',
        },
        `Expected "${email}" to be invalid`
      );
    });
  });
});
