import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainRoutingModule} from './main-routing.module';
import {MainComponent} from './main.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MenuService} from '../theme/components/menu/menu.service';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {SharedModule} from '../shared/shared.module';
import {PipesModule} from '../theme/pipes/pipes.module';
import {SidenavComponent} from '../theme/components/sidenav/sidenav.component';
import {FlagsMenuComponent} from '../theme/components/flags-menu/flags-menu.component';
import {FullScreenComponent} from '../theme/components/fullscreen/fullscreen.component';
import {ApplicationsComponent} from '../theme/components/applications/applications.component';
import {MessagesComponent} from '../theme/components/messages/messages.component';
import {UserMenuComponent} from '../theme/components/user-menu/user-menu.component';
import {HorizontalMenuComponent} from '../theme/components/menu/horizontal-menu/horizontal-menu.component';
import {BreadcrumbComponent} from '../theme/components/breadcrumb/breadcrumb.component';
import {VerticalMenuComponent} from '../theme/components/menu/vertical-menu/vertical-menu.component';
import {MatCardModule} from '@angular/material/card';
import {FlexLayoutModule} from '@angular/flex-layout';



@NgModule({
    declarations: [
        MainComponent,
        SidenavComponent,
        FlagsMenuComponent,
        FullScreenComponent,
        ApplicationsComponent,
        MessagesComponent,
        UserMenuComponent,
        HorizontalMenuComponent,
        BreadcrumbComponent,
        VerticalMenuComponent,
    ],
    imports: [
        CommonModule,
        MainRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        PerfectScrollbarModule,
        SharedModule,
        PipesModule,
        MatCardModule,
        FlexLayoutModule,
    ],
    providers: [
        MenuService
    ],
    exports: [
        SidenavComponent,
        FlagsMenuComponent,
        FullScreenComponent,
        ApplicationsComponent,
        MessagesComponent,
        UserMenuComponent,
        HorizontalMenuComponent,
        BreadcrumbComponent
    ],
    entryComponents: [
        VerticalMenuComponent
    ]
})
export class MainModule {
}
