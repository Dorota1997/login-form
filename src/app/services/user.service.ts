import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private httpClient = inject(HttpClient);
  private apiUrl = 'user-data.json';

  getUserData(): Observable<User> {
    return this.httpClient.get<User>(this.apiUrl);
  }
}
