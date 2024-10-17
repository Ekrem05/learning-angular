import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ticket } from '../ticket.model';
import { ElementRef } from '@angular/core';
@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css',
})
export class NewTicketComponent {
  @Output()
  newTicket = new EventEmitter<{ title: string; request: string }>();

  @ViewChild('form')
  form?: ElementRef<HTMLFormElement>;

  onSubmit(title: string, request: string) {
    console.log(title, request);
    this.form?.nativeElement.reset();
    this.newTicket.emit({ title, request });
  }
}
