import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: 'ais',
        loadChildren: () => import('./ais/ais.module').then(m => m.AisModule),
        data: {breadcrumb: 'АИС'}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RegistrantWsRoutingModule {

}
