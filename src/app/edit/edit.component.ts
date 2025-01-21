import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Add } from '../../../model/add.model';

@Component({
  selector: 'app-edit',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {

  personalData: Add[] = [];
  form!: FormGroup;
  selectedPerson: any;

  constructor(private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.callData();
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : null;
    if (id !== null && !isNaN(id)) {
      this.load(id);
    } else {
      console.error('ID không hợp lệ:', idParam);
    }
  }

  callData() {
    const data = localStorage.getItem('personalData');
    this.personalData = data ? JSON.parse(data) : [];
  }

  load(id: number) {
    this.selectedPerson = this.personalData.filter(person => person.id === id);
    if (this.selectedPerson[0]) {
      if (!this.form) {
        this.form = this.fb.group({
          id: ['', Validators.required],
          hoTen: ['', Validators.required],
          ngaySinh: ['', Validators.required],
          gioiTinh: ['', Validators.required],
          diaChi: ['', Validators.required],
          fbWeb: ['', [Validators.required, Validators.pattern('https?://.+')]]
        });
      }
      this.form.patchValue(this.selectedPerson[0]);
    } else {
      console.error('Không tìm thấy người với ID:', id);
    }
  }

  onSubmit() {
    if (this.form.valid) {
      // Cập nhật dữ liệu và lưu lại vào localStorage
      const updatedData = this.form.value;
      const index = this.personalData.findIndex(person => person.id === updatedData.id);
      if (index !== -1) {
        this.personalData[index] = updatedData;
        localStorage.setItem('personalData', JSON.stringify(this.personalData));
        console.log('Dữ liệu đã được cập nhật:', updatedData);
      } else {
        console.error('Không tìm thấy người với ID:', updatedData.id);
      }
    } else {
      console.error('Biểu mẫu không hợp lệ');
    }
  }
}
