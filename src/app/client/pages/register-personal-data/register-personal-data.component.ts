import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client.service';

@Component({
  templateUrl: './register-personal-data.component.html',
  styleUrls: ['./register-personal-data.component.css']
})
export class RegisterPersonalDataComponent implements OnInit {

  personalDataForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private clientService: ClientService
  ) {
    this.personalDataForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^\\+?\\d+$')]]
    });
  }

  ngOnInit(): void {
    if (this.clientService.registerData.first_name) {
      const { first_name, last_name, phone_number } = this.clientService.registerData;
      const [apellidoPaterno, apellidoMaterno] = last_name.split(' ');
      this.personalDataForm.patchValue({
        nombre: first_name,
        apellidoPaterno,
        apellidoMaterno,
        telefono: phone_number
      });
    }
  }

  onSubmit(): void {
    if (this.personalDataForm.valid) {
      const { nombre, apellidoPaterno, apellidoMaterno, telefono } = this.personalDataForm.value;
      this.clientService.registerData.first_name = nombre;
      this.clientService.registerData.last_name = `${apellidoPaterno} ${apellidoMaterno}`;
      this.clientService.registerData.phone_number = telefono;
      this.router.navigate(['/register-address']);
    }
  }

  goBack(): void {
    if (this.personalDataForm.valid) {
      const { nombre, apellidoPaterno, apellidoMaterno, telefono } = this.personalDataForm.value;
      this.clientService.registerData.first_name = nombre;
      this.clientService.registerData.last_name = `${apellidoPaterno} ${apellidoMaterno}`;
      this.clientService.registerData.phone_number = telefono;
    }
    this.router.navigate(['/register-email']);
  }

  goNext(): void {
    if (this.personalDataForm.valid) {
      const { nombre, apellidoPaterno, apellidoMaterno, telefono } = this.personalDataForm.value;
      this.clientService.registerData.first_name = nombre;
      this.clientService.registerData.last_name = `${apellidoPaterno} ${apellidoMaterno}`;
      this.clientService.registerData.phone_number = telefono;
      this.router.navigate(['/register-address']);
    }else{
      this.clientService.showMessage('Por favor, llena todos los campos');
    }
  }
}
