import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PendingAppointment } from '../../../client/interfaces/appointment.interface';
import { AppointmentService } from '../../../shared/services/appointment.service';
import { MatDialog } from '@angular/material/dialog';
import { CompleteAppointmentComponent } from '../complete-appointment/complete-appointment.component';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { CompleteInstallation } from '../../interfaces/complete-installation';

@Component({
  selector: 'appointment-asigned-card',
  templateUrl: './appointment-asigned-card.component.html',
  styleUrl: './appointment-asigned-card.component.css'
})
export class AppointmentAsignedCardComponent {
  @Input() appointment!: PendingAppointment;

  //Output
  @Output() refresData: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private appointmentService: AppointmentService,
    private dialog: MatDialog,
  ){}

  completeAppointment(): void {
    const dialogRef = this.dialog.open(CompleteAppointmentComponent, {
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result) {
        const body: CompleteInstallation = {
          id: this.appointment.id,
          address_id: this.appointment.address_id,
          serial_key: result.serial,
          name: result.name,
          capacity: result.capacity,
          diameter: result.diameter,
          height: result.height,
          description: result.description
        };
        this.appointmentService.completeInstallationAppointment(body)
          .subscribe((response) => {
            if(response)
              this.refresData.emit(true);
            console.log(response);
          });
      }
    });
  }

  cancelAppointment(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        title: 'Cancelar cita',
        message: '¿Estás seguro de que quieres cancelar esta cita?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result === 'confirm') {
        this.appointmentService.cancelAppointment(this.appointment.id)
        .subscribe((response) => {
          this.refresData.emit(true);
          console.log(response);
        });
      }
    });
  }

  get typeOfAppointment(): string {
    return this.appointment.appointment_type_id === 1 ? 'Instalación' :
           this.appointment.appointment_type_id === 2 ? 'Mantenimiento' : 'No definido';
  }
}
