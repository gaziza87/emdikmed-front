import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from '../../../auth/service/auth.service';
import {UserService} from '../../../shared/services/administration/user.service';
import {takeUntil} from 'rxjs/operators';
import {UserDTO} from '../../../shared/models/admin/userDTO';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';

@Component({
    selector: 'app-user-menu',
    templateUrl: './user-menu.component.html',
    styleUrls: ['./user-menu.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class UserMenuComponent implements OnInit {
    public userImage = '../assets/img/users/user1.jpg';

    userAccountId: string;
    userDTO: UserDTO;

    private _unsubscribeAll: Subject<any>;

    constructor(
        private authService: AuthService,
        private userService: UserService,
        public router: Router,
    ) {
        this._unsubscribeAll = new Subject<any>();
        if (localStorage.getItem('userAccountId')) {
            this.userAccountId = localStorage.getItem('userAccountId');
            this.loadCurrentUser();
        } else {

            this.router.navigate(['/auth']);
        }
    }

    ngOnInit() {
    }

    logout() {
        this.authService.logout();
    }

    loadCurrentUser(): void {
        this.userService.getDTOByUserAccountId(this.userAccountId).pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
            this.userDTO = res;
            console.log(this.userDTO);
        });
    }
}
