import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Add } from '../../../model/add.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
})
export class AddComponent implements OnInit {
  form!: FormGroup;

  jsonArrayData: Add[] = [];

  constructor(private fb: FormBuilder, private router: Router) {
    //fb tạo ra các from control ,addressService lấy dữ liệu
    this.form = this.fb.group({
      // tạo 1 form group chứa một form control
      address: [''],
    });
  }

  ngOnInit(): void {
    const data = this.getDataFromLocalStorage();
    this.jsonArrayData = data ? data : [];
    // //Check rỗng
    this.form = this.fb.group({
      hoTen: ['', Validators.required],
      ngaySinh: ['', Validators.required],
      gioiTinh: ['', Validators.required],
      diaChi: ['', Validators.required],
      fbWeb: ['', [Validators.required, Validators.pattern('https?://.+')]],
    });
  }

  // Lưu dữ liệu vào localStorage
  saveDataToLocalStrorage(data: any): void {
    const jsonData = JSON.stringify(data);
    localStorage.setItem('personalData', jsonData);
  }
  //Lấy dữ liệu từ localStorage

  getDataFromLocalStorage(): Add[] {
    const jsonData = localStorage.getItem('personalData');
    if (jsonData) {
      const parsedData = JSON.parse(jsonData);
      if (Array.isArray(parsedData)) {
        return parsedData;
      }
    }
    return [];
  }
  getId(): number {
    const data = localStorage.getItem('personalData'); // Lấy dữ liệu từ localStorage
    if (data) {
      const parsedData = JSON.parse(data); // Parse dữ liệu JSON
      if (Array.isArray(parsedData) && parsedData.length > 0) {
        const lastItem = parsedData[parsedData.length - 1]; // Lấy phần tử cuối cùng
        return lastItem.id + 1; // Trả về ID mới là ID của phần tử cuối + 1
      }
    }
    return 1; // Nếu không có dữ liệu, trả về ID mặc định là 1
  }
  onSubmit() {
    if (this.form.valid) {
      const formData = {
        id: this.getId(),
        hoTen: (document.getElementById('hoTen') as HTMLInputElement).value,
        ngaySinh: (document.getElementById('ngaySinh') as HTMLInputElement)
          .value,
        gioiTinh: (document.getElementById('gioiTinh') as HTMLSelectElement)
          .value,
        diaChi: (document.getElementById('diaChi') as HTMLSelectElement).value,
        fbWeb: (document.getElementById('fbWeb') as HTMLInputElement).value,
      };
      this.jsonArrayData.push(formData);
      this.saveDataToLocalStrorage(this.jsonArrayData);
      console.log('Retrieved Data:', this.jsonArrayData);
      this.saveDataToLocalStrorage(this.jsonArrayData);
      alert(`Thêm thành công rồi nhé!`);
      this.router.navigate(['display']);
      // setTimeout(() => this.router.navigate(['display']), 0);
    }
  }
}
