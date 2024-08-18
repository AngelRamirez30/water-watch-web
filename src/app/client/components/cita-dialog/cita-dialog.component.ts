import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdressService } from '../../services/adress.service';
import { Address } from '../../interfaces/address.interface';
import { AddressDialogComponent } from '../address-dialog/address-dialog.component';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-cita-dialog',
  templateUrl: './cita-dialog.component.html',
  styleUrls: ['./cita-dialog.component.css']
})
export class CitaDialogComponent implements OnInit {

  displayedColumns: string[] = ['select', 'address', 'actions'];
  isDataLodeaded = false;
  selectedAddress: Address | null = null;
  dataSource: Address[] = [];
  firstStep = true;

  constructor(
    public dialog: MatDialog,
    private addressService: AdressService
  ) {}

  ngOnInit(): void {
    this.loadAddresses();
  }

  loadAddresses(): void {
    this.isDataLodeaded = false;
    this.addressService.getAllAdresses().subscribe(response => {
      this.dataSource = response;
      this.isDataLodeaded = true;
    });
  }

  onAddressSelect(address: Address): void {
    if (this.selectedAddress === address) {
      this.selectedAddress = null;
      return;
    }
    this.selectedAddress = address;
  }

  addAddress(): void {
    const dialogRef = this.dialog.open(AddressDialogComponent, {
      width: '500px', // Ajusta según sea necesario
      data: null // Pasar null para agregar una nueva dirección
    });

    dialogRef.afterClosed().subscribe( (address: Address) => {
      console.log(address);
      if (address) {
        this.addressService.addAddress(address).subscribe(response => {
          console.log(response);
          this.loadAddresses();
        });
      }
    });
  }

  editAddress(address: Address): void {
    console.log(address);
    const dialogRef = this.dialog.open(AddressDialogComponent, {
      width: '500px', // Ajusta según sea necesario
      data: address // Pasar la dirección para editar
    });

    dialogRef.afterClosed().subscribe( (address: Address) => {
    if (address) {
        this.addressService.updateAddress(address).subscribe(response => {
          this.loadAddresses();
        });
      }
    });
  }

  deleteAddress(address: Address): void {
    const message = `¿Estás seguro de que deseas eliminar la dirección ${address.street} ${address.house_number}?`;
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: { message }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.addressService.deleteAddress(address.id!).subscribe(response => {
          this.loadAddresses();
        });
      }
    });
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }

  selectAddress(): void {
    this.firstStep = false;
  }

  get isSelectedAddress(): boolean {
    return !!this.selectedAddress;
  }
}
