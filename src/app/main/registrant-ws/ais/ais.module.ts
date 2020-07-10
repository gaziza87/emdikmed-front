import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AisComponent } from './ais.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AisRoutingModule} from './ais-routing.module';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatStepperModule} from '@angular/material/stepper';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenu, MatMenuModule} from '@angular/material/menu';
import {MatSelectSearchModule} from '../../utils/mat-select-search/mat-select-search.module';
import {CalendarModule} from 'angular-calendar';
import {MatChipsModule} from '@angular/material/chips';



@NgModule({
  declarations: [AisComponent],
  imports: [
    CommonModule,
    AisRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatGridListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    MatMenuModule,
    MatChipsModule,
    MatSelectSearchModule,
    CalendarModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AisModule { }
