import { Component, OnInit } from '@angular/core';
import { Medicine } from '../models/medicine.model';
import { MedicinesService } from '../services/medicines/medicines.service';

@Component({
  selector: 'app-medicines',
  standalone: false,
  templateUrl: './medicines.component.html',
  styleUrl: './medicines.component.css'
})
export class MedicinesComponent implements OnInit {
  medicines: Medicine[] = [];
  searchTerm: string = '';

  constructor(private medicinesService: MedicinesService) {}

  ngOnInit(): void {
    this.medicinesService.getAll().subscribe(data => {
      this.medicines = data;
    });
  }

  sellMedicine(id: number): void {
    this.medicinesService.recordSale(id, 1).subscribe(() => {
      this.medicines = this.medicines.map(m =>
        m.id === id ? { ...m, quantity: m.quantity - 1 } : m
      );
    });
  }

  isExpiringSoon(expiryDate: string): boolean {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffDays = (expiry.getTime() - today.getTime()) / (1000 * 3600 * 24);
    return diffDays < 30; // less than 30 days
  }

  filteredMedicines(): Medicine[] {
    if (!this.searchTerm) {
      return this.medicines;
    }
    return this.medicines.filter(m =>
      m.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }


}