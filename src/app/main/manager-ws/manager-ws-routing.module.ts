import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ManagerWsComponent} from './manager-ws.component';
import {DepartmentDoctorsComponent} from './department-doctors/department-doctors.component';
import {DepartmentDetailComponent} from './department-detail/department-detail.component';
import {VideoComponent} from './video/video.component';


const routes: Routes = [
    {
        path: '',
        component: ManagerWsComponent
    },
    {
        path: 'doctors',
        component: DepartmentDoctorsComponent
    },
    {
        path: 'department-detail',
        component: DepartmentDetailComponent
    },
    {
        path: 'video',
        component: VideoComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagerWsRoutingModule {

}
