import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Patient } from '../patient';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  cities: any[] = [];
  patientForm!: FormGroup;

  constructor(
    private http: HttpClient,
    private patientService: PatientService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Obtener la lista de ciudades del servidor
    const headers = new HttpHeaders({ 'Key': 'c2330fce0ce03c10571d888c2a8d7181' });
    this.http.get('https://vmo-interview-ujaspmx5nq-uc.a.run.app/city', { headers }).subscribe((data: any) => {
      this.cities = data;
    });
    // Crear el formulario de paciente
    this.patientForm = this.fb.group({
      dni: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required],
      phone: [''],
      birthdate: ['', Validators.required],
      address: [''],
      city_id: ['', Validators.required]
    });
  }

  onSubmit(): void {

    // Crear el objeto paciente a partir de los valores del formulario
    const patient: Patient = {
      dni: this.patientForm.value.dni,
      first_name: this.patientForm.value.name,
      last_name: this.patientForm.value.surname,
      email: this.patientForm.value.email,
      phones: this.patientForm.value.phone,
      birthdate: this.patientForm.value.birthdate,
      address: this.patientForm.value.address,
      city_id: parseInt(this.patientForm.value.city_id),
      patient_id: 0
    };
    // Guardar el paciente en el servidor
    const headers = new HttpHeaders({ 'Key': 'c2330fce0ce03c10571d888c2a8d7181' });
    this.http.post('https://vmo-interview-ujaspmx5nq-uc.a.run.app/patient', patient, { headers, responseType: "text" }).subscribe({
      next: () => {
        console.log('Patient saved successfully');
        this.router.navigate(['/home']);
      },
      error: (error: any) => {
        console.log('Error while saving patient:', error);
      },
    });
  }
}

