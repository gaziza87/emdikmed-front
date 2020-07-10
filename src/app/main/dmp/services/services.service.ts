import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Services} from '../../models/dmp/configuration/services';

@Injectable()
export class ServicesService {
    private readonly GET_DMP_SERVICES_PAGEABLE = '/emdikmed/core/services/read/services/pageable';
    private readonly GET_DMP_SERVICES_ITERABLE = '/emdikmed/core/services/read/services';
    private readonly GET_DMP_SERVICES = '/emdikmed/core/services/read/services';
    private readonly CREATE_DMP_SERVICE = '/emdikmed/core/services/create/services';
    private readonly UPDATE_DMP_SERVICE = '/emdikmed/core/services/update/services';
    private readonly DELETE_DMP_SERVICE = '/emdikmed/core/services/delete/services';

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

    getServicesPageable(params: string): Observable<any> {
        return this._http.get(this.GET_DMP_SERVICES_PAGEABLE + '?' + params, this.HTTP_OPTIONS());
    }

    getServicesIterable(): Observable<any> {
        return this._http.get(this.GET_DMP_SERVICES_ITERABLE, this.HTTP_OPTIONS());
    }

    getServices(id: string): Observable<any> {
        return this._http.get(this.GET_DMP_SERVICES + '/' + id, this.HTTP_OPTIONS());
    }

    createServices(service: Services): Observable<any> {
        return this._http.post(this.CREATE_DMP_SERVICE, service, this.HTTP_OPTIONS());
    }

    updateService(service: Services): Observable<any> {
        return this._http.put(this.UPDATE_DMP_SERVICE, service, this.HTTP_OPTIONS());
    }

    deleteServices(id: string): Observable<any> {
        return this._http.delete(this.DELETE_DMP_SERVICE + '/' + id, this.HTTP_OPTIONS());
    }
}
