import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BaseApiService } from '../../services/base-api.service';
import { LoginErrorResponse, LoginResponse } from '../../client/interfaces/login-response.interface';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private baseApiService: BaseApiService
  ) { }


  public login(username: string, password: string, typeOfUser: string): Observable<LoginResponse | LoginErrorResponse> {
    const baseUrl = `${this.baseApiService.baseUrl}/${typeOfUser}`;

    const body = { username, password };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });

    return this.http.post<LoginResponse | LoginErrorResponse>(`${baseUrl}/login`, body, { headers })
      .pipe(
        tap(response => {
          if ('token' in response) {
            this.cookieService.set('authToken', response.token, 3);
          }
        })
      );
  }

  public logout(): void {
    this.cookieService.delete('authToken');
  }
}
