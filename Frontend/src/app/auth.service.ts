import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LoginData, SignupData } from './DataModel';
import { jwtDecode } from 'jwt-decode';
interface JwtPayload {
  userId: number;
  exp?: number;
  iat?: number;
  [key: string]: any;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = signal<boolean>(!!localStorage.getItem('token'));
  constructor(private http: HttpClient, private router: Router) {}
  Login(email: string, password: string) {
    this.http
      .post<any>('http://localhost:5178/api/Account/login', { email, password })
      .subscribe({
        next: (response) => {
          const token = response['token'];
          localStorage.setItem('token', token);
          this.router.navigateByUrl('/task');
          console.log('Login successful:', response);
          this.isLoggedIn.set(true);
          console.log('User is logged in:', this.isLoggedIn);
        },
        error: (error) => {
          console.error('Error during login:', error);
        },
        complete: () => {
          console.log('Login process completed.');
        },
      });
  }

  signUp(email: string, password: string, FullName: string) {
    this.http
      .post('http://localhost:5178/api/Account/register', {
        email,
        password,
        FullName,
      })
      .subscribe({
        next: (response) => {
          console.log('Signup successful:', response);
        },
        error: (error) => {
          console.error('Error during signup:', error);
        },
        complete: () => {
          console.log('Signup process completed.');
        },
      });
  }
  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn.set(false);
    this.router.navigateByUrl('/login');
    console.log('User logged out:', this.isLoggedIn);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserId(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded = jwtDecode<{ nameid: string }>(token);
      return decoded.nameid || null;
    } catch (err) {
      console.error('Invalid token:', err);
      return null;
    }
  }
}
