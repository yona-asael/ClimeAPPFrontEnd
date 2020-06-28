import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserSearchComponent } from './user-search/user-search.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { MatDividerModule } from '@angular/material/divider';


@NgModule({
  declarations: [UserSearchComponent, UserCreateComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatDividerModule
  ]
})
export class UserModule { }
