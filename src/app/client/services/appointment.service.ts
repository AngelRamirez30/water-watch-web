import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from '../../services/base-api.service';
import { Appointment } from '../interfaces/appointment.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(
    private http: HttpClient,
    private baseApi: BaseApiService
  ) {}

  private baseUrl = `${this.baseApi.baseUrl}/client`;

  getAllAppointments():Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.baseUrl}/get-pending-installation-appointment`);
  }

  addAppointment(appointment: Appointment):Observable<Appointment> {
    return this.http.post<Appointment>(`${this.baseUrl}/create-installation-appointment`, appointment);
  }

  updateAppointment(appointment: Appointment):Observable<{message: string, token: string}> {
    return this.http.patch<{message: string, token: string}>(`${this.baseUrl}/update-installation-appointment`, appointment);
  }

  deleteAppointment(id: number):Observable<{message: string, token: string}> {
    return this.http.delete<{message: string, token: string}>(`${this.baseUrl}/delete-installation-appointment?id=${id}`);
  }
}
