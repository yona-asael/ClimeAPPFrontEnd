import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../default/user-profile/user-profile.component';
import { TableListComponent } from '../../default/table-list/table-list.component';
import { TypographyComponent } from '../../default/typography/typography.component';
import { NotificationsComponent } from '../../default/notifications/notifications.component';

export const AdminLayoutRoutes: Routes = [
    {
        path: 'user',
        loadChildren: () => import('../../Pages/user/user.module').then(m => m.UserModule),
    },
    {
        path: 'appointment',
        loadChildren: () => import('../../Pages/appointment/appointment.module').then(m => m.AppointmentModule),
    },
    {
        path: 'pharmacy',
        loadChildren: () => import('../../Pages/pharmacy/pharmacy.module').then(m => m.PharmacyModule),
    },
    {
        path: 'services',
        loadChildren: () => import('../../Pages/services/services.module').then(m => m.ServicesModule),
    },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'table-list', component: TableListComponent },
    { path: 'typography', component: TypographyComponent },
    { path: 'notifications', component: NotificationsComponent },
];
