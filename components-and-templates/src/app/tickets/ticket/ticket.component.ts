import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Ticket } from '../ticket.model';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
})
export class TicketComponent {
  @Input({ required: true })
  ticket!: Ticket;

  @Output()
  onComplete = new EventEmitter<string>();

  showDetails = false;

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }
  complete() {
    console.log('opa');
    this.onComplete.emit(this.ticket.id);
  }
}
