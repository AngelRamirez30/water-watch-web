import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ValidateTokenResponse } from '../interfaces/validateTokenResponse';
import { BaseApiService } from '../../services/base-api.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private http: HttpClient,
    private baseApiService: BaseApiService,
    private cookieService: CookieService
  ) { }

  private baseUrl = `${this.baseApiService.baseUrl}`;

  public checkTokenValidity(): Observable<ValidateTokenResponse> {
    return this.http.get<ValidateTokenResponse>(`${this.baseUrl}/validate-token`);
  }

  public getToken(): string {
    return this.cookieService.get('authToken');
  }
}
