import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import { Patient } from '../patient';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  showAge: Boolean = true;
  patients: Patient[] = [];

  constructor(public patientService: PatientService, private http: HttpClient, private router: Router) { }

  getAge(birthdate: string): number {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }


  ngOnInit() {
    const showAgeValue = localStorage.getItem('showAge');
    if (showAgeValue !== null) {
      this.showAge = showAgeValue === 'true';
    }
    this.getAllPatients();

  }

  getAllPatients() {
    this.patientService.getAllPatients().subscribe(
      (patients: Patient[]) => {
        this.patients = patients;
      },
      error => {
        console.log(error);
      }
    );
  }

  toggleAgeColumn() {
    this.showAge = !this.showAge;
    localStorage.setItem('showAge', this.showAge.toString());
  }

  onDelete(id: number) {
    if (confirm('¿Quieres borrar a este paciente?')) {
      this.patientService.deletePatient(id).subscribe(
        response => {
          console.log(response);
          this.getAllPatients();
          this.router.navigate(['/home']);
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}

