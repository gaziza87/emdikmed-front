import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {UserService} from '../../shared/services/administration/user.service';
import {takeUntil} from 'rxjs/operators';
import {User} from '../../shared/models/admin/user';
import {UserRoleMapDTO} from '../../shared/models/admin/userRoleMapDTO';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {UserRoleOrgMap} from '../../shared/models/admin/userRoleOrgMap';
import {Organization} from '../../shared/models/admin/organization';
import {OrganizationService} from '../../shared/services/administration/organization.service';
import {ROLE} from '../../core/models/admin/role';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {

    user: User;
    userRoleMapDTO: UserRoleMapDTO;
    password = '';
    userRoleOrgMapList: UserRoleOrgMap[] = [];
    userRoleOrgMap: UserRoleOrgMap;
    organizations: Organization[] = [];
    search = '';

    constructor(
        public userService: UserService,
        public _matSnackBar: MatSnackBar,
        public _orgService: OrganizationService
    ) {
        this.userRoleOrgMap = new UserRoleOrgMap();
        this.user = new User();
    }

    ngOnInit(): void {
        this.searchOrganization();
    }

    ngOnDestroy(): void {
    }

    searchOrganization() {
        const params = 'searchString=' + this.search;
        this._orgService.searchOrganization(params).subscribe(res => {
            this.organizations = res.content;
            console.log(this.organizations);
        });
    }

    register() {
        this.userRoleMapDTO = new UserRoleMapDTO();
        this.userRoleMapDTO.user = this.user;
        if (this.password.length >= 6) {
            this.userRoleMapDTO.password = this.password;
            this.userRoleMapDTO.userRoleOrgMapList = this.userRoleOrgMapList;
            this.userService.createUser(this.userRoleMapDTO).subscribe(res => {
                // this.user = res.user;
                // this.userAccount = res.userAccount;
                this._matSnackBar.open('Пользователь сохранен', 'ОК', {
                    verticalPosition: 'top',
                    duration: 5000
                } as MatSnackBarConfig);
            });
        } else {
            this._matSnackBar.open('Введите пароль', 'ОК', {
                verticalPosition: 'top',
                duration: 5000
            } as MatSnackBarConfig);
        }
    }

    chooseOrganization() {
        this.userRoleOrgMap.roles.push(ROLE.PATIENT);
        this.userRoleOrgMap.userAccountId = '';
        this.userRoleOrgMapList.push(this.userRoleOrgMap);
        console.log('this.userRoleOrgMapList', this.userRoleOrgMapList);
    }
}
