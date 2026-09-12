import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medicine } from '../../models/medicine.model';

@Injectable({
  providedIn: 'root'
})
export class MedicinesService {
  private apiUrl = 'https://backend-medicine-hbh0f2ana5dsf3bz.westus3-01.azurewebsites.net/api/medicines';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Medicine[]> {
    return this.http.get<Medicine[]>(this.apiUrl);
  }

  add(medicine: Medicine): Observable<Medicine> {
    return this.http.post<Medicine>(this.apiUrl, medicine);
  }

  recordSale(id: number, quantitySold: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/sale/${id}`, quantitySold);
  }
}
