import { Directive } from '@angular/core';

@Directive({
  selector: 'a[safeLink]',
  standalone: true,
  host: {
    '(click)': 'onConfirmLeavePage($event)',
  },
})
export class SafeLinkDirective {
  constructor() {
    console.log('active');
  }

  onConfirmLeavePage(event: MouseEvent) {
    const wantsToLeave = window.confirm(
      'Are you sure you want to leave the app?'
    );

    if (wantsToLeave) {
      return;
    }
    event.preventDefault();
  }
}
