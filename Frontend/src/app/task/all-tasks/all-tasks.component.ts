import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-all-tasks',
  imports: [CommonModule],
  templateUrl: './all-tasks.component.html',
  styleUrl: './all-tasks.component.css',
})
export class AllTasksComponent {
  constructor(private router: Router, private taskService: TaskService) {}

  tasks: any[] = [];
  ngOnInit() {
    this.getAllTasks();
  }
  getAllTasks() {
    this.taskService.getTasks().subscribe((data: any[]) => {
      console.log('All tasks from backend:', data);
      this.tasks = data;
    });
  }
  createNewTask() {
    this.router.navigateByUrl('/task/add');
  }
}
