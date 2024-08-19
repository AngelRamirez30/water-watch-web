import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from '../../services/base-api.service';
import { Appointment, PendingAppointment } from '../../client/interfaces/appointment.interface';
import { Observable } from 'rxjs';
import { CompleteInstallation } from '../../employees/interfaces/complete-installation';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(
    private http: HttpClient,
    private baseApi: BaseApiService
  ) {}

  private baseUrl = `${this.baseApi.baseUrl}/client`;
  private baseUrlEmployee = `${this.baseApi.baseUrl}/employee`;

  getAllAppointments():Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.baseUrl}/get-pending-installation-appointment`);
  }

  getPendingAppointment():Observable<PendingAppointment> {
    return this.http.get<PendingAppointment>(`${this.baseUrl}/get-pending-installation-appointment`);
  }

  addAppointment(appointment: Appointment):Observable<{message: string, token: string}> {
    return this.http.post<{message: string, token: string}>(`${this.baseUrl}/create-installation-appointment`, appointment);
  }

  updateAppointment(appointment: Appointment):Observable<{message: string, token: string}> {
    return this.http.patch<{message: string, token: string}>(`${this.baseUrl}/update-installation-appointment`, appointment);
  }

  deleteAppointment(id: number):Observable<{message: string, token: string}> {
    return this.http.delete<{message: string, token: string}>(`${this.baseUrl}/delete-installation-appointment?id=${id}`);
  }

  getAllAppointmentsAssigned():Observable<PendingAppointment[]> {
    return this.http.get<PendingAppointment[]>(`${this.baseUrlEmployee}/get-all-appointments-assigned`);
  }

  getAllAppointmentsNotAssigned():Observable<PendingAppointment[]> {
    return this.http.get<PendingAppointment[]>(`${this.baseUrlEmployee}/get-all-appointments-not-assigned`);
  }

  acceptAppointment(id: number):Observable<{message: string, token: string}> {
    return this.http.patch<{message: string, token: string}>(`${this.baseUrlEmployee}/accept-appointment`, {id});
  }

  cancelAppointment(id: number):Observable<{message: string, token: string}> {
    return this.http.patch<{message: string, token: string}>(`${this.baseUrlEmployee}/cancel-appointment`, {id});
  }

  completeInstallationAppointment(body: CompleteInstallation):Observable<{message: string, token: string}> {
    return this.http.patch<{message: string, token: string}>(`${this.baseUrlEmployee}/complete-installation`, body);
  }
}
