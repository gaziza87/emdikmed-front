import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {VisitContent} from '../../models/dmp/visit/visitContent';

@Injectable()
export class VisitContentService {
    private readonly UPDATE_VISIT_CONTENT = '/emdikmed/core/visit-content/update';
    private readonly UPDATE_AFTER_SELECTION_VISIT_CONTENT = '/emdikmed/core/visit-content/disease/selection';
    private readonly CREATE_VISIT_CONTENT = '/emdikmed/core/visit-content/create';
    private readonly GET_VISIT_CONTENT_BY_ID = '/emdikmed/core/visit-content';

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
    updateVisitContent(visitContent: VisitContent): Observable<any> {
        return this._http.put(this.UPDATE_VISIT_CONTENT, visitContent, this.HTTP_OPTIONS());
    }
    createVisitContent(visitContent: VisitContent): Observable<any> {
        return this._http.post(this.CREATE_VISIT_CONTENT, visitContent, this.HTTP_OPTIONS());
    }
    getVisitContentById(id: string): Observable<any> {
        return this._http.get(this.GET_VISIT_CONTENT_BY_ID + '/read/' + id, this.HTTP_OPTIONS());
    }

    update2AfterDiseaseSelection(visitContent: VisitContent): Observable<any> {
        return this._http.put(this.UPDATE_AFTER_SELECTION_VISIT_CONTENT, visitContent, this.HTTP_OPTIONS());
    }
}
