import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
    spyOn(localStorage, 'setItem');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate a token of default length 512', () => {
    const token = service.generateToken();
    expect(token.length).toBe(512);
    expect(localStorage.setItem).toHaveBeenCalledWith('token', token);
  });

  it('should generate a token of custom length', () => {
    const customLength = 128;
    const token = service.generateToken(customLength);
    expect(token.length).toBe(customLength);
    expect(localStorage.setItem).toHaveBeenCalledWith('token', token);
  });

  it('should save token in localStorage', () => {
    const token = 'my-custom-token';
    service.saveTokenInLocalStorage(token);
    expect(localStorage.setItem).toHaveBeenCalledWith('token', token);
  });
});
