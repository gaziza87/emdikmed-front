import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Settings} from '../../../app.settings.model';
import {AppSettings} from '../../../app.settings';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {UserDetailComponent} from './user-detail/user-detail.component';
import {Subject} from 'rxjs';
import {UserService} from '../../../shared/services/administration/user.service';
import {User} from '../../../shared/models/admin/user';
import {log} from 'util';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {UserDTO} from '../../../shared/models/admin/userDTO';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
    @ViewChild(DatatableComponent) table: DatatableComponent;
    dialogRef: any;
    color = 'primary';
    paginationTotalElements: any = 0;
    paginationRows: any;
    checked = false;
    disabled = false;
    userDTOList: UserDTO[];
    temp = [];
    selected = [];
    page = 0;
    size = 5;
    public settings: Settings;
    private _unsubscribeAll: Subject<any>;

    constructor(public appSettings: AppSettings,
                public dialog: MatDialog,
                private _matSnackBar: MatSnackBar,
                public _userService: UserService) {
        this._unsubscribeAll = new Subject<any>();
    }

    ngOnInit(): void {
        this.getAllPatients();
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    getAllPatients() {
        const params = 'role=' + 'PATIENT' ;
        this._userService.getAllUsersByParam(params).subscribe(response => {
            console.log('response', response);
            this.userDTOList = response.content;
            console.log('this.userDTOList', this.userDTOList);
            this.paginationTotalElements = parseInt(response.total, 10);
            this.paginationRows = parseInt(response.pageable.size, 10);
        }, err => {
            console.error(err);
        });
    }

    changeTableList(event): void {
        const params = 'role=' + 'PATIENT' + '&organizationId=' + '' + '&page=' + event.pageIndex + '&size=' + event.pageSize;
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
        this.dialogRef = this.dialog.open(UserDetailComponent, {
            data: {
                action,
                userDTO
            }
        });
        this.dialogRef.afterClosed().subscribe(response => {
            this.getAllPatients();
        });
    }

    Delete(id) {
        const snackBarRef = this._matSnackBar.open('Вы действительно хотите удалить пациента?', 'Да', {
            verticalPosition: 'top',
            duration: 5000
        } as MatSnackBarConfig);
        snackBarRef.onAction().subscribe(() => {
            this._userService.deleteUserById(id).subscribe(response => {
                this.getAllPatients();
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
