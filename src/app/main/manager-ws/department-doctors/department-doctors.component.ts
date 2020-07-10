import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {FakeDbService} from './fake-db.service';

@Component({
    selector: 'app-department-doctors',
    templateUrl: './department-doctors.component.html',
    styleUrls: ['./department-doctors.component.scss']
})


export class DepartmentDoctorsComponent implements OnInit {

    displayedColumns: string[] = ['position', 'name', 'department', 'time', 'cabinet'];
    dataSource: any;

    constructor(private tablesService: FakeDbService) {
        // @ts-ignore
        this.dataSource = new MatTableDataSource<Element>(FakeDbService.getData());
    }

    ngOnInit(): void {
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }


}
