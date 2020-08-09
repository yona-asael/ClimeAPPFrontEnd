import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentRoutingModule } from './appointment-routing.module';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { AppointmentEditComponent } from './appointment-edit/appointment-edit.component';
import { MatDividerModule } from '@angular/material/divider';
import { MaterialModule } from 'app/material.module';
import {AppointService} from 'app/core/services/appoint.service';
import { CreateComponent } from './appointment-edit/create/create.component';
import {MedicsResolver} from 'app/core/resolvers/Medics.resolver';
import {PatientsResolver} from 'app/core/resolvers/Patients.resolver';
import {AppointResolver} from 'app/core/resolvers/Appoint.resolver';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [AppointmentListComponent, AppointmentEditComponent, CreateComponent],
  imports: [
    CommonModule,
    AppointmentRoutingModule,
    MatDividerModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [
    AppointService,
    MedicsResolver,
    PatientsResolver,
    AppointResolver,
  ]
})
export class AppointmentModule { }
