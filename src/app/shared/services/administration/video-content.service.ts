import {Injectable} from '@angular/core';
import {Observable, pipe} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {ResponseRestApi} from './response';
import {ServiceCommonConstant} from '../../constant/service-common-constant';

@Injectable({
    providedIn: 'root'
})
export class VideoContentService {

    private readonly VIDEO_CONTENT = ServiceCommonConstant.adminModuleUrl + '/video';

    constructor(private http: HttpClient) {
    }

    private readonly HTTP_OPTIONS = function (): any {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token')
            })
        };
    };

    saveVideoContent(model: any): Observable<any> {
        return this.http.post(`${this.VIDEO_CONTENT}/create`, model, this.HTTP_OPTIONS());
    }

    getAllVideoContentByDiseaseIds(diseaseIds): any {
        return this.http.get(`${this.VIDEO_CONTENT}/all${diseaseIds}`, this.HTTP_OPTIONS());
    }

    getAllVideoContent(): Observable<any> {
        return this.http.get(`${this.VIDEO_CONTENT}/all`, this.HTTP_OPTIONS());
    }

    uploadFile(file): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                Authorization: localStorage.getItem('token'),
            })
        };
        return this.http.post(`${this.VIDEO_CONTENT}/upload/file`, file, httpOptions);
    }

    downloadFile(id): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                Authorization: localStorage.getItem('token'),
            })
        };
        return this.http.get(`${this.VIDEO_CONTENT}/test/${id}`, httpOptions);
    }

    deleteFile(id): Observable<any> {
        return this.http.delete(`${this.VIDEO_CONTENT}/delete/file/${id}`, this.HTTP_OPTIONS());
    }

    deleteVideoContent(id): Observable<any> {
        return this.http.get(`${this.VIDEO_CONTENT}/delete/${id}`, this.HTTP_OPTIONS());
    }


}
