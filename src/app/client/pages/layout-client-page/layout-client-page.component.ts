import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../../../shared/components/login-dialog/login-dialog.component';
import { ClientService } from '../../services/client.service';
import { UtilsService } from '../../../shared/services/utils.service';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './layout-client-page.component.html',
  styleUrl: './layout-client-page.component.css'
})
export class LayoutClientPageComponent implements OnInit {

  public isLoggedIn = false;

  sidebarItems = [
    { name: 'Home', icon: 'home', url: '/home' },
    { name: 'Profile', icon: 'person', url: '/profile' },
    { name: 'Settings', icon: 'settings', url: '/settings' }
  ]

  constructor(
    private clientService: ClientService,
  ) {}

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  openLoginDialog(): void {
    this.clientService.openLoginDialog();
  }

  openLogoutConfirmation(): void {
    this.clientService.openLogoutConfirmation();
  }

  private checkLoginStatus(): void {
    this.clientService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  public onCellphoneSize(): boolean {
    return window.innerWidth < 768;
  }

}
