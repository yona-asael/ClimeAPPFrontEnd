import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserSearchComponent } from './user-search/user-search.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { MatDividerModule } from '@angular/material/divider';
import {MaterialModule} from 'app/material.module';
import {PatientResolver} from 'app/core/resolvers/Patient.resolver';
import {PatientService} from 'app/core/services/patient.service';
import { UserListComponent } from './user-create/user-list/user-list.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';


@NgModule({
  declarations: [UserSearchComponent, UserCreateComponent, UserListComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    PatientResolver,
    PatientService
  ]
})
export class UserModule { }
