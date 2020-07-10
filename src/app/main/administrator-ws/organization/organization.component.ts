import {Component, OnInit, ViewChild} from '@angular/core';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Settings} from '../../../app.settings.model';
import {AppSettings} from '../../../app.settings';
import {MatDialog} from '@angular/material/dialog';
import {OrganizationDetailComponent} from './organization-detail/organization-detail.component';
import {OrganizationService} from '../../../shared/services/administration/organization.service';
import {Organization} from '../../../shared/models/admin/organization';

@Component({
    selector: 'app-organization',
    templateUrl: './organization.component.html',
    styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {
    @ViewChild(DatatableComponent) table: DatatableComponent;

    color = 'primary';
    checked = false;
    disabled = false;

    orgs: Organization[];

    editing = {};
    temp = [];
    selected = [];
    public settings: Settings;

    constructor(public appSettings: AppSettings,
                public dialog: MatDialog,
                public _orgService: OrganizationService,) {
        this.settings = this.appSettings.settings;
    }

    fetch(data) {
    }
    getAllOrganization() {
        this._orgService.getAllOrganization().subscribe(response => {
            this.orgs = response;
            console.log(this.orgs);
        }, err => {
            console.error(err);
        });
    }

    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.temp.filter(function(d) {
            return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.orgs = temp;
        this.table.offset = 0;
    }

    updateValue(event, cell, rowIndex) {
        this.editing[rowIndex + '-' + cell] = false;
        this.orgs[rowIndex][cell] = event.target.value;
        this.orgs = [...this.orgs];
    }

    onSelect({selected}) {
        console.log('Select Event', selected, this.selected);
        this.selected.splice(0, this.selected.length);
        this.selected.push(...selected);
    }

    onActivate(event) {
        console.log('Activate Event', event);
    }

    ngOnInit(): void {
        this.getAllOrganization();
    }

    orgControl(org) {
        console.log(org);
        const action = org !== null ? 'edit' : 'new';
        const dialogRef = this.dialog.open(OrganizationDetailComponent, {
            data: {
                org,
                action
            }
        });

        dialogRef.afterClosed().subscribe(response => {
            this.getAllOrganization();
        });
    }

    Delete() {
        alert('Are you sure?');
    }
}
