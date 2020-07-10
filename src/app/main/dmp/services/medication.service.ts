import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Medication} from '../../models/dmp/configuration/medication';
import {Injectable} from '@angular/core';

@Injectable()
export class MedicationService {
    private readonly SEARCH_DMP_MEDICATION_PAGEABLE = '/emdikmed/core/medication/search/medication/pageable';
    private readonly GET_DMP_MEDICATION_PAGEABLE = '/emdikmed/core/medication/read/medication/pageable';
    private readonly GET_DMP_MEDICATION_ITERABLE = '/emdikmed/core/medication/read/medication/iterable';
    private readonly GET_DMP_MEDICATION_ITERABLE_BY_FILTER = '/emdikmed/core/medication/read/medication/iterable';
    private readonly GET_DMP_MEDICATION = '/emdikmed/core/medication/read/medication';
    private readonly CREATE_DMP_MEDICATION = '/emdikmed/core/medication/create/medication';
    private readonly UPDATE_DMP_MEDICATION = '/emdikmed/core/medication/update/medication';
    private readonly DELETE_DMP_MEDICATION = '/emdikmed/core/medication/delete/medication';

    private readonly HTTP_OPTIONS = function(): any {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token')
            })
        };
    };

    constructor(
        private _http: HttpClient
    ) {
    }

    searchMedicationPageable(params: string): Observable<any> {
        return this._http.get(this.SEARCH_DMP_MEDICATION_PAGEABLE + '?' + params, this.HTTP_OPTIONS());
    }

    getMedicationPageable(params: string): Observable<any> {
        return this._http.get(this.GET_DMP_MEDICATION_PAGEABLE + '?' + params, this.HTTP_OPTIONS());
    }

    getMedicationIterable(): Observable<any> {
        return this._http.get(this.GET_DMP_MEDICATION_ITERABLE, this.HTTP_OPTIONS());
    }

    getMedication(id: string): Observable<any> {
        return this._http.get(this.GET_DMP_MEDICATION + '/' + id, this.HTTP_OPTIONS());
    }

    createMedication(medication: Medication): Observable<any> {
        return this._http.post(this.CREATE_DMP_MEDICATION, medication, this.HTTP_OPTIONS());
    }

    updateMedication(medication: Medication): Observable<any> {
        return this._http.put(this.UPDATE_DMP_MEDICATION, medication, this.HTTP_OPTIONS());
    }

    deleteMedication(id: string): Observable<any> {
        return this._http.delete(this.DELETE_DMP_MEDICATION + '/' + id, this.HTTP_OPTIONS());
    }
}
