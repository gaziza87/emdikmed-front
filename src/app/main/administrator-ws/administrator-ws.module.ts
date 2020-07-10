import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdministratorWsComponent} from './administrator-ws.component';
import {AdministratorWsRoutingModule} from './administrator-ws-routing.module';
import {OrganizationComponent} from './organization/organization.component';
import {SharedModule} from '../../shared/shared.module';
import {OrganizationDetailComponent} from './organization/organization-detail/organization-detail.component';
import {StaffComponent} from './staff/staff.component';
import {UsersComponent} from './users/users.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {UserDetailComponent} from './users/user-detail/user-detail.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {ReportsComponent} from './reports/reports.component';
import {ReportsDetailComponent} from './reports/reports-detail/reports-detail.component';
import {StaffDetailComponent} from './staff/staff-detail/staff-detail.component';
import {UserService} from '../../shared/services/administration/user.service';
import {OrganizationService} from '../../shared/services/administration/organization.service';
import {HttpClientModule} from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatRadioModule} from '@angular/material/radio';
import {LangUtilComponent} from '../../shared/lang-util/lang-util.component';
import {QuillModule} from 'ngx-quill';
import {TranslateModule} from '@ngx-translate/core';
import {NgxPaginationModule} from 'ngx-pagination';
import {TemplateService} from '../../shared/services/administration/template.service';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';


@NgModule({
    declarations: [AdministratorWsComponent, OrganizationComponent, StaffComponent, UsersComponent,
        OrganizationDetailComponent, UserDetailComponent, StaffDetailComponent, ReportsComponent,
        ReportsDetailComponent, LangUtilComponent],
    imports: [
        CommonModule,
        AdministratorWsRoutingModule,
        NgxDatatableModule,
        HttpClientModule,
        MatFormFieldModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        MatDatepickerModule,
        MatRadioModule,
        MatButtonModule,
        MatIconModule,
        SharedModule,
        CommonModule,
        MatSnackBarModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        PerfectScrollbarModule,
        QuillModule,
        TranslateModule,
        NgxPaginationModule,
        NgxMatSelectSearchModule
    ],
    providers: [
        UserService,
        OrganizationService,
        TemplateService
    ]
})
export class AdministratorWsModule {
}
