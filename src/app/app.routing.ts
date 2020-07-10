import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {PagesComponent} from './pages/pages.component';
import {BlankComponent} from './pages/blank/blank.component';
import {SearchComponent} from './pages/search/search.component';
import {NotFoundComponent} from './pages/errors/not-found/not-found.component';
import {ErrorComponent} from './pages/errors/error/error.component';
import {NoAuthGuard} from './core/guards/no-auth.guard';
import {AuthGuard} from './core/guards/auth.guard';

export const routes: Routes = [
    // {
    //     path: '',
    //     component: PagesComponent, children: [
    //         // {
    //         //     path: '',
    //         //     loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
    //         //     data: {breadcrumb: 'Dashboard'}
    //         // },
    //         // {path: 'users', loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule), data: {breadcrumb: 'Users'}},
    //         // {path: 'ui', loadChildren: () => import('./pages/ui/ui.module').then(m => m.UiModule), data: {breadcrumb: 'UI'}},
    //         // {
    //         //     path: 'form-controls',
    //         //     loadChildren: () => import('./pages/form-controls/form-controls.module').then(m => m.FormControlsModule),
    //         //     data: {breadcrumb: 'Form Controls'}
    //         // },
    //         // {
    //         //     path: 'tables',
    //         //     loadChildren: () => import('./pages/tables/tables.module').then(m => m.TablesModule),
    //         //     data: {breadcrumb: 'Tables'}
    //         // },
    //         // {
    //         //     path: 'icons',
    //         //     loadChildren: () => import('./pages/icons/icons.module').then(m => m.IconsModule),
    //         //     data: {breadcrumb: 'Material Icons'}
    //         // },
    //         // {
    //         //     path: 'drag-drop',
    //         //     loadChildren: () => import('./pages/drag-drop/drag-drop.module').then(m => m.DragDropModule),
    //         //     data: {breadcrumb: 'Drag & Drop'}
    //         // },
    //         // {
    //         //     path: 'schedule',
    //         //     loadChildren: () => import('./pages/schedule/schedule.module').then(m => m.ScheduleModule),
    //         //     data: {breadcrumb: 'Schedule'}
    //         // },
    //         // {
    //         //     path: 'mailbox',
    //         //     loadChildren: () => import('./pages/mailbox/mailbox.module').then(m => m.MailboxModule),
    //         //     data: {breadcrumb: 'Mailbox'}
    //         // },
    //         // {path: 'chat', loadChildren: () => import('./pages/chat/chat.module').then(m => m.ChatModule), data: {breadcrumb: 'Chat'}},
    //         // {path: 'maps', loadChildren: () => import('./pages/maps/maps.module').then(m => m.MapsModule), data: {breadcrumb: 'Maps'}},
    //         // {
    //         //     path: 'charts',
    //         //     loadChildren: () => import('./pages/charts/charts.module').then(m => m.ChartsModule),
    //         //     data: {breadcrumb: 'Charts'}
    //         // },
    //         // {
    //         //     path: 'dynamic-menu',
    //         //     loadChildren: () => import('./pages/dynamic-menu/dynamic-menu.module').then(m => m.DynamicMenuModule),
    //         //     data: {breadcrumb: 'Dynamic Menu'}
    //         // },
    //         // {
    //         //     path: 'profile',
    //         //     loadChildren: () => import ('./pages/profile/profile.module').then(m => m.ProfileModule),
    //         //     data: {breadcrumb: 'Profile'}
    //         // },
    //         // {path: 'blank', component: BlankComponent, data: {breadcrumb: 'Blank page'}},
    //         // {path: 'search', component: SearchComponent, data: {breadcrumb: 'Search'}}
    //     ]
    // },
    {
        path: '',
        loadChildren: () => import('./main/main.module').then(m => m.MainModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
        canActivate: [NoAuthGuard]
    }
    // {path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule)},
    // {path: 'error', component: ErrorComponent, data: {breadcrumb: 'Error'}},
    // {path: '**', component: NotFoundComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,  // <- comment this line for enable lazy load
    // useHash: true
});
