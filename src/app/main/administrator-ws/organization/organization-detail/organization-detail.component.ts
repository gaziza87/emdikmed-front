import {Component, Inject, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {OrganizationService} from '../../../../shared/services/administration/organization.service';
import {Organization} from '../../../../shared/models/admin/organization';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'app-organization-detail',
    templateUrl: './organization-detail.component.html',
    styleUrls: ['./organization-detail.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class OrganizationDetailComponent implements OnInit, OnDestroy {

    org: Organization;
    action: string;
    dialogTitle: string;
    private _unsubscribeAll: Subject<any>;
    color = 'primary';
    checked = false;
    disabled = false;
    formGroup: FormGroup;

    constructor(public dialogRef: MatDialogRef<OrganizationDetailComponent>,
                @Inject(MAT_DIALOG_DATA) public _data: any,
                public _orgService: OrganizationService) {
        this.action = this._data.action;

        if (this.action === 'edit') {
            this.org = this._data.org;
            this.dialogTitle = 'Редактирования ';
        } else {
            this.dialogTitle = 'Добавления Organization';
            this.org = new Organization();
        }
        this._unsubscribeAll = new Subject<any>();
    }
    catchFieldValue(event, fieldName, index?): void {
        this.org.name = event;

        switch (fieldName) {
            case 'description':
                if ((event.kz !== null && event.kz !== '') &&
                    (event.en !== null && event.en !== '') &&
                    (event.ru !== null && event.ru !== '')) {

                    this.formGroup.patchValue({description: event});
                } else {
                    this.formGroup.patchValue({description: null});
                }
                break;
            case 'name':

                if ((event.kz !== null && event.kz !== '') &&
                    (event.en !== null && event.en !== '') &&
                    (event.ru !== null && event.ru !== '')) {

                    this.formGroup.patchValue({name: event});
                } else {
                    this.formGroup.patchValue({name: null});
                }
                break;
        }
    }


    ngOnInit(): void {
    }

    save() {
        this._orgService.saveOrganization(this.org).pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
            console.log(this.org);
            this.close();
        });
    }

    close(): void {
        this.dialogRef.close();
    }


    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

}
