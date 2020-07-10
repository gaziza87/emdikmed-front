import {Component, OnInit, ViewEncapsulation, ViewChild, OnDestroy} from '@angular/core';
import {AppSettings} from '../../../app.settings';
import {Settings} from '../../../app.settings.model';
import {MenuService} from '../menu/menu.service';
import {Subject} from 'rxjs';
import {UserService} from '../../../shared/services/administration/user.service';
import {takeUntil} from 'rxjs/operators';
import {UserDTO} from '../../../shared/models/admin/userDTO';
import {AuthService} from '../../../auth/service/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [MenuService]
})
export class SidenavComponent implements OnInit, OnDestroy {
    public userImage = '../assets/img/users/user1.jpg';
    public menuItems: Array<any>;
    public settings: Settings;

    userAccountId: string;
    userDTO: UserDTO;

    private _unsubscribeAll: Subject<any>;

    constructor(public appSettings: AppSettings,
                public menuService: MenuService,
                public userService: UserService,
                public authService: AuthService,
                public router: Router,
                ) {
        this.settings = this.appSettings.settings;
        this._unsubscribeAll = new Subject<any>();
        if (localStorage.getItem('userAccountId')) {
            this.userAccountId = localStorage.getItem('userAccountId');
            this.loadCurrentUser();
        } else {

            this.router.navigate(['/auth']);
        }
    }

    ngOnInit() {
        this.menuItems = this.menuService.getVerticalMenuItems();
        this.loadCurrentUser();
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }


    public closeSubMenus() {
        const menu = document.getElementById('vertical-menu');
        if (menu) {
            for (let i = 0; i < menu.children[0].children.length; i++) {
                const child = menu.children[0].children[i];
                if (child) {
                    if (child.children[0].classList.contains('expanded')) {
                        child.children[0].classList.remove('expanded');
                        child.children[1].classList.remove('show');
                    }
                }
            }
        }
    }

    loadCurrentUser(): void {
        this.userService.getDTOByUserAccountId(this.userAccountId).pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
            this.userDTO = res;
        });
    }

    logout() {
        this.authService.logout();
    }


}
