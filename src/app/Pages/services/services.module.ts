import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { ServicesTabsComponent } from './services-tabs/services-tabs.component';
import { MaterialModule } from '../../material.module';
import { MedicListComponent } from './services-tabs/medic-list/medic-list.component';
import { PersonalListComponent } from './services-tabs/personal-list/personal-list.component';
import { PersonalEditComponent } from './services-tabs/personal-edit/personal-edit.component';
import { PersonResolver } from '../../core/resolvers/Personal.resolver';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ServicesTabsComponent, MedicListComponent, PersonalListComponent, PersonalEditComponent],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  providers: [
    PersonResolver,
  ]
})
export class ServicesModule { }
