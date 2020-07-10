import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {MatCardModule} from '@angular/material/card';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {PatientDetailComponent} from './patient-detail/patient-detail.component';
import {SharedModule} from '../../shared/shared.module';
import {LaboratoryComponent} from './patient-detail/laboratory/laboratory.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PatientAnalyticsComponent} from './patient-detail/patient-analytics/patient-analytics.component';
import {PatientWatchStatisticComponent} from './patient-detail/patient-watch-statistic/patient-watch-statistic.component';
import {VideoComponent} from './patient-detail/video/video.component';
import {MatVideoModule} from 'mat-video';
import {MatGridListModule} from '@angular/material/grid-list';
import {VideoAddEditComponent} from './patient-detail/video/video-add-edit/video-add-edit.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {DmpCategoryService} from '../dmp/services/dmpCategory.service';
import {DiagnosticService} from '../dmp/services/diagnostic.service';
import {DiseaseService} from '../dmp/services/disease.service';
import {LaboratoryService} from '../dmp/services/laboratory.service';
import {MedicationService} from '../dmp/services/medication.service';
import {ProtocolService} from '../dmp/services/protocol.service';
import {ProcedureAndInterventionsService} from '../dmp/services/procedure-and-interventions.service';
import {VisitContentService} from '../dmp/services/visitContent.service';
import {UserService} from '../../shared/services/administration/user.service';
import {PatientsListComponent} from './patients-list/patients-list.component';
import { VisitListComponent } from './patients-list/visit-list/visit-list.component';
import {VisitService} from '../dmp/services/visit.service';
import {PatientVideoContentService} from '../dmp/services/patient-video-content.service';




@NgModule({
    declarations: [
        DashboardComponent,
        PatientDetailComponent,
        LaboratoryComponent,
        PatientAnalyticsComponent,
        PatientWatchStatisticComponent,
        VideoComponent,
        VideoAddEditComponent,
        PatientsListComponent,
        VisitListComponent,
    ],


    imports: [
        CommonModule,
        DashboardRoutingModule,
        MatCardModule,
        FlexLayoutModule,
        MatIconModule,
        MatTabsModule,
        MatTableModule,
        SharedModule,
        MatStepperModule,
        MatInputModule,
        ReactiveFormsModule,
        FormsModule,
        MatVideoModule,
        MatVideoModule,
        MatGridListModule,
        NgxChartsModule,
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    providers: [
        DmpCategoryService,
        DiagnosticService,
        DiseaseService,
        LaboratoryService,
        MedicationService,
        ProtocolService,
        UserService,
        ProcedureAndInterventionsService,
        VisitContentService,
        DmpCategoryService, DiagnosticService, DiseaseService, LaboratoryService, MedicationService, ProtocolService,
        ProcedureAndInterventionsService,
        PatientVideoContentService,
        ProcedureAndInterventionsService, VisitService
    ]
})
export class DashboardModule {
}
