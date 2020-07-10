import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Laboratory} from '../../models/dmp/configuration/laboratory';
import {filter} from 'rxjs/operators';

@Injectable()
export class LaboratoryService {
    private readonly GET_DMP_LABORATORY_PAGEABLE = '/emdikmed/core/laboratory/read/laboratory/pageable';
    private readonly SEARCH_DMP_LABORATORY_PAGEABLE = '/emdikmed/core/laboratory/search/laboratory/pageable';
    private readonly GET_DMP_LABORATORY_ITERABLE = '/emdikmed/core/laboratory/read/laboratory/iterable';
    private readonly GET_DMP_CATEGORIZED_LABORATORIES = '/emdikmed/core/laboratory/read/categorized/laboratories';
    private readonly GET_DMP_LABORATORY_BY_CATEGORY = '/emdikmed/core/laboratory/read/laboratory/iterable';
    private readonly GET_DMP_LABORATORY = '/emdikmed/core/laboratory/read/laboratory';
    private readonly CREATE_DMP_LABORATORY = '/emdikmed/core/laboratory/create/laboratory';
    private readonly UPDATE_DMP_LABORATORY = '/emdikmed/core/laboratory/update/laboratory';
    private readonly DELETE_DMP_LABORATORY = '/emdikmed/core/laboratory/delete/laboratory';
    private readonly GET_DMP_LAB_ITERABLE_BY_ID_IN = '/emdikmed/core/laboratory//read/disease/iterable/byIdIn';

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


    getLaboratoryPageable(params: string): Observable<any> {
        return this._http.get(this.GET_DMP_LABORATORY_PAGEABLE + '?' + params, this.HTTP_OPTIONS());
    }

    searchLaboratoryPageable(params: string): Observable<any> {
        return this._http.get(this.SEARCH_DMP_LABORATORY_PAGEABLE + '?' + params, this.HTTP_OPTIONS());
    }

    getLaboratoryIterable(): Observable<any> {
        return this._http.get(this.GET_DMP_LABORATORY_ITERABLE, this.HTTP_OPTIONS());
    }

    getCategorizedLaboratories(): Observable<any> {
        return this._http.get(this.GET_DMP_CATEGORIZED_LABORATORIES, this.HTTP_OPTIONS());
    }

    getLaboratory(id: string): Observable<any> {
        return this._http.get(this.GET_DMP_LABORATORY + '/' + id, this.HTTP_OPTIONS());
    }

    createLaboratory(laboratory: Laboratory): Observable<any> {
        return this._http.post(this.CREATE_DMP_LABORATORY, laboratory, this.HTTP_OPTIONS());
    }

    updateLaboratory(laboratory: Laboratory): Observable<any> {
        return this._http.put(this.UPDATE_DMP_LABORATORY, laboratory, this.HTTP_OPTIONS());
    }

    deleteLaboratory(id: string): Observable<any> {
        return this._http.delete(this.DELETE_DMP_LABORATORY + '/' + id, this.HTTP_OPTIONS());
    }

    getLabIterableByIdIn(ids: string[]): Observable<any> {
        return this._http.get(this.GET_DMP_LAB_ITERABLE_BY_ID_IN + '/' + ids, this.HTTP_OPTIONS());
    }

}
