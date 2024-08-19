import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AppointmentService } from '../../../shared/services/appointment.service';
import { PendingAppointment } from '../../../client/interfaces/appointment.interface';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'appointment-not-asigned-card',
  templateUrl: './appointment-not-asigned-card.component.html',
  styleUrl: './appointment-not-asigned-card.component.css'
})
export class AppointmentNotAsignedCardComponent {
  @Input() appointment!: PendingAppointment;

  constructor(
    private appointmentService: AppointmentService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ){}

  //Output
  @Output() acceptedAppointment: EventEmitter<boolean> = new EventEmitter();

  acceptAppointment(): void {
    this.appointmentService.acceptAppointment(this.appointment.id)
    .subscribe((response) => {
      console.log(response);
    });
  }

  get typeOfAppointment(): string {
    return this.appointment.appointment_type_id === 1 ? 'Instalación' :
           this.appointment.appointment_type_id === 2 ? 'Mantenimiento' : 'No definido';
  }

  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        title: 'Aceptar cita',
        message: '¿Estás seguro de que quieres aceptar esta cita?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result === 'confirm') {
        this.acceptAppointment();
        this.acceptedAppointment.emit(true);
        this.snackBar.open('Cita aceptada', undefined, { duration: 2000 });
      }

    });
  }
}
