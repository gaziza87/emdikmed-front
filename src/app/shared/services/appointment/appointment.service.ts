import {Injectable} from '@angular/core';
import {ServiceCommonConstant} from '../../constant/service-common-constant';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Appointment} from '../../models/appointmentv2/appointment';
import {CellInfo} from '../../models/appointmentv2/cell-info';

@Injectable({
    providedIn: 'root'
})
export class AppointmentService {

    private readonly APPOINTMENT = ServiceCommonConstant.coreModuleUrl + '/ais/appointment';
    private readonly CELLINFO = ServiceCommonConstant.coreModuleUrl + '/ais/cell-info';

    constructor(
        private http: HttpClient
    ) {
    }

    private readonly HTTP_OPTIONS = function(): any {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token')
            })
        };
    };

    getCellInfoListByDoctorIdAndDate(doctorId: string, date: string): Observable<any> {
        return this.http.get(`${this.CELLINFO}/read/doctors/appointments/${doctorId}/${date}`, this.HTTP_OPTIONS());
    }

    getWeekAppointmentForDoctor(doctorId: string, from: string, due: string): Observable<any> {
        return this.http.get(`${this.APPOINTMENT}/read/${doctorId}/${from}/${due}`, this.HTTP_OPTIONS());
    }

    createAppointment(appointment: Appointment): Observable<any> {
        return this.http.post(`${this.APPOINTMENT}/create`, appointment, this.HTTP_OPTIONS());
    }

    createCellInfo(cellInfo: CellInfo): Observable<any> {
        return this.http.post(`${this.CELLINFO}/create`, cellInfo, this.HTTP_OPTIONS());
    }

    updateCellInfo(cellInfo: CellInfo): Observable<any> {
        return this.http.put(`${this.CELLINFO}/update`, cellInfo, this.HTTP_OPTIONS());
    }

    getCellInfoById(id: string): Observable<any> {
        return this.http.get(`${this.CELLINFO}/get/${id}`, this.HTTP_OPTIONS());
    }
}
