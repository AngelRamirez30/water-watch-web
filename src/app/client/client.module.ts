import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { LayoutClientPageComponent } from './pages/layout-client-page/layout-client-page.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { RegisterEmailComponent } from './pages/register-email/register-email.component';
import { RegisterPersonalDataComponent } from './pages/register-personal-data/register-personal-data.component';
import { RegisterCredentialsComponent } from './pages/register-credentials/register-credentials.component';
import { RegisterAddressComponent } from './pages/register-address/register-address.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CitaDialogComponent } from './components/cita-dialog/cita-dialog.component';
import { AddressDialogComponent } from './components/address-dialog/address-dialog.component';


@NgModule({
  declarations: [
    HomeComponent,
    LayoutClientPageComponent,
    RegisterEmailComponent,
    RegisterPersonalDataComponent,
    RegisterCredentialsComponent,
    RegisterAddressComponent,
    CitaDialogComponent,
    AddressDialogComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ClientModule { }
