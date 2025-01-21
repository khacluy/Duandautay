export class Add {
  id: number; 
  hoTen: string; 
  ngaySinh: string; 
  gioiTinh: string; 
  diaChi: string; 
  fbWeb: string;

  constructor(
    id: number,
    hoTen: string,
    ngaySinh: string,
    gioiTinh: string,
    diaChi: string,
    fbWeb: string
  ) {
    this.id = id;
    this.hoTen = hoTen;
    this.ngaySinh = ngaySinh;
    this.gioiTinh = gioiTinh;
    this.diaChi = diaChi;
    this.fbWeb = fbWeb;
  }
}
