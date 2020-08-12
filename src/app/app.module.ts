import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './default/user-profile/user-profile.component';
import { TableListComponent } from './default/table-list/table-list.component';
import { TypographyComponent } from './default/typography/typography.component';
import { NotificationsComponent } from './default/notifications/notifications.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { PersonService } from './core/services/person.service';
import { HttpClientModule } from '@angular/common/http';
import { MedicService } from './core/services/medic.service';
import { LoginComponent } from './Pages/login/login.component';
import {AuthService} from './core/services/auth.service';
import {TokenStorage} from './core/services/token-storage.service';
import {MaterialModule} from './material.module';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MaterialModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,

  ],
  providers: [
    PersonService,
    MedicService,
    AuthService,
    TokenStorage
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
