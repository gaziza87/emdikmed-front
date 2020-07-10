import {CommonModule} from '@angular/common';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {NgModule} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {DmpComponent} from './dmp.component';
import {DmpRoutingModule} from './dmp-routing.module';
import {DmpsDetailComponent} from './dmps-detail/dmps-detail.component';
import {DiseasesComponent} from './components/diseases/diseases.component';
import {LaboratoryComponent} from './components/laboratory/laboratory.component';
import {ServicesComponent} from './components/services/services.component';
import {DiagnosticsComponent} from './components/diagnostics/diagnostics.component';
import {ProceduresAndInterventionsComponent} from './components/procedures-and-interventions/procedures-and-interventions.component';
import {CategoriesComponent} from './components/categories/categories.component';
import {ProtocolsComponent} from './components/protocols/protocols.component';
import {MedicationsComponent} from './components/medications/medications.component';
import {CategoryDetailsComponent} from './components/categories/category-details/category-details.component';
import {DmpCategoryService} from './services/dmpCategory.service';
import {DeleteConfirmationComponent} from './utils/delete-confirmation/delete-confirmation.component';
import {DiagnosticsDetailsComponent} from './components/diagnostics/diagnostics-details/diagnostics-details.component';
import {DiagnosticService} from './services/diagnostic.service';
import {DiseaseDetailsComponent} from './components/diseases/disease-details/disease-details.component';
import {DiseaseService} from './services/disease.service';
import {LaboratoryDetailsComponent} from './components/laboratory/laboratory-details/laboratory-details.component';
import {LaboratoryService} from './services/laboratory.service';
import {MedicationsDetailsComponent} from './components/medications/medications-details/medications-details.component';
import {MedicationService} from './services/medication.service';
import {ProtocolDetailsComponent} from './components/protocols/protocol-details/protocol-details.component';
import {ProtocolService} from './services/protocol.service';
import {ProcedureAndInterventionsDetailsComponent} from './components/procedures-and-interventions/procedure-and-interventions-details/procedure-and-interventions-details.component';
import {ProcedureAndInterventionsService} from './services/procedure-and-interventions.service';
import {ServicesService} from './services/services.service';
import { ServicesDetailsComponent } from './components/services/services-details/services-details.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import {VisitService} from './services/visit.service';
import {VisitContentService} from './services/visitContent.service';
import {MatPaginatorModule} from "@angular/material/paginator";



@NgModule({
    declarations: [DmpComponent,
        DmpsDetailComponent,
        DiseasesComponent,
        LaboratoryComponent,
        ServicesComponent,
        DiagnosticsComponent,
        ProceduresAndInterventionsComponent,
        CategoriesComponent,
        ProtocolsComponent,
        MedicationsComponent,
        CategoryDetailsComponent,
        DeleteConfirmationComponent,
        DiagnosticsDetailsComponent,
        DiseaseDetailsComponent,
        LaboratoryDetailsComponent,
        MedicationsDetailsComponent,
        ProtocolDetailsComponent,
        ProcedureAndInterventionsDetailsComponent,
        ServicesDetailsComponent
    ],
    imports: [
        CommonModule,
        DmpRoutingModule,
        NgxDatatableModule,
        SharedModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PerfectScrollbarModule,
        MatTableModule,
        FormsModule,
        MatPaginatorModule,
        MatCardModule,
        MatDialogModule,
        MatToolbarModule,
    ],
    providers: [DmpCategoryService, DiagnosticService, DiseaseService, LaboratoryService, MedicationService, ProtocolService,
        ProcedureAndInterventionsService, ServicesService, VisitService, VisitContentService
    ]

})
export class DmpModule {
}
