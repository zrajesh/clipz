import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials = {
    email: '',
    password: ''
  }

  constructor(private auth: AngularFireAuth) {}

  ngOnInit(): void {}

  showAlert = false;
  alertMsg = 'Please wait! Logging in ...';
  alertColor = 'blue';
  inSubmission = false;
  async login() {
    this.showAlert = true;
    this.alertMsg = 'Please wait! Logging in...';
    this.alertColor = 'blue';
    this.inSubmission = true;
    try {
      const {email, password} = this.credentials;
      await this.auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      this.alertMsg = 'Unable to Login. Please enter all the fields correctly';
      this.alertColor = 'red';
      this.inSubmission = false;
      console.log("LOGIN ERR: ", error);
      return;
    }
    this.alertMsg = 'Logged in successfully.';
    this.alertColor = 'green';
  }

}
