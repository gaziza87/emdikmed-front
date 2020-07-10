import {Component, OnInit} from '@angular/core';
import {AppSettings} from '../../app.settings';
import {MatDialog} from '@angular/material/dialog';
import {DmpsDetailComponent} from './dmps-detail/dmps-detail.component';

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, name: 'Махмед Алихан Абдималикович', weight: 1, symbol: 'H'},
    {position: 2, name: 'Махмед Алихан Абдималикович', weight: 1, symbol: 'H'},
    {position: 3, name: 'Махмед Алихан Абдималикович', weight: 1, symbol: 'H'},
    {position: 4, name: 'Махмед Алихан Абдималикович', weight: 1, symbol: 'H'},
    {position: 5, name: 'Махмед Алихан Абдималикович', weight: 1, symbol: 'H'},
    {position: 6, name: 'Махмед Алихан Абдималикович', weight: 1, symbol: 'H'},
    {position: 7, name: 'Махмед Алихан Абдималикович', weight: 1, symbol: 'H'},
    {position: 8, name: 'Махмед Алихан Абдималикович', weight: 1, symbol: 'H'},
    {position: 9, name: 'Махмед Алихан Абдималикович', weight: 1, symbol: 'H'},
    {position: 10, name: 'Махмед Алихан Абдималикович', weight: 1, symbol: 'H'},

];


@Component({
    selector: 'app-dmp',
    templateUrl: './dmp.component.html',
    styleUrls: ['./dmp.component.scss']
})
export class DmpComponent implements OnInit {
    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    dataSource = ELEMENT_DATA;

    public searchText: string;
    color = 'primary';
    checked = false;
    disabled = false;

    editing = {};
    rows = [
        {
            name: 'test_laboratoty',
            extension: 'test_laboratoty',
            description: 'test_laboratoty',
            actions: '',
        }

    ];
    temp = [];
    selected = [];
    // loadingIndicator = true;
    reorderable = true;
    columns = [
        {prop: 'name'},
        {name: 'Extension'},
        {name: 'Description'},
        {name: 'Actions'},
    ];

    constructor(public appSettings: AppSettings,
                public dialog: MatDialog) {
    }

    ngOnInit(): void {
    }

    Edit() {
        const dialogRef = this.dialog.open(DmpsDetailComponent, {});
    }

    Delete() {
        alert('Are you sure?');
    }
}
