import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {FakeDbService} from '../../dashboard/patient-detail/fake-db.service';
import {OrganizationDetailComponent} from '../organization/organization-detail/organization-detail.component';
import {Settings} from '../../../app.settings.model';
import {AppSettings} from '../../../app.settings';
import {MatDialog} from '@angular/material/dialog';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {ReportsDetailComponent} from './reports-detail/reports-detail.component';
import {Subject} from 'rxjs';
import {TemplateService} from '../../../shared/services/administration/template.service';
import {takeUntil} from 'rxjs/operators';
import {Template} from '../../../shared/models/admin/template';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

    @ViewChild(DatatableComponent) table: DatatableComponent;
    searchText = '';
    color = 'primary';
    checked = false;
    disabled = false;
    dialogRef: any;
    selected = [];
    public settings: Settings;
    loadingIndicator: any;
    private _unsubscribeAll: Subject<any>;

    templateList: Template[];

    constructor(private _templateService: TemplateService,
                public dialog: MatDialog) {
        this._unsubscribeAll = new Subject<any>();
        this.searchReport();
    }

    ngOnInit(): void {
    }
    searchReport(): void {
        const params = 'searchString=' + this.searchText;
        this._templateService.searchTemplateByParams(params).subscribe(response => {
                this.templateList = response.content;
                console.log(' search this.templateList', this.templateList);
            }, err => {
                console.error(err);
            });
    }

    templateControl(temp): void {
        const action = temp !== null ? 'edit' : 'new';
        this.dialogRef = this.dialog.open(ReportsDetailComponent, {
            data: {
                action,
                temp
            }
        });
        this.dialogRef.afterClosed().subscribe(response => {
            this.searchReport();
        });
    }


    Delete() {
        alert('Are you sure?');
    }
}
