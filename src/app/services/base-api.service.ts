import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {

  private apiUrl = environment.apiUrl;

  constructor() {
    console.log('API URL:', this.apiUrl);
  }

  public baseUrl = this.apiUrl;
}
