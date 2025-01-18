export class Add {
  id: string;
  hoTen: string;
  ngaySinh: string;
  gioiTinh: string;
  diaChi: string;
  fbWeb: string;

  constructor(
    id: string,
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
