import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {ResponseRestApi} from './response';
import {ServiceCommonConstant} from '../../constant/service-common-constant';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OrganizationService {

    private readonly ORGANIZATION = ServiceCommonConstant.adminModuleUrl + '/org';

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

    searchOrganization(params): any {
        return this.http.get(`${this.ORGANIZATION}/search/pageable?${params}`, this.HTTP_OPTIONS());
    }

    getAllOrganizationByUserAccountId(userAccountId: any): any {
        return this.http.get(`${this.ORGANIZATION}/by/userAccountId/${userAccountId}`, this.HTTP_OPTIONS());
    }

    getAllOrganization(): any {
        return this.http.get(`${this.ORGANIZATION}/all`, this.HTTP_OPTIONS());
    }

    getById(id: any): Observable<any> {
        return this.http.get(`${this.ORGANIZATION}/by/${id}`, this.HTTP_OPTIONS());
    }

    saveOrganization(model: any): Observable<any> {
        return this.http.post(`${this.ORGANIZATION}/create`, model, this.HTTP_OPTIONS());
    }

    deleteOrganizationById(id: any): Observable<any> {
        return this.http.delete(`${this.ORGANIZATION}/delete/${id}`, this.HTTP_OPTIONS());
    }
}
