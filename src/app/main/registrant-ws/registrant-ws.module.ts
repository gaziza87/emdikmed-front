import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegistrantWsRoutingModule} from './registrant-ws-routing.module';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {UserService} from '../../shared/services/administration/user.service';
import {HttpClientModule} from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        FlexLayoutModule,
        RegistrantWsRoutingModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        MatDatepickerModule,
        MatButtonModule,
        MatIconModule,
    ],
    providers: [UserService]
})
export class RegistrantWsModule {
}
