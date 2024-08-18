import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from '../material/material.module';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { FormsModule } from '@angular/forms';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';



@NgModule({
  declarations: [
    FooterComponent,
    LoginDialogComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  exports: [
    FooterComponent,
    LoginDialogComponent,
  ]
})
export class SharedModule { }
