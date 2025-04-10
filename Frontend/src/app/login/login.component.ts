import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginData = {
    email: '',
    password: '',
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private authservice: AuthService
  ) {}

  onSubmit() {
    console.log(
      'Form submitted:',
      this.loginData.email,
      this.loginData.password
    );
    this.authservice.Login(this.loginData.email, this.loginData.password);
  }
}
