import {
  Directive,
  inject,
  input,
  effect,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Permission } from '../auth/auth.model';
import { AuthService } from '../auth/auth.service';

@Directive({
  selector: '[appAuth]',
  standalone: true,
})
export class AuthDirective {
  userType = input.required<Permission>({ alias: 'appAuth' });
  authService = inject(AuthService);
  private tepmplateRef = inject(TemplateRef); //holds the content of the ng-template
  private viewContainerRef = inject(ViewContainerRef); //holds the place in the DOM where this template is located
  constructor() {
    effect(() => {
      if (this.authService.activePermission() === this.userType()) {
        this.viewContainerRef.createEmbeddedView(this.tepmplateRef);
        console.log('show');
      } else {
        this.viewContainerRef.clear();
      }
    });
  }
}
