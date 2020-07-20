import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from './dialogs/delete-dialog/delete-dialog.component';
import { MaterialModule } from '../../material.module';



@NgModule({
  declarations: [
    DeleteDialogComponent
  ],
  entryComponents: [DeleteDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    DeleteDialogComponent
  ]
})
export class SharedModule { }
