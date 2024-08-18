import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client.service';

@Component({
  templateUrl: './register-address.component.html',
  styleUrls: ['./register-address.component.css']
})
export class RegisterAddressComponent implements OnInit {

  addressForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.addressForm = this.fb.group({
      estado: ['', Validators.required],
      municipio: ['', Validators.required],
      calle: ['', Validators.required],
      colonia: ['', Validators.required],
      codigoPostal: ['', Validators.required],
      numeroCasa: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.addressForm.valid) {
      const { estado, municipio, calle, colonia, codigoPostal, numeroCasa } = this.addressForm.value;
      this.clientService.registerData.state = estado;
      this.clientService.registerData.city = municipio;
      this.clientService.registerData.street = calle;
      this.clientService.registerData.neighborhood = colonia;
      this.clientService.registerData.postal_code = codigoPostal;
      this.clientService.registerData.house_number = numeroCasa;
      this.router.navigate(['/register-credentials']);
    }else{
      this.clientService.showMessage('Por favor, llena todos los campos');
    }
  }
}
