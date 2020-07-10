import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Protocol} from '../../models/dmp/configuration/protocol';
import {Injectable} from '@angular/core';


@Injectable()
export class ProtocolService {
    private readonly GET_DMP_PROTOCOL_PAGEABLE = '/emdikmed/core/protocol/read/protocol/pageable';
    private readonly GET_DMP_PROTOCOL_ITERABLE = '/emdikmed/core/protocol/read/protocol/iterable';
    private readonly GET_DMP_PROTOCOL = '/emdikmed/core/protocol/read/protocol';
    private readonly CREATE_DMP_PROTOCOL = '/emdikmed/core/protocol/create/protocol';
    private readonly UPDATE_DMP_PROTOCOL = '/emdikmed/core/protocol/update/protocol';
    private readonly DELETE_DMP_PROTOCOL = '/emdikmed/core/protocol/delete/protocol';

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

    getProtocolPageable(params: string): Observable<any> {
        return this._http.get(this.GET_DMP_PROTOCOL_PAGEABLE + '?' + params, this.HTTP_OPTIONS());
    }

    getProtocolIterable(): Observable<any> {
        return this._http.get(this.GET_DMP_PROTOCOL_ITERABLE, this.HTTP_OPTIONS());
    }

    getProtocol(id: string): Observable<any> {
        return this._http.get(this.GET_DMP_PROTOCOL + '/' + id, this.HTTP_OPTIONS());
    }

    createProtocol(protocol: Protocol): Observable<any> {
        return this._http.post(this.CREATE_DMP_PROTOCOL, protocol, this.HTTP_OPTIONS());
    }

    updateProtocol(protocol: Protocol): Observable<any> {
        return this._http.put(this.UPDATE_DMP_PROTOCOL, protocol, this.HTTP_OPTIONS());
    }

    deleteProtocol(id: string): Observable<any> {
        return this._http.delete(this.DELETE_DMP_PROTOCOL + '/' + id, this.HTTP_OPTIONS());
    }

}
