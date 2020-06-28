import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PharmacyRoutingModule } from './pharmacy-routing.module';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [RecipeListComponent, RecipeEditComponent],
  imports: [
    CommonModule,
    PharmacyRoutingModule,
    MatDividerModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
  ]
})
export class PharmacyModule { }
