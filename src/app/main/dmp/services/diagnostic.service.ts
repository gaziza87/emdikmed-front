import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Diagnostic} from '../../models/dmp/configuration/diagnostic';


@Injectable()
export class DiagnosticService {

    private readonly GET_DMP_DIAGNOSTIC_PAGEABLE = '/emdikmed/core/diagnostic/read/diagnostics/pageable';
    private readonly SEARCH_DMP_DIAGNOSTIC = '/emdikmed/core/diagnostic/search/diagnostics/pageable';
    private readonly GET_DMP_DIAGNOSTIC_ITERABLE = '/emdikmed/core/diagnostic/read/diagnostics/iterable';
    private readonly GET_DMP_DIAGNOSTIC_ITERABLE_BY_FILTER = '/emdikmed/core/diagnostic/read/diagnostics/iterable';
    private readonly GET_DMP_DIAGNOSTIC = '/emdikmed/core/diagnostic/read/diagnostics';
    private readonly GET_DMP_CATEGORIZED_DIAGNOSTIC = '/emdikmed/core/diagnostic/read/categorized/diagnostics';
    private readonly CREATE_DMP_DIAGNOSTIC = '/emdikmed/core/diagnostic/create/diagnostics';
    private readonly UPDATE_DMP_DIAGNOSTIC = '/emdikmed/core/diagnostic/update/diagnostics';
    private readonly DELETE_DMP_DIAGNOSTIC = '/emdikmed/core/diagnostic/delete/diagnostics';
    private readonly GET_DMP_DIAG_ITERABLE_BY_ID_IN =  '/emdikmed/core/diagnostic/read/disease/iterable/byIdIn';

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

    getDiagnosticPageable(params: string): Observable<any> {
        return this._http.get(this.GET_DMP_DIAGNOSTIC_PAGEABLE + '?' + params, this.HTTP_OPTIONS());
    }

    searchDiagnosticPageable(params: string): Observable<any> {
        return this._http.get(this.SEARCH_DMP_DIAGNOSTIC + '?' + params, this.HTTP_OPTIONS());
    }

    getDiagnosticsIterable(): Observable<any> {
        return this._http.get(this.GET_DMP_DIAGNOSTIC_ITERABLE, this.HTTP_OPTIONS());
    }

    getDiagnostic(id: string): Observable<any> {
        return this._http.get(this.GET_DMP_DIAGNOSTIC + '/' + id, this.HTTP_OPTIONS());
    }

    getCategorizedDiagnostic(): Observable<any> {
        return this._http.get(this.GET_DMP_CATEGORIZED_DIAGNOSTIC, this.HTTP_OPTIONS());
    }

    createDiagnostic(diagnostic: Diagnostic): Observable<any> {
        return this._http.post(this.CREATE_DMP_DIAGNOSTIC, diagnostic, this.HTTP_OPTIONS());
    }

    updateDiagnostic(diagnostic: Diagnostic): Observable<any> {
        return this._http.put(this.UPDATE_DMP_DIAGNOSTIC, diagnostic, this.HTTP_OPTIONS());
    }

    deleteDiagnostic(id: string): Observable<any> {
        return this._http.delete(this.DELETE_DMP_DIAGNOSTIC + '/' + id, this.HTTP_OPTIONS());
    }
    getDiagnosticsByIdIn(ids: string[]): Observable<any> {
        return this._http.get(this.GET_DMP_DIAG_ITERABLE_BY_ID_IN + '/' + ids, this.HTTP_OPTIONS());
    }

}
