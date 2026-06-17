import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicinesComponent } from './medicines/medicines.component';
import { AddMedicineComponent } from './add-medicine/add-medicine.component';

const routes: Routes = [
  { path: 'medicines', component: MedicinesComponent },
  { path: 'add-medicine', component: AddMedicineComponent },
  { path: '', redirectTo: '/medicines', pathMatch: 'full' },
  { path: '**', redirectTo: '/medicines' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
