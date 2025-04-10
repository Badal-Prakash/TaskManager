import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  standalone: true,
  selector: 'app-task-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
})
export class TaskFormComponent {
  task = {
    id: 0,
    title: '',
    description: '',
    status: '',
    userId: '',
  };
  constructor(
    private services: TaskService,
    private router: Router,
    private route: ActivatedRoute,
    private authservice: AuthService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.services.getTask(+id).subscribe((task) => {
        this.task.id = +id;
        this.task.description = task.description;
        this.task.title = task.title;
        this.task.status = task.status;
      });
    }
  }

  // onSubmit() {
  //   const taskToSend = {
  //     id: this.task.id,
  //     title: this.task.title,
  //     description: this.task.description,
  //     status: this.task.status,
  //     userId: this.authservice.getUserId()!,
  //   };
  //   console.log('taskToSend:', taskToSend, this.authservice.getUserId());

  //   console.log('Form submitted:', taskToSend);
  //   this.services.createTask(taskToSend).subscribe({
  //     next: (response) => {
  //       console.log('Task created successfully:', response);
  //     },
  //     error: (error) => {
  //       console.error('Error creating task:', error);
  //     },
  //     complete: () => {
  //       console.log('Task creation process completed.');
  //       this.router.navigate(['/task']);
  //     },
  //   });
  // }
  // onSubmit() {
  //   const userId = Number(this.authservice.getUserId());
  //   console.log('Decoded userId:', this.authservice.getUserId());

  //   if (!userId) {
  //     console.error('User ID is invalid or not available.');
  //     return;
  //   }

  //   const taskToSend = {
  //     id: this.task.id,
  //     title: this.task.title,
  //     description: this.task.description,
  //     status: this.task.status,
  //     userId: userId,
  //   };

  //   console.log('taskToSend:', taskToSend);

  //   this.services.createTask(taskToSend).subscribe({
  //     next: (response) => {
  //       console.log('Task created successfully:', response);
  //     },
  //     error: (error) => {
  //       console.error('Error creating task:', error);
  //     },
  //     complete: () => {
  //       console.log('Task creation process completed.');
  //       this.router.navigate(['/task']);
  //     },
  //   });
  // }
  onSubmit() {
    const userId = this.authservice.getUserId();
    if (!userId) {
      console.error('User ID is invalid or not available.');
      return;
    }

    const taskToSend = {
      id: this.task.id,
      title: this.task.title,
      description: this.task.description,
      status: this.task.status,
      userId: userId,
    };

    console.log('taskToSend:', taskToSend);

    this.services.createTask(taskToSend).subscribe({
      next: (response) => {
        console.log('Task created successfully:', response);
      },
      error: (error) => {
        console.error('Error creating task:', error);
      },
      complete: () => {
        this.router.navigate(['/task']);
      },
    });
  }

  onUpdate() {
    const taskToUpdate = {
      ...this.task,
      userId: this.authservice.getUserId(),
    };

    this.services.updateTask(taskToUpdate).subscribe({
      next: (response) => {
        console.log('Task updated successfully:', response);
      },
      error: (error) => {
        console.error('Error updating task:', error);
      },
      complete: () => {
        console.log('Task update process completed.');
        this.router.navigate(['/task']);
      },
    });
  }
}
