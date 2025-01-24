import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { Add } from '../../../model/add.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HomeComponent } from "../home/home.component";
import { AddressService } from '../address.service';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HomeComponent, NzIconModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
})
export class AddComponent implements OnInit {
  form!: FormGroup;
  jsonArrayData: Add[] = [];
  provinces: any[] = [];
  districts: any[] = [];
  wards: any[] = [];
  v: any;
  f: any;
  submitted: Boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private addressService: AddressService) {
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
      cccd: ['', [Validators.required,Validators.pattern(/\b\d{9}\b|\b\d{12}\b/), Validators.minLength(9), Validators.maxLength(12)]],//
      gioiTinh: ['',],
      // province: [{ value: '', disabled: false }, Validators.required],
      // district: [{ value: '', disabled: true }, Validators.required],
      // ward: [{ value: '', disabled: true }, Validators.required],
      diaChi: ['',],
      fbWeb: ['',],//[Validators.required, Validators.pattern('https?://.+')]
    });
    this.f = this.form.controls;


    // this.addressService.getAll().subscribe(data => {
    //   this.provinces = data;
    // });

    // this.form.get('province')?.valueChanges.subscribe(value => {
    //   this.districts = this.provinces.find(p => p.Name === value)?.Districts || [];
    //   this.form.get('district')?.reset();
    //   this.form.get('ward')?.reset();
    //   this.form.get('district')?.enable();
    //   this.form.get('ward')?.disable();
    // });

    // this.form.get('district')?.valueChanges.subscribe(value => {
    //   this.wards = this.districts.find(d => d.Name === value)?.Wards || [];
    //   this.form.get('ward')?.reset();
    //   this.form.get('ward')?.enable();
    // });
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
  add() {
    this.submitted = true;
    if (this.form.valid) {
      const formData = {
        id: this.getId(),
        hoTen: (document.getElementById('hoTen') as HTMLInputElement).value,
        ngaySinh: (document.getElementById('ngaySinh') as HTMLInputElement).value,
        cccd: (document.getElementById('cccd') as HTMLInputElement).value,
        gioiTinh: (document.getElementById('gioiTinh') as HTMLSelectElement).value,
        diaChi: (document.getElementById('diaChi') as HTMLSelectElement).value,
        // diaChi: this.form.get('province')?.value + ', ' + this.form.get('district')?.value + ', ' + this.form.get('ward')?.value,
        fbWeb: (document.getElementById('fbWeb') as HTMLInputElement).value,
      };
      this.jsonArrayData.push(formData);
      this.saveDataToLocalStrorage(this.jsonArrayData);
      console.log('Retrieved Data:', this.jsonArrayData);
      this.saveDataToLocalStrorage(this.jsonArrayData);
      alert(`Thêm thành công rồi nhé!`);
      this.router.navigate(['display']);
      this.submitted = false;
      // setTimeout(() => this.router.navigate(['display']), 0);
    }
  }
}
