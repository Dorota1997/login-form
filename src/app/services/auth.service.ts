import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  generateToken(length: number = 512): string {
    const charset: string =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token: string = '';

    Array.from({ length }).forEach(() => {
      token += charset[Math.floor(Math.random() * charset.length)];
    });

    this.saveTokenInLocalStorage(token);

    return token;
  }

  saveTokenInLocalStorage(token: string): void {
    localStorage.setItem('token', token);
  }
}
