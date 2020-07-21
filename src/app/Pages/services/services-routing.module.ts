import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicesTabsComponent } from './services-tabs/services-tabs.component';
import { PersonalEditComponent } from './services-tabs/personal-edit/personal-edit.component';
import { PersonResolver } from '../../core/resolvers/Personal.resolver';
import { MedicEditComponent } from './services-tabs/medic-edit/medic-edit.component';
import { PersonsResolver } from '../../core/resolvers/Persons.resolver';
import { MedicResolver } from '../../core/resolvers/Medic.resolver';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'items'
      },
      {
        path: 'items',
        component: ServicesTabsComponent,
        data: {
          title: 'Lista',
        },
      },
      {
        path: 'personal/create',
        component: PersonalEditComponent,
        resolve: { person: PersonResolver },
        data: {
          title: 'Crear',
          readOnly: false,
          update: false,
        },
      },
      {
        path: 'personal/edit/:id',
        component: PersonalEditComponent,
        resolve: { person: PersonResolver },
        data: {
          title: 'Edit',
          readOnly: false,
          update: true,
        },
      },
      {
        path: 'personal/see/:id',
        component: PersonalEditComponent,
        resolve: { person: PersonResolver },
        data: {
          title: 'Crear',
          readOnly: true,
          update: false,
        },
      }
      ,
      {
        path: 'medic/create',
        component: MedicEditComponent,
        resolve: { medic: MedicResolver, persons: PersonsResolver },
        data: {
          title: 'Crear',
          readOnly: false,
          update: false,
        },
      },
      {
        path: 'medic/edit/:id',
        component: MedicEditComponent,
        resolve: { medic: MedicResolver, persons: PersonsResolver },
        data: {
          title: 'Edit',
          readOnly: false,
          update: true,
        },
      },
      {
        path: 'medic/see/:id',
        component: MedicEditComponent,
        resolve: { medic: MedicResolver, persons: PersonsResolver },
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
export class ServicesRoutingModule { }
