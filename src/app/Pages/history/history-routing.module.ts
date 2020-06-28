import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistoryListComponent } from './history-list/history-list.component';
import { HistoryEditComponent } from './history-edit/history-edit.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: HistoryListComponent,
        data: {
          title: 'Lista',
        },
      },
      {
        path: 'create',
        component: HistoryEditComponent,
        // resolve: { client: ClientResolver },
        data: {
          title: 'Crear',
          readOnly: false,
          update: false,
        },
      },
      {
        path: 'edit/:id',
        component: HistoryEditComponent,
        // resolve: { client: ClientResolver },
        data: {
          title: 'Edit',
          readOnly: false,
          update: true,
        },
      },
      {
        path: 'ver/:id',
        component: HistoryEditComponent,
        // resolve: { client: ClientResolver },
        data: {
          title: 'Crear',
          readOnly: true,
          update: false,
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryRoutingModule { }
