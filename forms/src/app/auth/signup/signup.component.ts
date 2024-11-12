import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  form = new FormGroup(
    {
      email: new FormControl('', {
        validators: [Validators.email],
      }),
      password: new FormControl('', {
        validators: [Validators.maxLength(10), Validators.minLength(6)],
      }),
      confirmPassword: new FormControl('', {}),
    },
    {
      validators: (control: AbstractControl) => {
        if (
          control.get('password')?.value ===
          control.get('confirmPassword')?.value
        ) {
          return null;
        }
        return { doesNotMatchPassword: false };
      },
    }
  );

  onSubmit() {
    console.log(this.form);
  }
  get isEmailValid() {
    if (this.form.controls.email.valid) {
      return true;
    }
    return false;
  }
  get doesPasswordMatch() {
    if (this.form.errors && this.form.controls.confirmPassword.touched) {
      return false;
    }
    return true;
  }
}
