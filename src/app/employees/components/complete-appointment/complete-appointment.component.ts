import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-complete-appointment',
  templateUrl: './complete-appointment.component.html',
  styleUrls: ['./complete-appointment.component.css']
})
export class CompleteAppointmentComponent implements OnInit {

  appointmentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CompleteAppointmentComponent>
  ) {
    this.appointmentForm = this.fb.group({
      serial: ['', Validators.required],
      name: ['', Validators.required],
      capacity: ['', Validators.required],
      diameter: ['', Validators.required],
      height: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.appointmentForm.valid) {
      // Handle form submission
      console.log(this.appointmentForm.value);
      this.dialogRef.close(this.appointmentForm.value);
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
