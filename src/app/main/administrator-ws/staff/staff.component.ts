import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Settings} from '../../../app.settings.model';
import {AppSettings} from '../../../app.settings';
import {MatDialog} from '@angular/material/dialog';
import {UserDTO} from '../../../shared/models/admin/userDTO';
import {Subject} from 'rxjs';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {UserService} from '../../../shared/services/administration/user.service';
import {UserDetailComponent} from '../users/user-detail/user-detail.component';
import {ServiceCommonConstant} from '../../../shared/constant/service-common-constant';
import {User} from '../../../shared/models/admin/user';
import {OrganizationService} from '../../../shared/services/administration/organization.service';
import {Organization} from '../../../shared/models/admin/organization';
import {StaffDetailComponent} from './staff-detail/staff-detail.component';

@Component({
    selector: 'app-staff',
    templateUrl: './staff.component.html',
    styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit, OnDestroy {
    @ViewChild(DatatableComponent) table: DatatableComponent;
    dialogRef: any;
    color = 'primary';
    paginationTotalElements: any = 0;
    paginationRows: any;
    checked = false;
    disabled = false;
    userDTOList: UserDTO[];
    user: User = new User();
    temp = [];
    selected = [];
    page = 0;
    size = 5;
    adminUrl = ServiceCommonConstant.adminModuleUrl;
    search = '';
    orgList: Organization[];
    orgId: string;
    isGAdmin: any;
    isLAdmin: any;
    roles: any;

    public settings: Settings;
    private _unsubscribeAll: Subject<any>;

    constructor(public appSettings: AppSettings,
                public dialog: MatDialog,
                private _matSnackBar: MatSnackBar,
                public _userService: UserService,
                public _orgService: OrganizationService) {

        this._unsubscribeAll = new Subject<any>();
        this.isGAdmin = localStorage.getItem('roles').includes('GLOBAL_ADMINISTRATOR');
        this.isLAdmin = localStorage.getItem('roles').includes('LOCAL_ADMINISTRATOR');

        if (this.isLAdmin) {
            this.orgId = localStorage.getItem('orgId');
        }
        if (this.isGAdmin) {
            this.getAllOrgs();
        }
        this.searchStaff();
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    getAllOrgs() {
        this._orgService.getAllOrganization().subscribe(res => {
            this.orgList = res;
        }, error => {
            console.log(error);
        });
    }

    searchStaff() {
        let params = 'role=' + 'DOCTOR&';

        if (this.orgId) {
            params += 'organizationId=' + this.orgId + '&';
        }
        if (this.user.name) {
            params += 'searchString=' + this.search;
        }


        this._userService.searchAllUsersByParam(params).subscribe(response => {
            this.userDTOList = response.content;
            console.log(' search this.userDTOList', this.userDTOList);
            this.paginationTotalElements = parseInt(response.total, 10);
            this.paginationRows = parseInt(response.pageable.size, 10);
        }, err => {
            console.error(err);
        });
    }

    changeTableList(event): void {
        const params = 'role=' + 'DOCTOR' + '&organizationId=' + '' + '&page=' + event.pageIndex + '&size=' + event.pageSize;
        this.page = event.pageIndex;
        this.size = event.pageSize;
        this._userService.getAllUsersByParam(params).subscribe(response => {
            this.userDTOList = response.content.user;
            this.paginationTotalElements = parseInt(response.total, 10);
            this.paginationRows = parseInt(response.pageable.size, 10);
        }, err => {
            console.error(err);
        });
    }

    userControl(userDTO): void {
        const action = userDTO !== null ? 'edit' : 'new';
        this.dialogRef = this.dialog.open(StaffDetailComponent, {
            data: {
                action,
                userDTO
            }
        });
        this.dialogRef.afterClosed().subscribe(response => {
            this.searchStaff();
        });
    }

    Delete(id) {
        const snackBarRef = this._matSnackBar.open('Вы действительно хотите удалить пациента?', 'Да', {
            verticalPosition: 'top',
            duration: 5000
        } as MatSnackBarConfig);
        snackBarRef.onAction().subscribe(() => {
            this._userService.deleteUserById(id).subscribe(response => {
                this.searchStaff();
            });
        });
        //         err => {
        //     console.error(err);
        // });
    }

    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        // tslint:disable-next-line:only-arrow-functions
        const temp = this.temp.filter(function(d) {
            return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.userDTOList = temp;
        this.table.offset = 0;
    }

    onSelect({selected}) {
        console.log('Select Event', selected, this.selected);
        this.selected.splice(0, this.selected.length);
        this.selected.push(...selected);
    }

}
