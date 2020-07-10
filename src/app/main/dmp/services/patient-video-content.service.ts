import {Injectable} from '@angular/core';
import {ServiceCommonConstant} from '../../../shared/constant/service-common-constant';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PatientVideoContentService {

    private readonly PATIENT_VIDEO = ServiceCommonConstant.adminModuleUrl + '/patient-video';


    constructor(private http: HttpClient) {
    }

    private readonly HTTP_OPTIONS = function(): any {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token')
            })
        };
    };

  getAllPatientVideoContentMapByPatientId(patientId: any): any {
    return this.http.get(`${this.PATIENT_VIDEO}/all/${patientId}`, this.HTTP_OPTIONS());
  }
  savePatientVideoContentMap(model: any): Observable<any> {
    return this.http.post(`${this.PATIENT_VIDEO}/create`, model, this.HTTP_OPTIONS());
  }
}
