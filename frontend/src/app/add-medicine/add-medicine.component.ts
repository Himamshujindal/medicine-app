import { Component } from '@angular/core';
import { Medicine } from '../models/medicine.model';
import { MedicinesService } from '../services/medicines/medicines.service';

@Component({
  selector: 'app-add-medicine',
  standalone: false,
  templateUrl: './add-medicine.component.html',
  styleUrl: './add-medicine.component.css'
})
export class AddMedicineComponent {
  
  medicine: Medicine = {
    id: 0,
    name: '',
    expiryDate: '',
    quantity: 0,
    price: 0,
    brand: ''
  };

  constructor(private medicinesService: MedicinesService) {}

  onSubmit(): void {

    this.medicine.expiryDate = new Date(this.medicine.expiryDate).toISOString();

    this.medicinesService.add(this.medicine).subscribe(() => {
      alert('Medicine added successfully!');
    });
  }
}
