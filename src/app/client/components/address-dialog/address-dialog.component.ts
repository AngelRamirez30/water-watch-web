import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Address } from '../../interfaces/address.interface';

@Component({
  selector: 'app-address-dialog',
  templateUrl: './address-dialog.component.html',
  styleUrls: ['./address-dialog.component.css']
})
export class AddressDialogComponent {
  addressForm: FormGroup;
  buttonText: string = 'Agregar';

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddressDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Address
  ) {
    if (data) {
      this.buttonText = 'Actualizar';
    }
    this.addressForm = this.fb.group({
      id: [data?.id || null],  // Handle id if needed
      client_id: [data?.client_id || null],  // Handle client
      state: [data?.state || '', Validators.required],
      city: [data?.city || '', Validators.required],
      street: [data?.street || '', Validators.required],
      neighborhood: [data?.neighborhood || '', Validators.required],
      postal_code: [data?.postal_code || '', Validators.required],
      house_number: [data?.house_number || '', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.addressForm.valid) {
      const addressData: Address = this.addressForm.value;
      if(addressData.id === null && !this.data){
        delete addressData.id;
      }

      this.dialogRef.close(addressData);
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  get isValidForm(): boolean {
    return this.addressForm.valid;
  }
}
