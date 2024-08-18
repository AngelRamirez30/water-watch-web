import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';
import { LayoutClientPageComponent } from '../layout-client-page/layout-client-page.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CitaDialogComponent } from '../../components/cita-dialog/cita-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  public isLoggedIn!: boolean;
  public emailForm: FormGroup;

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
  }

  openCitaDialog(): void {
    this.dialog.open(CitaDialogComponent, {
      data: {}
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
}
