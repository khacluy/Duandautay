import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { Router } from '@angular/router'; // Import Router để điều hướng
@Component({
  selector: 'app-display',
  imports: [CommonModule],
  templateUrl: './display.component.html',
  styleUrl: './display.component.css',
})
export class DisplayComponent {
  personalData: any[] = [];
  searchResul: any[] = [];
  deleteresul: any[] = [];
  constructor(private router: Router) {}
  ngOnInit() {
    this.loadData();
  }
  // Load dữ liệu từ localStorage
  loadData() {
    const data = localStorage.getItem('personalData');
    this.personalData = data ? JSON.parse(data) : [];
    this.searchResul = this.personalData;
  }

  // Xóa một item theo ID
  deleteData(id: number) {
    if (confirm('Bạn có chắc chắn muốn xóa người này không?')) {
      this.personalData = this.personalData.filter(
        (person) => person.id !== id
      );
      localStorage.setItem('personalData', JSON.stringify(this.personalData));

      this.searchResul = this.personalData;
    }
  }
  goToEditComponent(id: number) {
    //this.router.navigate(['/edit'], { queryParams: { id: id } });
    this.router.navigate(['/edit', id]);
  }
  TimKiem(ten: string) {
    if (ten.trim()) {
      this.searchResul = this.personalData.filter((person: any) =>
        person.hoTen.toLowerCase().includes(ten.toLowerCase())
      );
    } else {
      this.searchResul = this.personalData; // Nếu không có từ khóa tìm kiếm, hiển thị toàn bộ dữ liệu
    }
  }
}
