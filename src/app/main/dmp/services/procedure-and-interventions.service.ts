import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ProcedureAndInterventions} from '../../models/dmp/configuration/procedureandinterventions';

@Injectable()
export class ProcedureAndInterventionsService {
    private readonly SEARCH_DMP_PROCEDURE_AND_INTERVENTIONS_PAGEABLE = '/emdikmed/core/procedures-and-interventions/search/procedures-and-interventions/pageable';
    private readonly GET_DMP_PROCEDURE_AND_INTERVENTIONS_PAGEABLE = '/emdikmed/core/procedures-and-interventions/read/procedures-and-interventions/pageable';
    private readonly GET_DMP_PROCEDURE_AND_INTERVENTIONS_ITERABLE = '/emdikmed/core/procedures-and-interventions/read/procedures-and-interventions/iterable';
    private readonly GET_DMP_PROCEDURE_AND_INTERVENTIONS_ITERABLE_BY_FILTER = '/emdikmed/core/procedures-and-interventions/read/procedures-and-interventions/iterable';
    private readonly GET_DMP_CATEGORIZED_PROCEDURE_AND_INTERVENTIONS = '/emdikmed/core/procedures-and-interventions/read/categorized/procedures-and-interventions';
    private readonly GET_DMP_PROCEDURE_AND_INTERVENTIONS = '/emdikmed/core/procedures-and-interventions/read/procedures-and-interventions';
    private readonly CREATE_DMP_PROCEDURE_AND_INTERVENTIONS = '/emdikmed/core/procedures-and-interventions/create/procedures-and-interventions';
    private readonly UPDATE_DMP_PROCEDURE_AND_INTERVENTIONS = '/emdikmed/core/procedures-and-interventions/update/procedures-and-interventions';
    private readonly DELETE_DMP_PROCEDURE_AND_INTERVENTIONS = '/emdikmed/core/procedures-and-interventions/delete/procedures-and-interventions';
    private readonly GET_DMP_PI_ITERABLE_BY_ID_IN =  '/emdikmed/core/procedures-and-interventions/iterable/byIdIn';


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
    getProcedureAndInterventionsPageable(params: string): Observable<any> {
        return this._http.get(this.GET_DMP_PROCEDURE_AND_INTERVENTIONS_PAGEABLE + '?' + params, this.HTTP_OPTIONS());
    }

    searchProcedureAndInterventionsPageable(params: string): Observable<any> {
        return this._http.get(this.SEARCH_DMP_PROCEDURE_AND_INTERVENTIONS_PAGEABLE + '?' + params, this.HTTP_OPTIONS());
    }

    getProceduresAndInterventionsIterable(): Observable<any> {
        return this._http.get(this.GET_DMP_PROCEDURE_AND_INTERVENTIONS_ITERABLE, this.HTTP_OPTIONS());
    }

    getProceduresAndInterventions(id: string): Observable<any> {
        return this._http.get(this.GET_DMP_PROCEDURE_AND_INTERVENTIONS + '/' + id, this.HTTP_OPTIONS());
    }

    getCategorizedProceduresAndInterventions(): Observable<any> {
        return this._http.get(this.GET_DMP_CATEGORIZED_PROCEDURE_AND_INTERVENTIONS, this.HTTP_OPTIONS());
    }

    createProceduresAndInterventions(pai: ProcedureAndInterventions): Observable<any> {
        return this._http.post(this.CREATE_DMP_PROCEDURE_AND_INTERVENTIONS, pai, this.HTTP_OPTIONS());
    }

    updateProceduresAndInterventions(pai: ProcedureAndInterventions): Observable<any> {
        return this._http.put(this.UPDATE_DMP_PROCEDURE_AND_INTERVENTIONS, pai, this.HTTP_OPTIONS());
    }

    deleteProceduresAndInterventions(id: string): Observable<any> {
        return this._http.delete(this.DELETE_DMP_PROCEDURE_AND_INTERVENTIONS + '/' + id, this.HTTP_OPTIONS());
    }

    getProceduresAndInterventionsByIdIn(ids: string[]): Observable<any> {
        return this._http.get(this.GET_DMP_PI_ITERABLE_BY_ID_IN + '/' + ids, this.HTTP_OPTIONS());
    }

}
