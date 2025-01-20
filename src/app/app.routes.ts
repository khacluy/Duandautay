import { Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { DisplayComponent } from './display/display.component';

export const routes: Routes = [
  { path: 'add', component: AddComponent },
  { path: 'edit', component: EditComponent },
  { path: '', redirectTo: 'display', pathMatch: 'full' }, // Route mặc định chuyển hướng đến 'display'
  { path: 'display', component: DisplayComponent },       // Route hiển thị DisplayComponent
];
