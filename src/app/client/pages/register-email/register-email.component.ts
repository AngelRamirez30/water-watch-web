import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client.service';

@Component({
  templateUrl: './register-email.component.html',
  styleUrls: ['./register-email.component.css']
})
export class RegisterEmailComponent implements OnInit {

  emailForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private route: Router
  ) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.clientService.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.route.navigateByUrl('/home');
      }
    });
    console.log(this.clientService.registerData.email);
    if (this.clientService.registerData.email) {
      this.emailForm.patchValue({
        email: this.clientService.registerData.email
      });
    }
  }

  openLoginDialog(): void {
    this.clientService.openLoginDialog();
  }

  redirectToPersonalData() {
    if (this.emailForm.valid) {
      this.clientService.registerData.email = this.emailForm.value.email;
      this.route.navigate(['/register-personal-data']);
    }
  }
}
