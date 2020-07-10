import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AdministratorWsComponent} from './administrator-ws.component';
import {OrganizationComponent} from './organization/organization.component';
import {StaffComponent} from './staff/staff.component';
import {UsersComponent} from './users/users.component';
import {ReportsComponent} from './reports/reports.component';

const routes: Routes = [
    {
        path: '',
        component: AdministratorWsComponent
    },
    {
        path: 'organization',
        component: OrganizationComponent
    },
    {
        path: 'staff',
        component: StaffComponent
    },
    {
        path: 'users',
        component: UsersComponent
    },
    {
        path: 'reports',
        component: ReportsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdministratorWsRoutingModule {

}
