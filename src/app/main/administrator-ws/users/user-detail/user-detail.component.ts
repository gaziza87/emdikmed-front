import {Component, Inject, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {User} from '../../../../shared/models/admin/user';
import {UserService} from '../../../../shared/services/administration/user.service';
import {take, takeUntil} from 'rxjs/operators';
import {BehaviorSubject, Subject} from 'rxjs';
import {ROLE} from '../../../../core/models/admin/role';
import {OrganizationService} from '../../../../shared/services/administration/organization.service';
import {Organization} from '../../../../shared/models/admin/organization';
import {UserAccount} from '../../../../shared/models/admin/user-account';
import {UserRoleMapDTO} from '../../../../shared/models/admin/userRoleMapDTO';
import {UserRoleOrgMap} from '../../../../shared/models/admin/userRoleOrgMap';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UserDetailComponent implements OnInit, OnDestroy {

    user: User;
    action: string;
    dialogTitle: string;
    roles = ROLE;
    organizations: Organization[];
    orgSubject = new BehaviorSubject<any>({});
    orgMap: any;
    selectedOrganizationIds = [];
    userAccount: UserAccount;
    organization: Organization;
    orgId: string;
    isGAdmin: any;
    isLAdmin: any;
    search = '';
    userRoleOrgMapList: UserRoleOrgMap[] = [];
    userRoleMapDTO: UserRoleMapDTO;
    password = '';
    private _unsubscribeAll: Subject<any>;

    constructor(public dialogRef: MatDialogRef<UserDetailComponent>,
                @Inject(MAT_DIALOG_DATA) public _data: any,
                public _userService: UserService,
                private _matSnackBar: MatSnackBar,
                public _orgService: OrganizationService) {
        this.orgId = localStorage.getItem('orgId');

        this.action = _data.action;
        console.log('_data', _data);
        this._unsubscribeAll = new Subject<any>();

        if (this.action === 'edit') {
            this.user = _data.userDTO.user;
            this.userAccount = _data.userDTO.userAccount;
            this.userRoleOrgMapList = this.userAccount.userRoleOrgMapList;
            this.userAccount.userRoleOrgMapList.forEach(map => {
                this.selectedOrganizationIds.push(map.orgId);
            });
            const fio = this.user.surname + ' ' + this.user.name + ' ' + this.user.middlename;
            this.dialogTitle = 'Профиль сотрудника ' + fio;

        } else {
            this.dialogTitle = 'Добавления сотрудника';
            this.user = new User();
            this.userAccount = new UserAccount();
            this.userRoleOrgMapList.forEach(map => {
                this.selectedOrganizationIds.push(map.orgId);
            });
        }


        this.isGAdmin = localStorage.getItem('roles').includes('GLOBAL_ADMINISTRATOR');
        this.isLAdmin = localStorage.getItem('roles').includes('LOCAL_ADMINISTRATOR');
        if (this.isGAdmin) {
            this.getAllOrganization();
        }
        if (this.isLAdmin) {
            this.getOrganizationById();
        }

    }

    ngOnInit(): void {
    }


    getAllOrganization() {
        this._orgService.getAllOrganization().subscribe(res => {
            this.organizations = res;
            this.orgMap = {};
            this.organizations.forEach(organization => {
                this.orgMap[organization.id] = organization.name.ru;
                this.orgSubject.next(this.orgMap);
            });
            console.log('getAllOrganization', this.organizations);
            console.log('orgMap', this.orgMap);
        });
    }

    getOrganizationById() {
        this._orgService.getById(this.orgId).subscribe(res => {
            this.organization = res;
            console.log(this.organization);
        });
    }

    searchOrganization() {
        const params = 'searchString=' + this.search;
        this._orgService.searchOrganization(params).pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
            this.organizations = res.content;
        });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    close(): void {
        this.dialogRef.close();
    }

    addOrg(): void {
        const includedIds = [];
        this.userRoleOrgMapList.forEach(map => {
            if (this.selectedOrganizationIds.includes(map.orgId)) {
                this.selectedOrganizationIds.splice(this.selectedOrganizationIds.indexOf(map.orgId), 1);
            }
        });
        for (let i = 0; i < this.selectedOrganizationIds.length; i++) {
            const map = {
                userAccountId: '',
                orgId: this.selectedOrganizationIds[i],
                roles: []
            };
            this.userRoleOrgMapList.push(map);
        }
    }

    createStaff() {
        this.userRoleMapDTO = new UserRoleMapDTO();
        this.userRoleMapDTO.user = this.user;
        if (this.password.length >= 6) {
            this.userRoleMapDTO.password = this.password;
            this.userRoleMapDTO.userRoleOrgMapList = this.userRoleOrgMapList;
            this._userService.createUser(this.userRoleMapDTO).subscribe(res => {
                this.user = res.user;
                this.userAccount = res.userAccount;
                this._matSnackBar.open('Пользователь сохранен', 'ОК', {
                    verticalPosition: 'top',
                    duration: 2000
                } as MatSnackBarConfig);
            });
        } else {
            this._matSnackBar.open('Введите пароль', 'ОК', {
                verticalPosition: 'top',
                duration: 5000
            } as MatSnackBarConfig);
        }
    }

    editStaff() {
        if (this.password.length >= 6) {
            this.userAccount.password = this.password;
            this._userService.saveUser(this.user).subscribe(res => {
                this._userService.createUserAccount(this.userAccount).subscribe(res1 => {
                    this.user = res;
                    this.userAccount = res1;
                    this._matSnackBar.open('Пользователь сохранен', 'ОК', {
                        verticalPosition: 'top',
                        duration: 2000
                    } as MatSnackBarConfig);
                });
            });
        } else {
            this._matSnackBar.open('Введите пароль', 'ОК', {
                verticalPosition: 'top',
                duration: 5000
            } as MatSnackBarConfig);
        }
    }

}
