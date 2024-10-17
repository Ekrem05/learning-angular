import { Directive } from '@angular/core';

@Directive({
  selector: 'a[safeLink]',
  standalone: true,
})
export class SafeLinkDirective {
  constructor() {
    console.log('active');
  }
}
