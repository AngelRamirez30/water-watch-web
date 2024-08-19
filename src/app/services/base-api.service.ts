import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {

  public baseUrl: string = '';

  constructor() {
    this.baseUrl = environment.apiUrl;
    console.log('baseUrl:', this.baseUrl)
  }
}
