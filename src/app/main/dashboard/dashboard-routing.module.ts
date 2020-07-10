import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard.component';
import {PatientDetailComponent} from './patient-detail/patient-detail.component';
import {PatientAnalyticsComponent} from './patient-detail/patient-analytics/patient-analytics.component';
import {PatientWatchStatisticComponent} from './patient-detail/patient-watch-statistic/patient-watch-statistic.component';
import {VideoComponent} from './patient-detail/video/video.component';
import {VideoAddEditComponent} from './patient-detail/video/video-add-edit/video-add-edit.component';
import {PatientsListComponent} from './patients-list/patients-list.component';
import {VideoContent} from '../../shared/models/admin/video-content';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent
    },
    {
        path: 'patient-detail/:type/:id',
        component: PatientDetailComponent,
    },
    {
        path: 'patient-detail/cell/:cellId/:type/:id',
        component: PatientDetailComponent,
    },
    {
        path: 'patient-analytics',
        component: PatientAnalyticsComponent
    },
    {
        path: 'patient-watch-statistic',
        component: PatientWatchStatisticComponent
    },
    {
        path: 'video-add-edit',
        component: VideoAddEditComponent
    },
    {
        path: 'patient-video/:patientId',
        component: VideoComponent
    },
    {
        path: 'patient-list',
        component: PatientsListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {

}
