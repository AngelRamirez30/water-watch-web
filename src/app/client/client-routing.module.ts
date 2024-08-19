import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LayoutClientPageComponent } from './pages/layout-client-page/layout-client-page.component';
import { RegisterEmailComponent } from './pages/register-email/register-email.component';
import { RegisterPersonalDataComponent } from './pages/register-personal-data/register-personal-data.component';
import { RegisterAddressComponent } from './pages/register-address/register-address.component';
import { RegisterCredentialsComponent } from './pages/register-credentials/register-credentials.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

const routes: Routes = [
  {
    path: '',
    component: LayoutClientPageComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'register-email', component: RegisterEmailComponent },
      { path: 'register-personal-data', component: RegisterPersonalDataComponent },
      { path: 'register-address', component: RegisterAddressComponent },
      { path: 'register-credentials', component: RegisterCredentialsComponent },
      { path: '**', redirectTo: 'home', pathMatch: 'full' },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes), NgxMaterialTimepickerModule],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
