
export interface Appointment {
  id?: number;
  address_id: number;
  details: string;
  requested_date: string;
}

export interface PendingAppointment {
  id:                  number;
  address_id:          number;
  appointment_type_id: number;
  client_id:           number;
  employee_id:         number;
  details:             string;
  requested_date:      Date;
  done_date:           Date;
}
