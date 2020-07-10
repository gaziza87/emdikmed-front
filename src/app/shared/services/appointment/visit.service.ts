import {Injectable} from '@angular/core';
import {ServiceCommonConstant} from '../../constant/service-common-constant';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class VisitService {

    private readonly VISIT = ServiceCommonConstant.coreModuleUrl + '/visit';
    private readonly VISIT_CONTENT = ServiceCommonConstant.coreModuleUrl + '/visit-content';

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

    getVisitListByDoctorId(doctorId: string): Observable<any> {
        return this.http.get(`${this.VISIT}/read/visit/iterable/byDoctorId/${doctorId}`, this.HTTP_OPTIONS());
    }

    getVisitListByPatientId(patientId: string): Observable<any> {
        return this.http.get(`${this.VISIT}/read/visit/iterable/byPatientId/${patientId}`, this.HTTP_OPTIONS());
    }
}
