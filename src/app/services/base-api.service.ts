import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {

  private apiUrl = environment.apiUrl;

  constructor() {}

  public baseUrl = this.apiUrl;
}
