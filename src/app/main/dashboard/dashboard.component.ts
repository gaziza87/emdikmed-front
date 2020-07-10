import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../shared/services/administration/user.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {User} from '../../shared/models/admin/user';
import {AppointmentService} from '../../shared/services/appointment/appointment.service';
import {UserDTO} from '../../shared/models/admin/userDTO';
import {CellInfo} from '../../shared/models/appointmentv2/cell-info';
import {MatTabGroup} from '@angular/material/tabs';
import {LaboratoryComponent} from './patient-detail/laboratory/laboratory.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {

    displayedColumns: string[] = ['timeString', 'userFullName', 'doctorFullName', 'doctorSpecialty', 'actions'];

    userAccountId: string;
    userDTO: UserDTO;

    cellInfoList: CellInfo[] = [];

    headers = [];

    months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

    currentDate: string;
    currentIndex = 1;

    period: string;

    dialogRef: any;

    @ViewChild('tabGroup') tabGroup: MatTabGroup;

    private _unsubscribeAll: Subject<any>;

    constructor(
        public _userService: UserService,
        private _appointmentService: AppointmentService,
        private router: Router,
        public dialog: MatDialog,
    ) {
        this._unsubscribeAll = new Subject<any>();

        this.userAccountId = localStorage.getItem('userAccountId');
        this.loadCurrentUser();
    }

    ngOnInit(): void {
        this.currentDate = this.dateAsString(new Date());
        this.initHeaders();
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    ngAfterViewInit(): void {
        this.tabGroup.selectedIndex = this.headers.indexOf({date: new Date(), dateString: this.currentDate});
    }

    loadCurrentUser(): void {
        this._userService.getDTOByUserAccountId(this.userAccountId).pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
            this.userDTO = res;
            this.loadDoctorAppointments(this.currentDate);
        });
    }

    loadDoctorAppointments(date: string): void {
        this._appointmentService.getCellInfoListByDoctorIdAndDate(this.userDTO.user.id, date).subscribe((res) => {
            this.cellInfoList = res;
        });
    }

    initHeaders(): void {
        for (let i = 1; i < 8; i++) {
            const date = new Date();
            date.setDate(date.getDate() - (date.getDay() - i));
            this.headers.push({
                date,
                dateString: this.dateAsString(date)
            });
        }
        console.log(this.headers);
        this.period = this.dateAsPeriod(this.headers[0].date, this.headers[6].date);
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


    openVisit(row) {
        const type = row.visitId !== null && row.visitId.length > 0 ? 'edit' : 'new';
        let id = row.userId;
        if (type === 'edit') {
            id = row.visitId;
            this.router.navigate([`/patient-detail/${type}/${id}`]);
        } else {
            this.router.navigate([`/patient-detail/cell/${row.id}/${type}/${id}`]);
        }

    }

    tabChanged(event): void {
        console.log('event', event);
        this.currentIndex = event.index;
        this.loadDoctorAppointments(event.tab.textLabel);
    }
}
