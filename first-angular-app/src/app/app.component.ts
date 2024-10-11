import { Component, signal } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { DUMMY_USERS } from './dummy_users';
import { TaskComponent } from './task/task.component';
import { NgFor, NgIf } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, UserComponent, TaskComponent, NgFor, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'first-angular-app';
  users = DUMMY_USERS;
  selectedUser?: string;
  onSelect(id: string) {
    this.selectedUser = this.users.find((u) => u.id === id)?.name;
  }
}
