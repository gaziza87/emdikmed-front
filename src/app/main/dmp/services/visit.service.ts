import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Visit} from '../../models/dmp/visit/visit';
import {ServiceCommonConstant} from '../../../shared/constant/service-common-constant';

@Injectable()
export class VisitService {

    private readonly VISIT = ServiceCommonConstant.coreModuleUrl + '/visit';
    private readonly VISIT_CONTENT = ServiceCommonConstant.coreModuleUrl + '/visit-content';

    private readonly UPDATE_VISIT = '/emdikmed/core/visit/update';
    private readonly CREATE_VISIT = '/emdikmed/core/visit/create';
    private readonly GET_VISIT_BY_ID = '/emdikmed/core/visit';

    private readonly HTTP_OPTIONS = () => {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token')
            })
        };
    }

    constructor(
        private _http: HttpClient
    ) {
    }

    getVisitListByDoctorId(doctorId: string): Observable<any> {
        return this._http.get(`${this.VISIT}/read/visit/iterable/byDoctorId/${doctorId}`, this.HTTP_OPTIONS());
    }

    getVisitListByPatientId(patientId: string): Observable<any> {
        return this._http.get(`${this.VISIT}/read/visit/iterable/byPatientId/${patientId}`, this.HTTP_OPTIONS());
    }

    updateVisit(visit: Visit): Observable<any> {
        return this._http.put(this.UPDATE_VISIT, visit, this.HTTP_OPTIONS());
    }

    createVisit(visit: Visit): Observable<any> {
        return this._http.post(this.CREATE_VISIT, visit, this.HTTP_OPTIONS());
    }
    getVisitById(id: string): Observable<any> {
        return this._http.get(this.GET_VISIT_BY_ID + '/read/' + id, this.HTTP_OPTIONS());
    }

}
