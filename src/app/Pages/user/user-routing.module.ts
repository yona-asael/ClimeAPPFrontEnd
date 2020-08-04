import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserSearchComponent } from './user-search/user-search.component';
import { UserCreateComponent } from './user-create/user-create.component';
import {PatientResolver} from 'app/core/resolvers/Patient.resolver';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'search'
      },
      {
        path: 'search',
        component: UserSearchComponent,
        data: {
        },
      },
      {
        path: 'create',
        component: UserCreateComponent,
        resolve: { patient: PatientResolver },
        data: {
          title: 'Crear',
          readOnly: false,
          update: false,
        },
      },
      {
        path: 'edit/:id',
        component: UserCreateComponent,
        resolve: { patient: PatientResolver },
        data: {
          title: 'Edit',
          readOnly: false,
          update: true,
        },
      },
      {
        path: 'see/:id',
        component: UserCreateComponent,
        resolve: { patient: PatientResolver },
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
export class UserRoutingModule { }
