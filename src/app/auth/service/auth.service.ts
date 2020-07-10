import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {ServiceCommonConstant} from '../../shared/constant/service-common-constant';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private readonly AUTH_CONTROLLER = ServiceCommonConstant.gatewayModuleUrl;

    private readonly AUTH_API = {
        LOGIN: this.AUTH_CONTROLLER + '/signIn',
        LOGOUT: this.AUTH_CONTROLLER + '/signOut'
    };

    // tslint:disable-next-line:only-arrow-functions
    private readonly HTTP_OPTIONS = function(): any {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token')
            })
        };
    };

    constructor(
        private http: HttpClient,
        private router: Router
    ) {
    }

    login(username: string, password: string): Observable<any> {
        const request = {
            username,
            password
        };
        // const authData = new FormData();
        // authData.append('username', username);
        // authData.append('password', password);
        return this.http.post(this.AUTH_API.LOGIN, request);
    }

    logout(): void {
        const token = localStorage.getItem('token');
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        localStorage.removeItem('roles');
        this.router.navigate(['/auth']);
    }

}
