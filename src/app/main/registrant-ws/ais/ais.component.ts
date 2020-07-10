import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    LOCALE_ID,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {ReplaySubject, Subject} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../shared/models/admin/user';
import {take, takeUntil} from 'rxjs/operators';
import {UserService} from '../../../shared/services/administration/user.service';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {Appointment} from '../../../shared/models/appointmentv2/appointment';
import {AppointmentData} from '../../../shared/initialize-db/appointment-data';
import {UserFullData} from '../../../shared/models/admin/user-full-data';
import {UserAccount} from '../../../shared/models/admin/user-account';
import {MatSelect} from '@angular/material/select';
import {MatHorizontalStepper, MatStepper} from '@angular/material/stepper';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {DateAdapter} from 'angular-calendar';
import {MAT_DATE_FORMATS} from '@angular/material/core';
import {APP_DATE_FORMATS, AppDateAdapter} from '../../utils/adapter/date-adapter';
import {startOfDay} from 'date-fns';
import {registerLocaleData, WeekDay} from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import {fuseAnimations} from '../../../@fuse/animations';
import {AppointmentService} from '../../../shared/services/appointment/appointment.service';

// the second parameter 'ru' is optional
// registerLocaleData(localeRu, 'ru');

@Component({
    selector: 'app-ais',
    templateUrl: './ais.component.html',
    styleUrls: ['./ais.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        {provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}},
        {provide: DateAdapter, useClass: AppDateAdapter},
        {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS},
        {provide: LOCALE_ID, useValue: 'ru'}
    ]
})
export class AisComponent implements OnInit, OnDestroy, AfterViewInit {

    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;

    users: UserFullData[] = [];
    userDTO: UserFullData;
    doctor: UserFullData;

    registrationUser: User;
    selectedUser: User;

    doctors: UserFullData[] = [];
    initialDoctorList: UserFullData[] = [];
    selectedDoctor: UserFullData;

    appointment: Appointment;
    appointmentInitialData = new AppointmentData();

    headers = [];
    months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    time = [];

    view: string;
    currentDate = new Date();
    viewDate = new Date();
    selectedDay: any;
    period: string;

    userAdded = false;
    userFound = false;
    dateValue = null;
    searchType = 'idn';
    newUser = false;
    idn: string;

    searchString: string;

    trackById: any;

    @ViewChild('singleDoctorSelect', {static: false}) singleDoctorSelect: MatSelect;
    @ViewChild('stepper', {static: false}) stepper: MatHorizontalStepper;

    public selectDoctorCtrl: FormControl = new FormControl();
    public filterDoctorCtrl: FormControl = new FormControl();
    public filteredDoctorItems: ReplaySubject<any[]> = new ReplaySubject<User[]>(1);

    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';

    private _unsubscribeAll: Subject<any>;

    constructor(
        private _snackBar: MatSnackBar,
        private _userService: UserService,
        private _formBuilder: FormBuilder,
        private appointmentService: AppointmentService
    ) {
        this._unsubscribeAll = new Subject<any>();
    }

    ngOnInit(): void {
        this.userDTO = new UserFullData();
        // this.doctor = new UserFullData(null, new User(), new UserAccount());
        // this.initAppointment();
        this.loadAllDoctors();
        this.firstFormGroup = this._formBuilder.group({
            name: ['', Validators.required],
            surname: ['', Validators.required],
            middlename: [''],
            idn: [''],
            mobilePhone: ['', Validators.required],
            email: [''],
            sex: ['', Validators.required],
            birthday: [new FormControl(), Validators.required],
            nationality: [''],
            address: [''],
        });
        this.secondFormGroup = this._formBuilder.group({
            doctor: ['']
        });

        this.view = 'week';
        this.viewDate = new Date();

        this.initHeaders();

        this.period = this.dateAsPeriod(this.headers[1].date, this.headers[7].date);

        console.log(this.headers);

        this.selectedDay = {date: startOfDay(new Date())};

    }

