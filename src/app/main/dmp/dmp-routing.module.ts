import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DmpComponent} from './dmp.component';


const routes: Routes = [
    {
        path: '',
        component: DmpComponent
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DmpRoutingModule {

}
