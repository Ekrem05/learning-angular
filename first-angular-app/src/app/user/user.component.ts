import { Component, signal } from '@angular/core';
import { DUMMY_USERS } from '../dummy_users';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  selectedUser = signal(
    DUMMY_USERS[Math.floor(Math.random() * DUMMY_USERS.length)]
  );

  get imagePath() {
    return `assets/users/${this.selectedUser().avatar}`;
  }

  onSelectUser() {
    this.selectedUser.set(
      DUMMY_USERS[Math.floor(Math.random() * DUMMY_USERS.length)]
    );
  }
}
