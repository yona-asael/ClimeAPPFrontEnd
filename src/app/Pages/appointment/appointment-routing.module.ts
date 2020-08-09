import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { AppointmentEditComponent } from './appointment-edit/appointment-edit.component';
import { MedicsResolver } from '../../core/resolvers/Medics.resolver';
import { AppointResolver } from '../../core/resolvers/Appoint.resolver';
import { PatientsResolver } from '../../core/resolvers/Patients.resolver';
import { RecipeResolver } from '../../core/resolvers/Recipe.resolver';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'list',
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
        resolve: {
          medics: MedicsResolver,
          patients: PatientsResolver,
          appoint: AppointResolver,
        },
        data: {
          title: 'Crear',
          readOnly: false,
          update: false,
        },
      },
      {
        path: 'edit/:id',
        resolve: {
          medics: MedicsResolver,
          patients: PatientsResolver,
          appoint: AppointResolver,
        },
        component: AppointmentEditComponent,
        data: {
          title: 'Edit',
          readOnly: false,
          update: true,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentRoutingModule {}
