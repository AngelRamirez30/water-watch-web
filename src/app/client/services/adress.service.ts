import { Injectable } from '@angular/core';
import { BaseApiService } from '../../services/base-api.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address } from '../interfaces/address.interface';



@Injectable({
  providedIn: 'root'
})
export class AdressService {

  constructor(
    private http: HttpClient,
    private baseApi: BaseApiService
  ) {}

  private baseUrl = `${this.baseApi.baseUrl}/client`;

  getAllAdresses():Observable<Address[]> {
    return this.http.get<Address[]>(`${this.baseUrl}/get-all-addresses`);
  }

  addAddress(address: Address):Observable<Address> {
    return this.http.post<Address>(`${this.baseUrl}/create-address`, address);
  }

  updateAddress(address: Address):Observable<{message: string, token: string}> {
    return this.http.patch<{message: string, token: string}>(`${this.baseUrl}/update-address`, address);
  }

  deleteAddress(id: number):Observable<{message: string, token: string}> {
    return this.http.delete<{message: string, token: string}>(`${this.baseUrl}/delete-address/${id}`);
  }
}
