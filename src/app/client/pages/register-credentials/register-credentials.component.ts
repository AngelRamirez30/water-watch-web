import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client.service';

@Component({
  templateUrl: './register-credentials.component.html',
  styleUrls: ['./register-credentials.component.css']
})
export class RegisterCredentialsComponent implements OnInit {

  credentialsForm!: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.credentialsForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  togglePassword(): void {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPassword(): void {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  passwordMatchValidator(formGroup: FormGroup): void {
    const password = formGroup.get('password')!.value;
    const confirmPassword = formGroup.get('confirmPassword')!.value;
    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')!.setErrors({ mismatch: true });
    } else {
      formGroup.get('confirmPassword')!.setErrors(null);
    }
  }

  register(): void {
    if (this.credentialsForm.valid) {
      const { username, password } = this.credentialsForm.value;
      this.clientService.registerData.username = username;
      this.clientService.registerData.password = password;
      this.clientService.register().subscribe();
    }
  }
}
