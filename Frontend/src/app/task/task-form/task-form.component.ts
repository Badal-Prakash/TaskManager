import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../task.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    status: 'pending',
  };
  constructor(
    private services: TaskService,
    private router: Router,
    private route: ActivatedRoute
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

  onSubmit() {
    console.log('Form submitted:', this.task);
    this.services.createTask(this.task).subscribe({
      next: (response) => {
        console.log('Task created successfully:', response);
      },
      error: (error) => {
        console.error('Error creating task:', error);
      },
      complete: () => {
        console.log('Task creation process completed.');
        this.router.navigate(['/task']);
      },
    });
  }
  onUpdate() {
    this.services.updateTask(this.task).subscribe({
      next: (response) => {},
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
