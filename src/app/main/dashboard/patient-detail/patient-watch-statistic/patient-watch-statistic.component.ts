import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {FakeDbService} from '../fake-db.service';

// noinspection TsLint
@Component({
    selector: 'app-patient-watch-statistic',
    templateUrl: './patient-watch-statistic.component.html',
    styleUrls: ['./patient-watch-statistic.component.scss']
})
export class PatientWatchStatisticComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    public displayedColumns = ['position', 'name', 'weight', 'symbol'];
    public dataSource: any;
    minDate = new Date();

    constructor(private fakeDbService: FakeDbService, ) {
        this.dataSource = this.fakeDbService.getData();
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
    }

}
