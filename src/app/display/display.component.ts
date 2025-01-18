import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-display',
  imports: [CommonModule],
  templateUrl: './display.component.html',
  styleUrl: './display.component.css',
})
export class DisplayComponent {
  personalData: any[] = [];
  constructor() {}
  ngOnInit() {
    this.loadData();
  }
  // Load dữ liệu từ localStorage
  loadData() {
    const data = localStorage.getItem('personalData');
    this.personalData = data ? JSON.parse(data) : [];
  }

  // Xóa một item theo ID
  deleteData(id: number) {
    if (confirm('Bạn có chắc chắn muốn xóa người này không?')) {
      this.personalData = this.personalData.filter(
        (person) => person.id !== id
      );
      localStorage.setItem('personalData', JSON.stringify(this.personalData));
    }
  }
}
