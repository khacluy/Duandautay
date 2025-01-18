import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Add } from '../../../model/add.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
})
export class AddComponent implements OnInit {
  form!: FormGroup;
  // filteredOptions: Observable<string[]>;
  constructor(private fb: FormBuilder) {
    //fb tạo ra các from control ,addressService lấy dữ liệu
    this.form = this.fb.group({
      // tạo 1 form group chứa một form control
      address: [''],
    });
  }

  ngOnInit(): void {
    this.jsonArrayData = this.getDataFromLocalStorage();
  }

  // Lưu dữ liệu vào localStorage
  saveDataToLocalStrorage(data: any): void {
    const jsonData = JSON.stringify(data);
    localStorage.setItem('personalData', jsonData);
  }
  //Lấy dữ liệu từ localStorage

  jsonArrayData: Add[] = [];
  // Đọc dữ liệu từ localStorage
  getDataFromLocalStorage(): any {
    const jsonData = localStorage.getItem('personalData');
    if (jsonData) {
      return JSON.parse(jsonData);
    }
    return null;
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

  onSubmit() {
    if (this.form.valid) {
      const formData = {
        id: (document.getElementById('id') as HTMLInputElement).value,
        hoTen: (document.getElementById('hoTen') as HTMLInputElement).value,
        ngaySinh: (document.getElementById('ngaySinh') as HTMLInputElement)
          .value,
        gioiTinh: (document.getElementById('gioiTinh') as HTMLSelectElement)
          .value,
        diaChi: (document.getElementById('diaChi') as HTMLSelectElement).value,
        fbWeb: (document.getElementById('fbWeb') as HTMLInputElement).value,
      };

      this.saveDataToLocalStrorage(formData);
      const retrievedData = this.getDataFromLocalStorage();
      this.jsonArrayData.push(retrievedData);
      console.log('Retrieved Data:', this.jsonArrayData);
      this.saveDataToLocalStrorage(this.jsonArrayData);
      //this.savaJsonToFile(retrievedData, 'danhSach.json');
    }
  }
}
