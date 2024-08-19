import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { AppointmentNotAsignedCardComponent } from './components/appointment-not-asigned-card/appointment-not-asigned-card.component';
import { AppointmentAsignedCardComponent } from './components/appointment-asigned-card/appointment-asigned-card.component';
import { CompleteAppointmentComponent } from './components/complete-appointment/complete-appointment.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LayoutPageComponent,
    HomePageComponent,
    AppointmentNotAsignedCardComponent,
    AppointmentAsignedCardComponent,
    CompleteAppointmentComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class EmployeesModule { }
