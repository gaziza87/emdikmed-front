import {Component, OnInit, ViewChild} from '@angular/core';


@Component({
    selector: 'app-manager-ws',
    templateUrl: './manager-ws.component.html',
    styleUrls: ['./manager-ws.component.scss']
})
export class ManagerWsComponent implements OnInit {

    departmentList = [
        {
            name: 'Онкология'
        },
        {
            name: 'Кордиология'
        },
        {
            name: 'Урология'
        },
        {
            name: 'Педиатрия'
        },
        {
            name: 'Терапия'
        },
        {
            name: 'Травматология'
        }];

    constructor() {

    }

    ngOnInit()
        :
        void {
    }

}
