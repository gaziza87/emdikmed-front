import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DoctorWsComponent} from './doctor-ws.component';

const routes: Routes = [
    {
        path: '',
        component: DoctorWsComponent
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DoctorWsRoutingModule {

}
