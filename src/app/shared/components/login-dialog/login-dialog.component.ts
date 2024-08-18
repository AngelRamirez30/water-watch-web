import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ClientService } from '../../../client/services/client.service';

@Component({
  selector: 'shared-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.css'
})
export class LoginDialogComponent {

  hide = true;

  username: string = '';
  password: string = '';

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
  ) {}

  togglePassword() {
    this.hide = !this.hide;
  }

  enableButton(): boolean {
    return this.username.length > 0 && this.password.length > 0;
  }

  onSubmit(): void {
    this.dialogRef.close({ username: this.username, password: this.password });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
