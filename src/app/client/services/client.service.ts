import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { BaseApiService } from '../../services/base-api.service';
import { RegisterClientRequest, RegisterClientResponse, RegisterErrorResponse } from '../interfaces/register-client.interface';
import { LoginDialogComponent } from '../../shared/components/login-dialog/login-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../shared/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { UtilsService } from '../../shared/services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.checkLoginStatus());
  public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  public registerData: RegisterClientRequest = {
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '',
    country_code: '',
    phone_number: '',
    state: '',
    city: '',
    street: '',
    house_number: '',
    neighborhood: '',
    postal_code: ''
  };

  private baseUrl = `${this.baseApiService.baseUrl}/client`;

  constructor(
    private http: HttpClient,
    private utils: UtilsService,
    private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private cookieService: CookieService,
    private baseApiService: BaseApiService
  ) {
    // Verifica el estado de inicio de sesión al iniciar el servicio
    this.utils.checkTokenValidity().subscribe(response => {
      this.isLoggedInSubject.next(response.is_valid_token);
      if (response.is_valid_token) {
        this.router.navigateByUrl('/home');
      }
    });
  }

  public getPendingInstallations(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/get-pending-installation-appointment`, { headers: { 'AuthRequired': 'true' } })
      .pipe(
        tap(response => {
          console.log(response);
        })
      );
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.login(result.username, result.password);
      }
    });
  }

  openLogoutConfirmation(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: { message: '¿Estás seguro de que quieres cerrar sesión?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.logout();
        this.showMessage('Has cerrado sesión correctamente');
      }
    });
  }

  public register(): Observable<RegisterClientResponse | RegisterErrorResponse> {
    if (!this.isRegisterDataValid(this.registerData)) {
      console.log(this.registerData);
      return throwError(() => new Error('Datos de registro inválidos'));
    }
    return this.http.post<RegisterClientResponse | RegisterErrorResponse>(`${this.baseUrl}/register`, this.registerData)
      .pipe(
        tap(response => {
          if ('error' in response) {
            this.showMessage('Error de registro');
          } else {
            this.showMessage('Registro exitoso');
            this.login(this.registerData.username, this.registerData.password);
            this.registerData = {
              first_name: '',
              last_name: '',
              email: '',
              username: '',
              password: '',
              country_code: '',
              phone_number: '',
              state: '',
              city: '',
              street: '',
              house_number: '',
              neighborhood: '',
              postal_code: ''
            };
          }

      }));
  }

  private isRegisterDataValid(data: RegisterClientRequest): boolean {
    if(data.country_code.trim() === '') {
      data.country_code = '+52';
    }
    return data.first_name.trim() !== '' &&
           data.last_name.trim() !== '' &&
           data.email.trim() !== '' &&
           data.username.trim() !== '' &&
           data.password.trim() !== '' &&
           data.country_code.trim() !== '' &&
           data.phone_number.trim() !== '' &&
           data.state.trim() !== '' &&
           data.city.trim() !== '' &&
           data.street.trim() !== '' &&
           data.house_number.trim() !== '' &&
           data.neighborhood.trim() !== '' &&
           data.postal_code.trim() !== '';
  }

  private login(username: string, password: string): void {
    this.authService.login(username, password, 'client').subscribe(
      response => {
        if (response && 'token' in response) {
          this.cookieService.set('authToken', response.token, 3);
          this.setLoginStatus(true);
          this.showMessage('Inicio de sesión exitoso');
          this.router.navigateByUrl('/home');
        } else {
          this.showMessage('Error de inicio de sesión');
        }
      }
    );
  }

  private logout(): void {
    this.cookieService.delete('authToken');
    this.setLoginStatus(false);
    this.authService.logout();
  }

  private checkLoginStatus(): boolean {
    const token = this.cookieService.get('authToken');
    return !!token;
  }

  private setLoginStatus(status: boolean): void {
    this.isLoggedInSubject.next(status);
  }

  public showMessage(message: string): void {
    this.snackBar.open(message, undefined, {
      duration: 3000
    });
  }

  
}
