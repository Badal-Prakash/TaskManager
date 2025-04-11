import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { CommonModule } from '@angular/common';
import { User } from './user.Model';

@Component({
  selector: 'app-users',
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  constructor(private usersService: UsersService) {}
  users: User[] = [];
  ngOnInit() {
    this.usersService.getAllUsers().subscribe((data: User[]) => {
      this.users = data;
      console.log(this.users);
    });
  }
}
