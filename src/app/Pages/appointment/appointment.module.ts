import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentRoutingModule } from './appointment-routing.module';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { AppointmentEditComponent } from './appointment-edit/appointment-edit.component';
import { MatDividerModule } from '@angular/material/divider';
import { MaterialModule } from '../../material.module';
import {AppointService} from '../../core/services/appoint.service';
import { CreateComponent } from './appointment-edit/create/create.component';
import {MedicsResolver} from '../../core/resolvers/Medics.resolver';
import {PatientsResolver} from '../../core/resolvers/Patients.resolver';
import {AppointResolver} from '../../core/resolvers/Appoint.resolver';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import { RecipeService } from '../../core/services/recipe.service';
import { RecipeResolver } from '../../core/resolvers/Recipe.resolver';


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
    RecipeService,
    MedicsResolver,
    PatientsResolver,
    AppointResolver,
    RecipeResolver,
  ]
})
export class AppointmentModule { }
