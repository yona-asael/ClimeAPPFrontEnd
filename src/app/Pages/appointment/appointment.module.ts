import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentRoutingModule } from './appointment-routing.module';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { AppointmentEditComponent } from './appointment-edit/appointment-edit.component';
import { MatDividerModule } from '@angular/material/divider';


@NgModule({
  declarations: [AppointmentListComponent, AppointmentEditComponent],
  imports: [
    CommonModule,
    AppointmentRoutingModule,
    MatDividerModule
  ]
})
export class AppointmentModule { }
