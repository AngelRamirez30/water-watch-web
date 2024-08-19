import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {

  private apiUrl: string = '';

  constructor() {
    this.apiUrl = environment.apiUrl;
    console.log('API URL:', this.apiUrl);
  }

  public baseUrl = this.apiUrl;
}
