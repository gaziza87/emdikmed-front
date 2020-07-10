import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Disease} from '../../models/dmp/configuration/disease';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DiseaseService {
    private readonly EMDIKMED = '/emdikmed/core/disease';
    private readonly GET_DMP_DISEASE_ITERABLE = this.EMDIKMED + '/read/disease/iterable';
    private readonly SEARCH_DMP_DISEASE_PAGEABLE = this.EMDIKMED + '/search/disease/pageable';
    private readonly GET_DMP_DISEASE_PAGEABLE = this.EMDIKMED + '/read/disease/pageable';
    private readonly GET_DMP_DISEASE_ITERABLE_BY_FILTER = this.EMDIKMED + '/read/disease/iterable';
    private readonly GET_DMP_DISEASE = this.EMDIKMED + '/read/disease';
    private readonly CREATE_DMP_DISEASE = this.EMDIKMED + '/create/disease';
    private readonly UPDATE_DMP_DISEASE = this.EMDIKMED + '/update/disease';
    private readonly DELETE_DMP_DISEASE = this.EMDIKMED + '/delete/disease';
    private readonly GET_DMP_DISEASE_ITERABLE_BY_ID_IN = this.EMDIKMED  + '/read/disease/iterable/byIdIn';

    // private readonly HTTP_OPTIONS = function (): any {
    //     return {
    //         headers: new HttpHeaders({
    //             'Content-Type': 'application/json',
    //             Authorization: localStorage.getItem('token')
    //         })
    //     };
    // };

    private readonly HTTP_OPTIONS = function (): any {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token')
            })
        };
    };

    constructor(
        private _http: HttpClient
    ) {
    }

    getDiseasePageable(params: string): Observable<any> {
        return this._http.get(this.GET_DMP_DISEASE_PAGEABLE + '?' + params, this.HTTP_OPTIONS());
    }

    searchDiseasePageable(params: string): Observable<any> {
        return this._http.get(this.SEARCH_DMP_DISEASE_PAGEABLE + '?' + params, this.HTTP_OPTIONS());
    }

    getDiseaseIterable(): Observable<any> {
        return this._http.get(`${this.GET_DMP_DISEASE_ITERABLE}`, this.HTTP_OPTIONS());
    }

    getDisease(id: string): Observable<any> {
        return this._http.get(this.GET_DMP_DISEASE + '/' + id, this.HTTP_OPTIONS());
    }

    createDisease(disease: Disease): Observable<any> {
        return this._http.post(this.CREATE_DMP_DISEASE, disease, this.HTTP_OPTIONS());
    }
    updateDisease(disease: Disease): Observable<any> {
        return this._http.put(this.UPDATE_DMP_DISEASE, disease, this.HTTP_OPTIONS());
    }

    deleteDisease(id: string): Observable<any> {
        return this._http.delete(this.DELETE_DMP_DISEASE + '/' + id, this.HTTP_OPTIONS());
    }

    getDiseaseIterableByIdIn(ids: string[]): Observable<any> {
        return this._http.get(this.GET_DMP_DISEASE_ITERABLE_BY_ID_IN + '/' + ids, this.HTTP_OPTIONS());
    }


}
