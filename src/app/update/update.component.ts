import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PatientService } from '../patient.service';
import { Patient } from '../patient';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  private baseUrl = 'https://vmo-interview-ujaspmx5nq-uc.a.run.app';
  cities: any[] = [];
  patient: Patient = {
    patient_id: 0,
    dni: '',
    first_name: '',
    last_name: '',
    email: '',
    birthdate: '',
    address: '',
    phones: '',
    city_id: 0
  };


  constructor(
    private http: HttpClient,
    private patientService: PatientService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPatient();
    // Obtener la lista de ciudades del servidor
    const headers = new HttpHeaders({ 'Key': 'c2330fce0ce03c10571d888c2a8d7181' });
    this.http.get('https://vmo-interview-ujaspmx5nq-uc.a.run.app/city', { headers }).subscribe((data: any) => {
      this.cities = data;
    });
  }

  getPatient(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null && id !== undefined) {
      const idNumber = +id;
      this.patientService.getPatient(idNumber).subscribe(patient => this.patient = patient);
    }
  }


  onSubmit(): void {
    this.onSave(this.patient);
  }
  onSave(patient: Patient): void {
    const url = `${this.baseUrl}/patient/${patient.patient_id}`;
    const headers = new HttpHeaders({ 'Key': 'c2330fce0ce03c10571d888c2a8d7181' });
    this.http.put(url, patient, { headers, responseType: "text" }).subscribe({
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
