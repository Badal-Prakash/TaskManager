import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.Model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}
  private baseUrl = 'http://localhost:5178/api/Account/users/details';
  getAllUsers() {
    return this.http.get<User[]>(this.baseUrl);
  }
}
