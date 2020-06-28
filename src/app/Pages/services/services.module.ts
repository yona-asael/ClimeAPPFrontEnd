import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { ServicesTabsComponent } from './services-tabs/services-tabs.component';
import { MaterialModule } from '../../material.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MedicListComponent } from './services-tabs/medic-list/medic-list.component';
import { ServicesListComponent } from './services-tabs/services-list/services-list.component';
import { MatDividerModule } from '@angular/material/divider';


@NgModule({
  declarations: [ServicesTabsComponent, MedicListComponent, ServicesListComponent],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    MaterialModule,
    MatTabsModule,
    MatDividerModule,
  ]
})
export class ServicesModule { }
