import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {AuthService} from './service/auth.service';
import {HttpClientModule} from '@angular/common/http';
import {FeedbackService} from '../utils/feedback-service';
import { RegistrationComponent } from './registration/registration.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {UserService} from '../shared/services/administration/user.service';
import {MatCardModule} from '@angular/material/card';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {TranslateModule} from '@ngx-translate/core';
import {TemplateService} from '../shared/services/administration/template.service';
import {MatRadioModule} from '@angular/material/radio';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {FlexLayoutModule} from '@angular/flex-layout';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {OrganizationService} from '../shared/services/administration/organization.service';


@NgModule({
    declarations: [LoginComponent, RegistrationComponent],
    imports: [
        CommonModule,
        AuthRoutingModule,
        HttpClientModule,
        FormsModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        SharedModule,
        MatCardModule,
        MatOptionModule,
        MatSelectModule,
        MatDatepickerModule,
        MatButtonModule,
        MatIconModule,
        NgxMatSelectSearchModule,
        TranslateModule,
        MatRadioModule,
        MatSnackBarModule,
        FlexLayoutModule,
        PerfectScrollbarModule,
    ],
    providers: [
        AuthService,
        FeedbackService,
        UserService,
        TemplateService,
        OrganizationService
    ]
})
export class AuthModule {
}
