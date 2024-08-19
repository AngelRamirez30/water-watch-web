import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Address } from '../../interfaces/address.interface';
import { AddressDialogComponent } from '../address-dialog/address-dialog.component';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { AdressService } from '../../services/adress.service';
import { AppointmentService } from '../../../shared/services/appointment.service';
import { Appointment } from '../../interfaces/appointment.interface';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-cita-dialog',
  templateUrl: './cita-dialog.component.html',
  styleUrls: ['./cita-dialog.component.css']
})
export class CitaDialogComponent implements OnInit {

  firstStep: boolean = true;
  isDataLoaded: boolean = false;
  isSelectedAddress: boolean = false;
  isDataValid: boolean = false;
  date?: Date;
  time?: string;
  description?: string;
  dataSource: Address[] = [];
  displayedColumns: string[] = ['select', 'address', 'actions'];
  selectedAddress: Address | null = null;

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<CitaDialogComponent>,
    private addressService: AdressService,
    private appointmentService: AppointmentService,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.loadAddresses();
  }

  loadAddresses(): void {
    this.addressService.getAllAdresses().subscribe(
      (addresses: Address[]) => {
        this.dataSource = addresses;
        this.isDataLoaded = true;
      }
    );
  }

  onAddressSelect(address: Address): void {
    this.selectedAddress = address;
    this.isSelectedAddress = true;
    this.isDataValid = this.validateData();
  }

  editAddress(address: Address): void {
    const dialogRef = this.dialog.open(AddressDialogComponent, {
      width: '400px',
      data: { address }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadAddresses(); // Refresh the list
      }
    });
  }

  deleteAddress(address: Address): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { message: '¿Estás seguro de que deseas eliminar esta dirección?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addressService.deleteAddress(address.id!).subscribe(() => {
          this.loadAddresses(); // Refresh the list
        });
      }
    });
  }

  addAddress(): void {
    const dialogRef = this.dialog.open(AddressDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadAddresses(); // Refresh the list
      }
    });
  }

  closeDialog(): void {
    // Logic to close dialog
  }

  selectAddress(): void {
    this.firstStep = false;
  }

  backToFirstStep(): void {
    this.firstStep = true;
  }

  saveCita(): void {
    if (this.date && this.time) {
      // Convierte el tiempo de formato 12 horas a 24 horas
      const timeParts = this.time.match(/(\d+):(\d+) (AM|PM)/);
      if (timeParts) {
        let [_, hoursStr, minutesStr, period] = timeParts;
        const hours = parseInt(hoursStr, 10);
        const minutes = parseInt(minutesStr, 10);

        // Convierte horas AM/PM a formato 24 horas
        let adjustedHours = hours;
        if (period === 'PM' && hours < 12) adjustedHours += 12;
        if (period === 'AM' && hours === 12) adjustedHours = 0;

        // Crear un objeto Date y ajustar la hora y minutos
        const requestedDate = new Date(this.date);
        requestedDate.setHours(adjustedHours);
        requestedDate.setMinutes(minutes);
        requestedDate.setSeconds(0); // Asegúrate de que los segundos estén en cero

        // Convierte la fecha y hora a formato ISO 8601
        const isoDateString = requestedDate.toISOString();

        const appointment: Appointment = {
          address_id: this.selectedAddress!.id!,
          details: this.description!,
          requested_date: isoDateString
        }

        this.appointmentService.addAppointment(appointment).subscribe((response) => {
          if (response.message === "Appointment created successfully!") {
            this.clientService.showMessage("Cita creada exitosamente");
            this.dialogRef.close(true);
          }
        });
      } else {
        console.error("Time format is invalid.");
      }
    }
  }




  validateData(): boolean {
    console.log({
      selectedAddress: this.selectedAddress,
      description: this.description,
      date: this.date,
      time: this.time
    });
    return !!(
      this.selectedAddress &&
      this.description &&
      this.date &&
      this.time
    );
  }

  onDateChange(): void {
    this.isDataValid = this.validateData();
  }

  onTimeChange(): void {
    this.isDataValid = this.validateData();
  }

  onDescriptionChange(): void {
    this.isDataValid = this.validateData();
  }
}
