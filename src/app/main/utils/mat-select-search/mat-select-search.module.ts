import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectSearchComponent } from './mat-select-search.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule
    ],
    exports: [
        MatButtonModule,
        MatInputModule,
        MatSelectSearchComponent
    ],
    declarations: [MatSelectSearchComponent],
})
export class MatSelectSearchModule { }
