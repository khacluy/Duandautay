import { Component, OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Add } from '../../../model/add.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
})
export class AddComponent implements OnInit, OnDestroy {

  form!: FormGroup;

  constructor(private fb: FormBuilder) {
    //fb tạo ra các from control ,addressService lấy dữ liệu
    this.form = this.fb.group({
      // tạo 1 form group chứa một form control
      address: [''],
    });
  }

  ngOnInit(): void {
    const data = this.getDataFromLocalStorage();
    this.jsonArrayData = data ? data : [];
    // Check rỗng
    this.form = this.fb.group({
      id: ['', Validators.required],
      hoTen: ['', Validators.required],
      ngaySinh: ['', Validators.required],
      gioiTinh: ['', Validators.required],
      diaChi: ['', Validators.required],
      fbWeb: ['', [Validators.required, Validators.pattern('https?://.+')]]
    });
  }
  ngOnDestroy(): void {
    // Thực hiện các thao tác dọn dẹp nếu cần
  }

  // Lưu dữ liệu vào localStorage
  saveDataToLocalStrorage(data: any): void {
    const jsonData = JSON.stringify(data);
    localStorage.setItem('personalData', jsonData);
  }

  //Lấy dữ liệu từ localStorage

  jsonArrayData: Add[] = [];

  getDataFromLocalStorage(): Add[] {
    const jsonData = localStorage.getItem('personalData');
    if (jsonData) {
      const parsedData = JSON.parse(jsonData);
      if (Array.isArray(parsedData)) { return parsedData; }
    }
    return [];
  }

  // Lưu dữ liệu vào file JSON
  // savaJsonToFile(data: any, fileName: string): void {
  //   const json = JSON.stringify(data, null, 2);
  //   const blod = new Blob([json], { type: 'application/json' });
  //   const url = window.URL.createObjectURL(blod);
  //   const a = document.createElement('a');
  //   a.href = url;
  //   a.download = fileName;
  //   a.click();
  //   window.URL.revokeObjectURL(url);
  // }

  private markAllAsTouched(formGroup: FormGroup = this.form): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markAllAsTouched(control);
      }
    });
  }
  
  onSubmit() {
    if (this.form.valid) {
      const formData = {
        id: +(document.getElementById('id') as HTMLInputElement).value,
        hoTen: (document.getElementById('hoTen') as HTMLInputElement).value,
        ngaySinh: (document.getElementById('ngaySinh') as HTMLInputElement).value,
        gioiTinh: (document.getElementById('gioiTinh') as HTMLSelectElement).value,
        diaChi: (document.getElementById('diaChi') as HTMLSelectElement).value,
        fbWeb: (document.getElementById('fbWeb') as HTMLInputElement).value,
      };
      this.jsonArrayData.push(formData);
      this.saveDataToLocalStrorage(this.jsonArrayData);
      console.log('Retrieved Data:', this.jsonArrayData);
      this.saveDataToLocalStrorage(this.jsonArrayData);
      //this.savaJsonToFile(retrievedData, 'danhSach.json');
      this.markAllAsTouched();
      return;
    }
  }
}

