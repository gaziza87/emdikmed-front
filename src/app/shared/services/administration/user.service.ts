import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ServiceCommonConstant} from '../../constant/service-common-constant';
import {Observable} from 'rxjs';
import {User} from '../../models/admin/user';
import {UserRoleMapDTO} from '../../models/admin/userRoleMapDTO';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private readonly USERS = ServiceCommonConstant.adminModuleUrl + '/users';
    private readonly USER_ACCOUNTS = ServiceCommonConstant.adminModuleUrl + '/user-account';

    constructor(private http: HttpClient) {
    }

    /** ******************************User service******************************** */
    private readonly HTTP_OPTIONS = function(): any {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token')
            })
        };
    };


    getUsersPageableByIdIn(ids: string[], params): Observable<any> {
        return this.http.post(`${this.USERS}/read/byIdIn?` + params, ids, this.HTTP_OPTIONS());
    }


    getAllUsers(): Observable<any> {
        return this.http.get(`${this.USERS}/`, this.HTTP_OPTIONS());
    }
    getById(id: any): Observable<any> {
        return this.http.get(`${this.USERS}/by/${id}`, this.HTTP_OPTIONS());
    }

    saveUser(model: any): Observable<any> {
        return this.http.post(`${this.USERS}/save`, model, this.HTTP_OPTIONS());
    }

    deleteUserById(id: any): Observable<any> {
        return this.http.delete(`${this.USERS}/delete/${id}`, this.HTTP_OPTIONS());
    }

    /** ******************************User-account service******************************** */

    createUser(userRoleMapDTO: UserRoleMapDTO): Observable<any> {
        return this.http.post(`${this.USER_ACCOUNTS}/create/user`, userRoleMapDTO, this.HTTP_OPTIONS());
    }

    createUserAccountFromUser(user: User): Observable<any> {
        return this.http.post(`${this.USER_ACCOUNTS}/create/from/user`, user, this.HTTP_OPTIONS());
    }


    getAllUsersByParam(params): any {
        return this.http.get(`${this.USER_ACCOUNTS}/read/custom/pageable?${params}`, this.HTTP_OPTIONS());
    }

    searchAllUsersByParam(params): any {
        return this.http.get(`${this.USER_ACCOUNTS}/search/custom/pageable?${params}`, this.HTTP_OPTIONS());
    }

    getUserAccountById(id: string): Observable<any> {
        return this.http.get(`${this.USER_ACCOUNTS}/byId/${id}`, this.HTTP_OPTIONS());
    }

    getDTOByUserAccountId(id: string): Observable<any> {
        return this.http.get(`${this.USER_ACCOUNTS}/dto/byId/${id}`, this.HTTP_OPTIONS());
    }
    searchUsersPageable(params): Observable<any> {
        return this.http.get(`${this.USER_ACCOUNTS}/search/custom/pageable?` + params, this.HTTP_OPTIONS());
    }
    getUsersPageable(params): Observable<any> {
        return this.http.get(`${this.USER_ACCOUNTS}/read/custom/pageable?` + params, this.HTTP_OPTIONS());
    }

    createUserAccount(userAccount): Observable<any> {
        return this.http.post(`${this.USER_ACCOUNTS}/create`, userAccount, this.HTTP_OPTIONS());
    }
}
