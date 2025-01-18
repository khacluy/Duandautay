import { Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';

export const routes: Routes = [
  { path: 'add', component: AddComponent },
  //{ path: '', redirectTo: 'display', pathMatch: 'full' }, // Đường dẫn mặc định
];
