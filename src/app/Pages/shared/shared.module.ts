import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from './dialogs/delete-dialog/delete-dialog.component';
import { MaterialModule } from '../../material.module';
import {MatDialogModule} from '@angular/material/dialog';
import { RecipeDialogComponent } from './dialogs/recipe-dialog/recipe-dialog.component';



@NgModule({
  declarations: [
    DeleteDialogComponent,
    RecipeDialogComponent
  ],
  entryComponents: [DeleteDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    MatDialogModule
  ],
  exports: [
    DeleteDialogComponent
  ]
})
export class SharedModule { }
