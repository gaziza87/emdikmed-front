import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainComponent} from './main.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent, children: [
            {
                path: '',
                loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
                data: {breadcrumb: 'Рабочая область'}
            },
            {
                path: 'administrator',
                loadChildren: () => import('./administrator-ws/administrator-ws.module').then(m => m.AdministratorWsModule),
                data: {breadcrumb: 'Администрирование'}
            },
            {
                path: 'doctor',
                loadChildren: () => import('./doctor-ws/doctor-ws.module').then(m => m.DoctorWsModule),
                data: {breadcrumb: 'Кабинет врача'}
            },
            {
                path: 'manager',
                loadChildren: () => import('./manager-ws/manager-ws.module').then(m => m.ManagerWsModule),
                data: {breadcrumb: 'Контент менеджер'}
            },
            {
                path: 'registrant',
                loadChildren: () => import('./registrant-ws/registrant-ws.module').then(m => m.RegistrantWsModule),
                data: {breadcrumb: 'Регистратура'}
            },
            {
                path: 'dmp',
                loadChildren: () => import('./dmp/dmp.module').then(m => m.DmpModule),
                data: {breadcrumb: 'Управление заболеваниями'}
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule {

}
