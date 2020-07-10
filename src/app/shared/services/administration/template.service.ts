import { Injectable } from '@angular/core';
import {ServiceCommonConstant} from '../../constant/service-common-constant';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  private readonly TEMPLATE = ServiceCommonConstant.adminModuleUrl + '/template';

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

  searchTemplateByParams(params): any {
    return this.http.get(`${this.TEMPLATE}/search/pageable?${params}`, this.HTTP_OPTIONS());
  }

  getAllTemplate(): any {
    return this.http.get(`${this.TEMPLATE}/all`, this.HTTP_OPTIONS());
  }

  getById(id: any): Observable<any> {
    return this.http.get(`${this.TEMPLATE}/by/${id}`, this.HTTP_OPTIONS());
  }

  saveTemplate(model: any): Observable<any> {
    return this.http.post(`${this.TEMPLATE}/save`, model, this.HTTP_OPTIONS());
  }

  deleteTemplateById(id: any): Observable<any> {
    return this.http.delete(`${this.TEMPLATE}/delete/${id}`, this.HTTP_OPTIONS());
  }
}
