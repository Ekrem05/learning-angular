import { Component, Input } from '@angular/core';
import { Parameters } from '../models/app.parameters';
import { CurrencyPipe } from '@angular/common';
import { Result } from '../models/app.result';
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  @Input()
  data?: Result[];
}
