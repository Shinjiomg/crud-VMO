export interface Patient {
  patient_id: number;
  dni: string;
  first_name: string;
  last_name: string;
  email: string;
  phones: string;
  birthdate: string;
  address: string;
  city_id: number;
  City?: City;
}

export interface City {
  city_id: number;
  name: string;
}
