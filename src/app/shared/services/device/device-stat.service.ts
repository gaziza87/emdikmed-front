import { Injectable } from '@angular/core';
import {ServiceCommonConstant} from '../../constant/service-common-constant';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceStatService {

  private readonly DEVICE_STAT = ServiceCommonConstant.coreModuleUrl + '/device-stat';
  private readonly DEVICE_STAT_CONFIG = ServiceCommonConstant.coreModuleUrl + '/device-stat-config';

  constructor(
      private http: HttpClient
  ) { }

  private readonly HTTP_OPTIONS = function(): any {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token')
      })
    };
  };


  getLastDeviceStatRecord(userAccountId: string): Observable<any> {
    return this.http.get(this.DEVICE_STAT + '/get/last/' + userAccountId, this.HTTP_OPTIONS());
  }

}
