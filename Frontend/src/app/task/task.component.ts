import { Component, ViewChild } from '@angular/core';
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
export class TaskComponent {
  @ViewChild('taskform') taskform!: TaskFormComponent;
  tasks: any[] = [];

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit() {
    this.getAllTasks();
  }

  getAllTasks() {
    this.taskService.getTasks().subscribe((data: any[]) => {
      this.tasks = data;
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
    // const task = this.tasks.find((task) => task.id === id);
    // if (task && this.taskform) {
    //   this.taskform.task = { ...task };
    //   this.router.navigateByUrl('/task/add');
    //   console.log('Editing task:', task);
    // } else {
    //   console.log('err');
    // }
    this.router.navigate(['/task/edit', id]);
  }
}
