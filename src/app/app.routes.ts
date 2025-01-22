import { Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { DisplayComponent } from './display/display.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: 'add', component: AddComponent },
  { path: 'edit/:id', component: EditComponent },
  // { path: '', redirectTo: 'display', pathMatch: 'full' }, // Route mặc định chuyển hướng đến 'display'
  { path: 'display', component: DisplayComponent }, // Route hiển thị DisplayComponent
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
