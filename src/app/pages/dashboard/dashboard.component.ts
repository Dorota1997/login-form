import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  private userService = inject(UserService);

  user$: Observable<User> = this.userService.getUserData() || of();
}
