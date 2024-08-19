import { Injectable } from '@angular/core';
import { UtilsService } from '../../shared/services/utils.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../shared/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { LoginDialogComponent } from '../../shared/components/login-dialog/login-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(
    private utilsService: UtilsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ){
    this.utilsService.checkTokenValidity().subscribe(response => {
      if(response.is_valid_token === true && response.type_of_user === 'employee'){
        this.setLoginStatus(true);
      }
      if(response.is_valid_token === true && response.type_of_user === 'client') this.router.navigate([''])
    });
  }

  private setLoginStatus(status: boolean): void {
    this.isLoggedInSubject.next(status);
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

  private login(username: string, password: string): void {
    this.authService.login(username, password, 'employee').subscribe(
      response => {
        if (response && 'token' in response) {
          this.cookieService.set('employeeToken', response.token, 3);
          this.setLoginStatus(true);
          this.showMessage('Inicio de sesión exitoso');
          this.router.navigateByUrl('/home');
        } else {
          this.showMessage('Error de inicio de sesión');
        }
      }
    );
  }

  public showMessage(message: string): void {
    this.snackBar.open(message, undefined, {
      duration: 3000
    });
  }

  private logout(): void {
    this.cookieService.delete('authToken');
    this.setLoginStatus(false);
    this.authService.logout();
  }
}
