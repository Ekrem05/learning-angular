import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableComponent } from '../table/table.component';
import { Result } from '../models/app.result';
import { Parameters } from '../models/app.parameters';
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, TableComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  initialInvestment = 0;
  annualInvestment = 0;
  expectedReturn = 5;
  duration = 10;

  @Output()
  onSubmit = new EventEmitter<Parameters>();

  get getParameters() {
    return {
      initialInvestment: this.initialInvestment,
      annualInvestment: this.annualInvestment,
      expectedReturn: this.expectedReturn,
      duration: this.duration,
    };
  }
  calculate() {
    this.onSubmit.emit(this.getParameters);
  }
}
