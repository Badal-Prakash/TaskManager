import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-signup',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signupData = {
    FullName: '',
    email: '',
    password: '',
  };

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    console.log('Form submitted:', this.signupData);
    this.authService.signUp(
      this.signupData.email,
      this.signupData.password,
      this.signupData.FullName
    );
    this.router.navigate(['/login']);
  }
}
