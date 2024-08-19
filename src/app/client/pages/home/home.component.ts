import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';
import { LayoutClientPageComponent } from '../layout-client-page/layout-client-page.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CitaDialogComponent } from '../../components/cita-dialog/cita-dialog.component';
import { AppointmentService } from '../../services/appointment.service';
import { PendingAppointment } from '../../interfaces/appointment.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  public isLoggedIn!: boolean;
  public emailForm: FormGroup;

  isLoaded = false;

  public pendingAppointment?: PendingAppointment;

  imagesRoutes = {
    header: '../../../../assets/img/rotoplas.png',
    eureka: '../../../../assets/img/eureka.png',
    img1: '../../../../assets/img/img1.png',
    img2: '../../../../assets/img/img2.png',
    img3: '../../../../assets/img/img3.png',
    regtangle2: '../../../../assets/img/rectangle2.png',
    logowaterwatch: '../../../../assets/img/logowaterwatch.png',
  }

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private clientService: ClientService,
    private appoinmentService: AppointmentService,
    private fb: FormBuilder
  ) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.clientService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
    this.getPendingAppointment();
  }

  openCitaDialog(): void {
    const dialogRef = this.dialog.open(CitaDialogComponent, {
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.getPendingAppointment();
      }
    });
  }


  redirectToRegister(): void {
    //Validate if the email format is correct
    if(this.emailForm.valid) {
      this.clientService.registerData.email = this.emailForm.value.email;
      this.router.navigateByUrl('/register-personal-data');
    }
    this.router.navigateByUrl('/register-email');
  }

  getPendingAppointment(): void {
    this.isLoaded = false;
    this.appoinmentService.getPendingAppointment().subscribe(
      (appointment) => {
        this.isLoaded = true;
        if(appointment) {
          this.pendingAppointment = appointment;
        }
      }, (error) => {
        this.isLoaded = true;
      }
    );
  }

  get employeeAsigned(): string {
    if(this.pendingAppointment) {
      if(this.pendingAppointment.employee_id === 0) return 'Sin asignar';
      return this.pendingAppointment.employee_id + "";
    }
    return '';
  }
}
