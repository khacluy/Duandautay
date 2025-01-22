import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment.development';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLogin(): void {
    if (this.form.valid) {
      const { username, password } = this.form.value;
      console.log('u: ' + username + ' p: ' + password);

      if (
        username === environment.username &&
        password === environment.password
      ) {
        console.log('Đăng nhập thành công');
        this.router.navigate(['/display']);
      } else {
        alert('Tên đăng nhập hoặc mật khẩu không đúng');
        // Hiển thị thông báo lỗi cho người dùng
      }
    } else {
      console.log('Invalid username or password');
      // Hiển thị thông báo lỗi cho người dùng
    }
  }
}
