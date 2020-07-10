import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'app-dmps-detail',
    templateUrl: './dmps-detail.component.html',
    styleUrls: ['./dmps-detail.component.scss']
})
export class DmpsDetailComponent implements OnInit {
    public searchText: string;
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

    constructor(public dialogRef: MatDialogRef<DmpsDetailComponent>) {
    }

    ngOnInit(): void {
    }

    close(): void {
        this.dialogRef.close();
    }

}
