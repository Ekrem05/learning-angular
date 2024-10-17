import { Component } from '@angular/core';
import { NewTicketComponent } from './new-ticket/new-ticket.component';
import { Ticket } from './ticket.model';
import { TicketComponent } from './ticket/ticket.component';
@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [NewTicketComponent, TicketComponent],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css',
})
export class TicketsComponent {
  tickets!: Ticket[];

  constructor() {
    this.tickets = [];
  }
  addNewTicket(data: { title: string; request: string }) {
    this.tickets.push({
      title: data.title,
      request: data.request,
      id: Math.random().toString(),
      status: 'open',
    });
  }

  onComplete(id: string) {
    this.tickets = this.tickets.map((ticket) => {
      if (ticket.id == id) {
        return { ...ticket, status: 'closed' };
      }
      return ticket;
    });
    console.log(this.tickets);
  }
}
