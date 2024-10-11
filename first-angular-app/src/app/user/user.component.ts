import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  @Input({ required: true })
  user!: {
    id: string;
    name: string;
    avatar: string;
  };

  @Output()
  select = new EventEmitter();

  getAvatar() {
    return 'assets/users/' + this.user.avatar;
  }

  onSelect() {
    this.select.emit(this.user.id);
  }
}
