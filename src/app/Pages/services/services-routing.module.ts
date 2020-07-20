import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicesTabsComponent } from './services-tabs/services-tabs.component';
import { PersonalEditComponent } from './services-tabs/personal-edit/personal-edit.component';
import { PersonResolver } from '../../core/resolvers/Personal.resolver';


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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
