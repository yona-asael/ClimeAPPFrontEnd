import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { AppointmentEditComponent } from './appointment-edit/appointment-edit.component';


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
        component: AppointmentListComponent,
        data: {
          title: 'Lista',
        },
      },
      {
        path: 'create',
        component: AppointmentEditComponent,
        // resolve: { client: ClientResolver },
        data: {
          title: 'Crear',
          readOnly: false,
          update: false,
        },
      },
      {
        path: 'edit/:id',
        component: AppointmentEditComponent,
        // resolve: { client: ClientResolver },
        data: {
          title: 'Edit',
          readOnly: false,
          update: true,
        },
      },
      {
        path: 'ver/:id',
        component: AppointmentEditComponent,
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
export class AppointmentRoutingModule { }
