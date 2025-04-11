import { AuthService } from './../auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from './task.service';
import { TaskFormComponent } from './task-form/task-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent implements OnInit {
  @ViewChild('taskform') taskform!: TaskFormComponent;
  tasks: any[] = [];

  constructor(
    private taskService: TaskService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getAllTasks();
  }
  getAllTasks() {
    const userId = this.authService.getUserId();

    this.taskService.getTasks().subscribe((data: any[]) => {
      console.log('All tasks from backend:', data);

      this.tasks = data.filter((task) => task.userId === userId);
      console.log('Filtered tasks for userId', userId, ':', this.tasks);
    });
  }

  createNewTask() {
    this.router.navigateByUrl('/task/add');
  }
  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    });
  }

  editTask(id: number) {
    this.router.navigate(['/task/edit', id]);
  }
}
