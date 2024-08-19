import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ValidateTokenResponse } from '../interfaces/validateTokenResponse';
import { BaseApiService } from '../../services/base-api.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

  private baseUrl: string = environment.apiUrl;

  public checkTokenValidity(): Observable<ValidateTokenResponse> {
    return this.http.get<ValidateTokenResponse>(`${this.baseUrl}/validate-token`);
  }

  public getToken(): string {
    return this.cookieService.get('authToken');
  }
}
