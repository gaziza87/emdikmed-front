import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {DmpCategory} from '../../models/dmp/configuration/dmp-category';

@Injectable()
export class DmpCategoryService {

    private readonly GET_DMP_DMPCATEGORY_PAGEABLE = '/emdikmed/core/dmpCategory/read/category/pageable';
    private readonly SEARCH_DMP_DMPCATEGORY_PAGEABLE = '/emdikmed/core/dmpCategory/search/category/pageable';
    private readonly GET_DMP_DMPCATEGORY_ITERABLE = '/emdikmed/core/dmpCategory/read/category/iterable';
    private readonly GET_DMP_DMPCATEGORY = '/emdikmed/core/dmpCategory/read/category';
    private readonly GET_DMP_CATEGORY_FILTER_ITERABLE = '/emdikmed/core/dmpCategory/read/category/iterable/byFilter';
    private readonly CREATE_DMP_DMPCATEGORY = '/emdikmed/core/dmpCategory/create/category';
    private readonly UPDATE_DMP_DMPCATEGORY = '/emdikmed/core/dmpCategory/update/category';
    private readonly DELETE_DMP_DMPCATEGORY = '/emdikmed/core/dmpCategory/delete/category';
    private readonly GET_DMP_FILTERS = '/emdikmed/core/category-filter/read/filters';

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

    getFilters(): Observable<any> {
        return this._http.get(this.GET_DMP_FILTERS, this.HTTP_OPTIONS());
    }

    searchCategoryPageable(params: string): Observable<any> {
        return this._http.get(this.SEARCH_DMP_DMPCATEGORY_PAGEABLE + '?' + params, this.HTTP_OPTIONS());
    }

    getCategoryIterable(): Observable<any> {
        return this._http.get(this.GET_DMP_DMPCATEGORY_ITERABLE, this.HTTP_OPTIONS());
    }

    getCategoryPageable(params: string): Observable<any> {
        return this._http.get(this.GET_DMP_DMPCATEGORY_PAGEABLE + '?' + params, this.HTTP_OPTIONS());
    }

    getCategoryIterableByFilter(filter: string): Observable<any> {
        return this._http.get(this.GET_DMP_CATEGORY_FILTER_ITERABLE + '/' + filter, this.HTTP_OPTIONS());
    }

    getCategory(id: string): Observable<any> {
        return this._http.get(this.GET_DMP_DMPCATEGORY + '/' + id, this.HTTP_OPTIONS());
    }

    createCategory(category: DmpCategory): Observable<any> {
        return this._http.post(this.CREATE_DMP_DMPCATEGORY, category, this.HTTP_OPTIONS());
    }

    updateCategory(category: DmpCategory): Observable<any> {
        return this._http.put(this.UPDATE_DMP_DMPCATEGORY, category, this.HTTP_OPTIONS());
    }

    deleteCategory(id: string): Observable <any> {
        return this._http.delete(this.DELETE_DMP_DMPCATEGORY + '/' + id, this.HTTP_OPTIONS());
    }
}