    ngAfterViewInit(): void {
        this.setInitialValue();
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    loadAllDoctors(): void {
        const params = 'role=DOCTOR&page=0&size=50';
        this._userService.getUsersPageable(params).pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
            this.doctors = res.content;
            this.filteredDoctorItems.next(this.doctors.slice());
            this.filterDoctorCtrl.valueChanges.pipe(takeUntil(this._unsubscribeAll)).subscribe(() => {
                this.filterDoctors();
            });
        });
    }

    private setInitialValue(): void {
        this.filteredDoctorItems
            .pipe(take(1), takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.singleDoctorSelect.compareWith = (a: any, b: any) =>
                    a.toString().id === b.toString().id;
            });
    }

    private filterDoctors(): void {
        if (!this.doctors) {
            return;
        }
        // get the search keyword
        const search = this.filterDoctorCtrl.value;
        // console.log.log('search', search);
        if (!search) {
            this.filteredDoctorItems.next(this.doctors.slice());
            this.doctors = this.initialDoctorList;
            return;
        }
        this.doctors = this.initialDoctorList;
        // filter the items
        this.filteredDoctorItems.next(
            this.doctors = this.doctors.filter(
                doctor => doctor.user.id.toString().indexOf(search.toString()) > -1
            )
        );
    }

    register() {
        this._userService.saveUser(this.registrationUser).pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
            this.registrationUser = res;
            this.selectedUser = res;
            this.createUserAccount();
        });
    }

    createUserAccount(): void {
        this._userService.createUserAccountFromUser(this.selectedUser).pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
            this.stepper.next();
            this.displayMessage('Пациент успешно зарегистрирован!');
        });
    }

    showIdn(): void {
        this.searchType = 'idn';
    }

    showPhone(): void {
        this.searchType = 'phone';
    }

    showSurname(): void {
        this.searchType = 'surname';
    }

    applyFilter(searchString: string): void {
        if (this.searchType === 'idn' && searchString.length === 12) {
            this.searchString = searchString;
            const params = 'searchString=' + this.searchString + '&role=PATIENT';
            this._userService.searchUsersPageable(params).pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
                this.userDTO = res.content != null && res.content.length > 0 ? res.content[0] : null;
                this.selectedUser = this.userDTO.user;
                this.userFound = true;
                if (this.userDTO === null) {
                    this.displayMessage('Пациент по заданному ИИН не найден!');
                    this.userFound = false;
                }
            }, error => {
                this.displayMessage('Ошибка при загрузки данных пациента!');
            });
        } else if (this.searchType === 'phone'  && searchString.length >= 10) {
            const params = 'searchString=' + searchString + '&role=PATIENT';
            this._userService.searchUsersPageable(params).pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
                // this.userList = res.content;
                this.userDTO = res.content != null && res.content.length > 0 ? res.content[0] : null;
                this.selectedUser = this.userDTO.user;
                this.userFound = true;
                if (this.userDTO === null) {
                    this.displayMessage('Пациент по заданному номеру телефона не найден!');
                    this.userFound = false;
                }
            });
        } else if (this.searchType === 'surname'  && searchString.length >= 2) {
            const params = 'searchString=' + searchString + '&role=PATIENT';
            // const x = searchString.split(' ');
            // let params = '';
            // if (x.length >= 2) {
            //     params = 'surname=' + x[0] + '&&name=' + x[1];
            // } else { params = 'surname=' + x[0]; }
            this._userService.searchUsersPageable(params).pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
                this.users = res.content;
                this.userFound = true;
                if (this.users === null) {
                    this.displayMessage('Пациент по заданными данными не найден!');
                    this.userFound = false;
                }
            });
        } else {
            this.userFound = false;
        }
    }

    private approve(i?): void {
        if (i != null) {
            this.selectedUser = this.users[i].user;
        }
        this.registrationUser = this.selectedUser;
        this.userAdded = true;
        this.newUser = false;
    }

    createNewUser(): void {
        this.registrationUser = new User();
        this.selectedUser = new User();
        this.userDTO = new UserFullData();
        this.userFound = true;
        this.newUser = true;
        // this.approvedUser = this.user;
        this.userAdded = true;
        this.dateValue = null;
        // localStorage.removeItem('appointment-user' );
    }

    changeUser(): void {
        this.userFound = false;
        this.newUser = true;
        this.userAdded = false;
        this.registrationUser = null;
        // localStorage.removeItem('appointment-user' );
        // this.registrationCompleted.emit(this.user);
    }

    initHeaders(): void {
        console.log('date', new Date());
        console.log('day', new Date().getDay());
        this.headers = [{name: 'Время', dateString: '', date: null}];
        if (this.viewDate.getDay() !== 0) {
            for (let i = 1; i < 8; i++) {
                const date = new Date();
                date.setDate(this.viewDate.getDate() - (this.viewDate.getDay() - i));
                this.headers.push(
                    {
                        name: this.dayAsString(date.getDay()),
                        dateString: this.dateAsString(date),
                        date
                    }
                );
            }
        } else {
            for (let i = 6; i >= 1; i--) {
                // tslint:disable-next-line:no-shadowed-variable
                const date = new Date();
                date.setDate(this.viewDate.getDate() + (date.getDay() - i));
                this.headers.push(
                    {
                        name: this.dayAsString(date.getDay()),
                        dateString: this.dateAsString(date),
                        date
                    }
                );
            }
            const date = new Date();
            date.setDate(this.viewDate.getDate() + date.getDay());
            this.headers.push(
                {
                    name: this.dayAsString(date.getDay()),
                    dateString: this.dateAsString(date),
                    date
                }
            );
        }
        // for (let i = 1; i < 8; i++) {
        //     const date = new Date();
        //     if (date.getDay() !== 0) {
        //         date.setDate(this.viewDate.getDate() - (this.viewDate.getDay() - i));
        //     } else {
        //         if (i !== 7) {
        //             date.setDate(this.viewDate.getDate() + (date.getDay() - i));
        //         }
        //     }
        //     this.headers.push(
        //         {
        //             name: this.dayAsString(date.getDay()),
        //             dateString: this.dateAsString(date),
        //             date
        //         }
        //     );
        // }
    }

    initAppointment(): void {
        console.log(this.doctor);
        console.log(this.selectedUser);
        this.appointmentService.getWeekAppointmentForDoctor(this.doctor.user.id, this.headers[1].dateString, this.headers[7].dateString).subscribe(res => {
           this.appointment = res;
           if (this.appointment === null || this.appointment === undefined) {
               this.appointment = new Appointment();
               this.appointment.doctorId = this.doctor.user.id;
               this.appointment.organizationId = localStorage.getItem('organizationId');
               this.appointment.cellInfoMap = this.appointmentInitialData.getRows(this.selectedUser, this.doctor, this.headers);
               this.appointment.from = this.headers[1].date;
               this.appointment.fromString = this.headers[1].dateString;
               this.appointment.due = this.headers[7].date;
               this.appointment.dueString = this.headers[7].dateString;
               this.appointment.state = 'ACTIVE';
           }
           console.log('appointment', this.appointment);
           console.log(Object.keys(this.appointment));
           console.log(Object.keys(this.appointment.cellInfoMap));
           this.time = Object.keys(this.appointment.cellInfoMap);
        }, () => {
            this.displayMessage('Данные не загрузились! Обновите страницу!');
        });
    }

    saveAppointment(time: string, index: number, color: string) {
        this.appointment.cellInfoMap[time][index].userId = this.selectedUser.id;
        this.appointment.cellInfoMap[time][index].userFullName = this.selectedUser.surname + ' ' + this.selectedUser.name + ' ' + this.selectedUser.middlename;
        this.appointment.cellInfoMap[time][index].color = color;
        // this.appointment.cellInfoMap[time][index].cellText = this.appointment.cellInfoMap[time][index].userFullName;
        console.log('Appointment to be saved: ', this.appointment.cellInfoMap[time][index]);
        this.appointmentService.createCellInfo(this.appointment.cellInfoMap[time][index]).subscribe((result) => {
            this.appointment.cellInfoMap[time][index] = result;
            this.appointmentService.createAppointment(this.appointment).subscribe((res) => {
                this.appointment = res;
            });
        });
    }

    dayAsString(day: number): string {
        return this.days[day];
    }

    dateAsString(date: Date): string {
        const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        const month = date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth();
        const year = date.getFullYear();
        return day + '-' + month + '-' + year;
    }

    dateAsPeriod(d1: Date, d2: Date): string {
        let result = d1.getDate() + ' ' + this.months[d1.getMonth()] + ' - ';
        result += d2.getDate() + ' ' + this.months[d2.getMonth()] + ', ' + d1.getFullYear();
        return result;
    }

    showNextWeek() {
        this.viewDate.setTime(this.viewDate.getTime() + (7 * 24 * 60 * 60 * 1000));
        this.initHeaders();
        this.period = this.dateAsPeriod(this.headers[1].date, this.headers[7].date);
    }

    showPreviousWeek() {
        this.viewDate.setTime(this.viewDate.getTime() - (7 * 24 * 60 * 60 * 1000));
        this.initHeaders();
        this.period = this.dateAsPeriod(this.headers[1].date, this.headers[7].date);
    }

    displayMessage(message: string): void {
        this._snackBar.open(message, '', {
            duration: 5000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }

}
