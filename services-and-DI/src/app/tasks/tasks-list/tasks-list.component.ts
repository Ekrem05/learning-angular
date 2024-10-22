import { Component, computed, inject, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TaskService } from '../task.service';
import { TASK_STATUS_OPTIONS, TasksStatusOptions } from '../task.model';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  providers: [
    {
      provide: TASK_STATUS_OPTIONS,
      useValue: TasksStatusOptions,
    },
  ],
  imports: [TaskItemComponent],
})
export class TasksListComponent {
  selectedFilter = signal<string>('all');
  private taskService = inject(TaskService);
  taskStatusOptions = inject(TASK_STATUS_OPTIONS);
  tasks = computed(() => {
    switch (this.selectedFilter()) {
      case 'open':
        return this.taskService.allTasks().filter((t) => t.status === 'OPEN');
      case 'in-progress':
        return this.taskService
          .allTasks()
          .filter((t) => t.status === 'IN_PROGRESS');
      case 'done':
        return this.taskService.allTasks().filter((t) => t.status == 'DONE');
      default:
        return this.taskService.allTasks();
    }
  });

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
