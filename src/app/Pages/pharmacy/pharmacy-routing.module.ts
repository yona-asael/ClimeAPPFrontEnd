import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';


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
        component: RecipeListComponent,
        data: {
          title: 'Lista',
        },
      },
      {
        path: 'create',
        component: RecipeEditComponent,
        // resolve: { client: ClientResolver },
        data: {
          title: 'Crear',
          readOnly: false,
          update: false,
        },
      },
      {
        path: 'edit/:id',
        component: RecipeEditComponent,
        // resolve: { client: ClientResolver },
        data: {
          title: 'Edit',
          readOnly: false,
          update: true,
        },
      },
      {
        path: 'ver/:id',
        component: RecipeEditComponent,
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
export class PharmacyRoutingModule { }
