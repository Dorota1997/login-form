import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { UserService } from '../../services/user.service';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  private userService = inject(UserService);

  user$ = this.userService.getUserData();
}
