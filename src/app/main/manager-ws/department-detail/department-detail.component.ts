import { Component, OnInit } from '@angular/core';
import {FakeDbService} from '../department-doctors/fake-db.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.component.html',
  styleUrls: ['./department-detail.component.scss']
})
export class DepartmentDetailComponent implements OnInit {
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
