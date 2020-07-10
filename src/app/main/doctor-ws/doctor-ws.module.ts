import {CommonModule} from '@angular/common';
import {DoctorWsComponent} from './doctor-ws.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {NgModule} from '@angular/core';
import {DoctorWsRoutingModule} from './doctor-ws-routing.module';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';


@NgModule({
    declarations: [DoctorWsComponent,],
    imports: [
        CommonModule,
        DoctorWsRoutingModule,
        NgxDatatableModule,
        SharedModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PerfectScrollbarModule,
        MatTableModule,
        FormsModule,
        MatCardModule
    ]
})
export class DoctorWsModule {
}
