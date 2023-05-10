import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { City, Patient } from './patient';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private baseUrl = 'https://vmo-interview-ujaspmx5nq-uc.a.run.app';

  constructor(private httpClient: HttpClient) { }

  addPatient(patient: Patient): Observable<Patient> {
    return this.httpClient.post<Patient>(`${this.baseUrl}/patient`, patient, {
      headers: {
        'Key': 'c2330fce0ce03c10571d888c2a8d7181'
      }
    });
  }

  getAllCities(): Observable<City[]> {
    const headers = new HttpHeaders({ 'Key': 'c2330fce0ce03c10571d888c2a8d7181' });
    return this.httpClient.get<City[]>(this.baseUrl, { headers });
  }


  getPatient(id: number): Observable<Patient> {
    return this.httpClient.get<Patient>(`${this.baseUrl}/patient/${id}`, {
      headers: {
        'Key': 'c2330fce0ce03c10571d888c2a8d7181'
      }
    });
  }

  getAllPatients(): Observable<Patient[]> {
    return this.httpClient.get<Patient[]>(`${this.baseUrl}/patient`, {
      headers: {
        'Key': 'c2330fce0ce03c10571d888c2a8d7181'
      }
    }).pipe(
      map((patients: Patient[]) => {
        return patients.map(patient => {
          const city: City = {
            city_id: patient.City!.city_id,
            name: patient.City!.name
          };
          patient.City = city;
          return patient;
        });
      })
    );
  }

  deletePatient(id: number): Observable<any> {
    const url = `${this.baseUrl}/patient/${id}`;
    const headers = new HttpHeaders({
      'Key': 'c2330fce0ce03c10571d888c2a8d7181'
    });
    return this.httpClient.delete(url, { headers, responseType: "text" });
  }

  updatePatient(patient: Patient): Observable<any> {
    const url = `${this.baseUrl}/patient/${patient.patient_id}`;
    const headers = new HttpHeaders({ 'Key': 'c2330fce0ce03c10571d888c2a8d7181' });
    return this.httpClient.put(url, patient, { headers });
  }
}
