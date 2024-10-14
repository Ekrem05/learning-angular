import { Component, EventEmitter, inject, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewTask } from '../task/task.model';
import { TasksService } from '../tasks.service';
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  @Input({ required: true })
  userId!: string;
  @Output()
  onCancel = new EventEmitter();

  private taskService = inject(TasksService);

  title = '';
  summary = '';
  date = '';
  close() {
    this.onCancel.emit();
  }
  onSubmit() {
    this.taskService.addTask(
      {
        title: this.title,
        summary: this.summary,
        date: this.date,
      },
      this.userId
    );
    this.close();
  }
}
