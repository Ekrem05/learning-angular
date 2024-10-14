import { Component, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { TaskComponent } from './task/task.component';
import { FormComponent } from './form/form.component';
import { NewTask } from './task/task.model';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, FormComponent, NgIf],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  @Input({ required: true })
  userid!: string;
  @Input({ required: true })
  name!: string;

  showAddTaskForm = false;

  constructor(private taskService: TasksService) {}

  get selectedUserTask() {
    return this.taskService.tasksByUserId(this.userid);
  }

  onAddTask() {
    this.showAddTaskForm = true;
  }
  onCancelForm() {
    this.showAddTaskForm = false;
  }
}
