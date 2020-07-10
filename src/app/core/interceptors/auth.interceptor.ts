import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {shareReplay} from 'rxjs/operators';
import {AuthService} from '../../auth/service/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private _router: Router,
        private _authService: AuthService
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = localStorage.getItem('token');
        let cloneReq;

        if (token) {
            cloneReq = req.clone( {
                headers: req.headers.set('Authorization', token)
            });
        }

        const hanlder: Observable<any> = next.handle(token ? cloneReq : req).pipe(shareReplay());

        hanlder.toPromise().then().catch(event => {
            if (event instanceof HttpErrorResponse && event.status === 401) {
                this._authService.logout();
            }
        });

        return hanlder;
    }

}
