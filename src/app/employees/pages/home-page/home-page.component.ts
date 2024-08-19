import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../../services/employees.service';
import { AppointmentService } from '../../../shared/services/appointment.service';
import { PendingAppointment } from '../../../client/interfaces/appointment.interface';

@Component({
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {

  public isLoaded = false;
  public isLoggedIn!: boolean;
  assignedAppointments: PendingAppointment[] = [];
  notAssignedAppointments: PendingAppointment[] = [];

  constructor(
    private employeesService: EmployeesService,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    this.loadData(true);
    this.employeesService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  loadData(value: boolean): void {
    if(value) {
      this.getAssignedAppointments();
      this.getNotAssignedAppointments();
    }
  }

  getAssignedAppointments(): void {
    this.isLoaded = false;
    this.assignedAppointments = [];
    this.appointmentService.getAllAppointmentsAssigned()
    .subscribe((appointments) => {
      this.isLoaded = true;
      if(appointments === null) {
        this.assignedAppointments = [];
        return
      }
      this.assignedAppointments = appointments;
    });
  }

  getNotAssignedAppointments(): void {
    this.isLoaded = false;
    this.notAssignedAppointments = [];
    this.appointmentService.getAllAppointmentsNotAssigned()
    .subscribe(appointments => {
      if(appointments === null) {
        this.notAssignedAppointments = [];
        return;
      }
      this.notAssignedAppointments = appointments;
      this.isLoaded = true;
    });
  }

}
