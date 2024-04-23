import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  constructor(protected router: Router) {}

  @Output() onSubmitEvent = new EventEmitter<any>();
  @Input() submitLabel: string = '';
  @Input() titleLabel: string = '';

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Please enter a valid email address';
    }

    return this.email.hasError('email') ? 'Not a valid email addresss' : '';
  }

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return ''
  }

  onSubmit() {
    if(this.email.valid && this.password.valid){
      this.onSubmitEvent.emit({
        email: this.email.value,
        password: this.password.value
      });
    } else {
      this.email.markAsTouched();
      this.password.markAsTouched();
    }
  }
}
