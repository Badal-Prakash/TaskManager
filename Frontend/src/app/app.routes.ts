import { TaskFormComponent } from './task/task-form/task-form.component';
import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TaskComponent } from './task/task.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: SignupComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'task',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: TaskComponent,
      },
      {
        path: 'add',
        component: TaskFormComponent,
      },
      {
        path: 'edit/:id',
        component: TaskFormComponent,
      },
    ],
  },
];
