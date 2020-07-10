import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManagerWsComponent} from './manager-ws.component';
import {ManagerWsRoutingModule} from './manager-ws-routing.module';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { DepartmentDoctorsComponent } from './department-doctors/department-doctors.component';
import {SharedModule} from '../../shared/shared.module';
import {FakeDbService} from './department-doctors/fake-db.service';
import { DepartmentDetailComponent } from './department-detail/department-detail.component';
import {VideoComponent} from './video/video.component';
import {VideoAddEditComponent} from './video/video-add-edit/video-add-edit.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {MatVideoModule} from 'mat-video';
import {TranslateModule} from '@ngx-translate/core';
import {VideoContentService} from '../../shared/services/administration/video-content.service';
import {VgCoreModule} from 'videogular2/compiled/src/core/core';
import {VgControlsModule} from 'videogular2/compiled/src/controls/controls';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {FlexLayoutModule} from '@angular/flex-layout';
import {DiseaseService} from '../dmp/services/disease.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
    declarations: [ManagerWsComponent, DepartmentDoctorsComponent, DepartmentDetailComponent, VideoComponent, VideoAddEditComponent],
    imports: [
        CommonModule,
        ManagerWsRoutingModule,
        MatTabsModule,
        FlexLayoutModule,
        MatTableModule,
        MatCardModule,
        SharedModule,
        MatGridListModule,
        HttpClientModule,
        FormsModule,
        MatVideoModule,
        ReactiveFormsModule,
        TranslateModule,
        VgCoreModule,
        VgControlsModule,
        MatFormFieldModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        MatDatepickerModule,
        MatButtonModule,
        MatSnackBarModule,
        MatIconModule,
    ],
    providers: [FakeDbService, VideoContentService, DiseaseService],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
})
export class ManagerWsModule {


}
