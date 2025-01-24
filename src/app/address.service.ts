import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from '../../model/address.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private apiUrl = 'data/duLieuDC.json';
  constructor(private httpClient:HttpClient) { }

  getAll():Observable<Address[]>{
    return this.httpClient.get<Address[]>(this.apiUrl).pipe()
  }
}

