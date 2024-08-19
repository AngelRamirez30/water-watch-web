import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../../services/employees.service';
import { UtilsService } from '../../../shared/services/utils.service';
import { LoginDialogComponent } from '../../../shared/components/login-dialog/login-dialog.component';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../shared/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css'
})
export class LayoutPageComponent implements OnInit {
  public isLoggedIn = false;

  sidebarItems = [
    { name: 'Home', icon: 'home', url: '/home' },
    { name: 'Profile', icon: 'person', url: '/profile' },
    { name: 'Settings', icon: 'settings', url: '/settings' }
  ]

  constructor(
    private employeesService: EmployeesService,
  ) {}

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  openLoginDialog(): void {
    this.employeesService.openLoginDialog();
  }

  openLogoutConfirmation(): void {
    this.employeesService.openLogoutConfirmation();
  }

  private checkLoginStatus(): void {
    this.employeesService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  public onCellphoneSize(): boolean {
    return window.innerWidth < 768;
  }
}
