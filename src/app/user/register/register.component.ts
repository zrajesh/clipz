import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import IUser from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { EmailTaken } from '../validators/email-taken';
import { RegisterValidators } from '../validators/register-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(
    private auth: AuthService,
    private emailTaken: EmailTaken
    ) {}

  inUserSubmission = false;

  name = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
  ]);
  email = new FormControl('', [
    Validators.required,
    Validators.email
  ], [this.emailTaken.validate]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
  ]);
  confirm_password = new FormControl('', [
    Validators.required
  ]);
  age = new FormControl('', [
    Validators.required,
    Validators.min(18)
  ]);
  phone_number = new FormControl('', [
    Validators.required,
    Validators.maxLength(10)
  ]);

  showAlert = false;
  alertMsg = 'Please wait! Your account is being created.';
  alertColor = 'blue';

  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    password: this.password,
    confirm_password: this.confirm_password,
    age: this.age,
    phoneNumber: this.phone_number,
  }, [RegisterValidators.match("password", "confirm_password")]);

  async register() {
    this.showAlert = true;
    this.alertMsg = 'Please wait! Your account is being created.';
    this.alertColor = 'blue';
    this.inUserSubmission = true;

    try {  
      await this.auth.createUser(this.registerForm.value as IUser)
    } catch (error) {
      console.log(error);
      this.alertMsg = 'An unexpected error occured. Please try again later'
      this.alertColor = 'red'
      this.inUserSubmission = false;
      return
    }
    this.alertMsg = 'Your account has been created successfully.'
    this.alertColor = 'green'
  }
}


