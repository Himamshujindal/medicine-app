import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MedicinesComponent } from './medicines/medicines.component';
import { AppRoutingModule } from './app-routing.module';
import { AddMedicineComponent } from './add-medicine/add-medicine.component';

@NgModule({
  declarations: [
    AppComponent,
    MedicinesComponent,
    AddMedicineComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
