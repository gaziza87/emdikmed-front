import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OverlayContainer} from '@angular/cdk/overlay';
import {CustomOverlayContainer} from './theme/utils/custom-overlay-container';

import {AgmCoreModule} from '@agm/core';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    wheelPropagation: true,
    suppressScrollX: true
};
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {SharedModule} from './shared/shared.module';
import {PipesModule} from './theme/pipes/pipes.module';
import {routing} from './app.routing';

import {AppComponent} from './app.component';
import {PagesComponent} from './pages/pages.component';
import {BlankComponent} from './pages/blank/blank.component';
import {SearchComponent} from './pages/search/search.component';
import {NotFoundComponent} from './pages/errors/not-found/not-found.component';
import {ErrorComponent} from './pages/errors/error/error.component';
import {AppSettings} from './app.settings';

import {CoreModule} from './core/core.module';
import {TranslateModule} from '@ngx-translate/core';
import {MainModule} from './main/main.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        TranslateModule.forRoot(),
        ReactiveFormsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAir4tXhx3X-wcdZnhe8TLlo9J2m_AKx6w'
        }),
        PerfectScrollbarModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory
        }),
        SharedModule,
        CoreModule,
        CoreModule.forRoot(),
        PipesModule,
        routing,
        MainModule
    ],
    declarations: [
        AppComponent,
        PagesComponent,
        BlankComponent,
        SearchComponent,
        NotFoundComponent,
        ErrorComponent,
        // SidenavComponent,
        // VerticalMenuComponent,
        // HorizontalMenuComponent,
        // BreadcrumbComponent,
        // FlagsMenuComponent,
        // FullScreenComponent,
        // ApplicationsComponent,
        // MessagesComponent,
        // UserMenuComponent
    ],
    entryComponents: [
        // VerticalMenuComponent
    ],
    providers: [
        AppSettings,
        {provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG},
        {provide: OverlayContainer, useClass: CustomOverlayContainer}
    ],

    bootstrap: [AppComponent]
})
export class AppModule {
}
