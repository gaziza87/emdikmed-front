import {AfterViewInit, ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Settings} from '../../app.settings.model';
import {AppSettings} from '../../app.settings';
import {Router} from '@angular/router';
import {emailValidator} from '../../theme/utils/app-validators';
import {AuthService} from '../service/auth.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {FeedbackService} from '../../utils/feedback-service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

    public form: FormGroup;
    public settings: Settings;

    val = 0;

    private unsubscribeAll: Subject<any>;

    constructor(
        public appSettings: AppSettings,
        public fb: FormBuilder,
        public router: Router,
        public authService: AuthService,
        public feedbackService: FeedbackService,
        private cdr: ChangeDetectorRef
    ) {
        this.settings = this.appSettings.settings;
        this.form = this.fb.group({
            username: [null, Validators.compose([Validators.required])],
            password: [null, Validators.compose([Validators.required, Validators.minLength(6)])]
        });
        this.unsubscribeAll = new Subject<any>();
    }

    ngOnInit(): void {

    }

    ngOnChanges(changes: SimpleChanges): void {
        this.val += 1; // <- get error after
        this.cdr.detectChanges();
    }

    ngAfterViewInit() {
        this.settings.loadingSpinner = false;
    }

    ngOnDestroy(): void {
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }

    public onSubmit(values: any): void {
        if (this.form.valid) {
            const username = this.form.getRawValue().username;
            const password = this.form.getRawValue().password;
            this.authService.login(username, password).pipe(takeUntil(this.unsubscribeAll)).subscribe((res: any) => {
                console.log('response', res);
                localStorage.setItem('userAccountId', res.id);
                localStorage.setItem('username', res.username);
                localStorage.setItem('token', res.token);
                localStorage.setItem('roles', res.roles);
                if (res.userAccount.userRoleOrgMapList.length > 0) {
                    localStorage.setItem('orgId', res.userAccount.userRoleOrgMapList[0].orgId);
                }
                this.router.navigate(['/']);
            }, () => {
                this.feedbackService.displayMessage('Неправильный логин или пароль!');
            });
        }
    }

}
