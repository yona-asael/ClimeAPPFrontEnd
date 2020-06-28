import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryRoutingModule } from './history-routing.module';
import { HistoryListComponent } from './history-list/history-list.component';
import { HistoryEditComponent } from './history-edit/history-edit.component';
import {MatDividerModule} from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [HistoryListComponent, HistoryEditComponent],
  imports: [
    CommonModule,
    HistoryRoutingModule,
    MatDividerModule,
    MatInputModule
  ]
})
export class HistoryModule { }
