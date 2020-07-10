import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {UserService} from '../../../shared/services/administration/user.service';
import {UserDTO} from '../../../shared/models/admin/userDTO';
import {takeUntil} from 'rxjs/operators';
import {Visit} from '../../models/dmp/visit/visit';
import {User} from '../../../shared/models/admin/user';
import {VisitService} from '../../dmp/services/visit.service';
import {DeviceStatService} from '../../../shared/services/device/device-stat.service';

@Component({
    selector: 'app-patients-list',
    templateUrl: './patients-list.component.html',
    styleUrls: ['./patients-list.component.scss']
})
export class PatientsListComponent implements OnInit, OnDestroy {

    displayedColumns: string[] = ['name', 'surname', 'email', 'mobilePhone', 'status', 'actions'];

    userAccountId: string;
    userDTO: UserDTO;

    visits: Visit[] = [];

    patientIds: string[] = [];

    datasource = new BehaviorSubject([]);

    patients: UserDTO[] = [];

    private _unsubscribeAll: Subject<any>;

    constructor(
        private userService: UserService,
        private deviceStatService: DeviceStatService,
        private visitService: VisitService
    ) {
        this._unsubscribeAll = new Subject<any>();
    }

    ngOnInit(): void {
        this.userAccountId = localStorage.getItem('userAccountId');
        this.loadCurrentUser();
        console.log(this.visits, '===========');
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    loadCurrentUser(): void {
        this.userService.getDTOByUserAccountId(this.userAccountId).pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
            this.userDTO = res;
            this.loadVisitsByDoctorId();
        });
    }

    loadVisitsByDoctorId(): void {
        this.visitService.getVisitListByDoctorId(this.userDTO.user.id).pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
            this.visits = res;
            this.patientIds = this.visits.map(visit => visit.patientId);
            this.loadPatientsByIdIn();
            console.log('patientIds', this.patientIds);
        });
    }

    loadPatientsByIdIn(): void {
        this.userService.getUsersPageableByIdIn(this.patientIds, '').pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
            this.patients = res.content;
            this.datasource.next(this.patients);
            for (let i = 0; i < this.patients.length; i++) {
                this.loadDeviceStat(this.patients[i].userAccount.id, i);
            }
            console.log('datasource', this.datasource);
        });
    }

    loadDeviceStat(userAccountId: string, i: number): void {
        this.deviceStatService.getLastDeviceStatRecord(userAccountId).subscribe(res => {
            this.patients[i].healthStatus = res.healthStatus;
            this.datasource.next(this.patients);
        });
    }

    openDialog() {

    }


}
