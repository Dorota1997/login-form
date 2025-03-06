import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  generateToken(length: number = 512): string {
    const charset =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';

    Array.from({ length }).forEach(() => {
      token += charset[Math.floor(Math.random() * charset.length)];
    });

    return token;
  }
}
