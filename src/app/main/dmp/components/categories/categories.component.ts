import {Component, Input, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DmpCategoryService} from '../../services/dmpCategory.service';
import {Category} from '../../../dashboard/patient-detail/laboratory/filter-category.model';
import {CategoryDetailsComponent} from './category-details/category-details.component';
import {DmpCategoryFilter} from '../../../models/dmp/configuration/dmp-category-filter';
import {DmpCategory} from '../../../models/dmp/configuration/dmp-category';
import {MatPaginator} from '@angular/material/paginator';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {DeleteConfirmationComponent} from '../../utils/delete-confirmation/delete-confirmation.component';


@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {
    displayedColumns = ['code', 'name', 'description', 'action'];
    categories: DmpCategory[] = [];
    initialCategories: any;
    selectedCategory: DmpCategory;
    filters: DmpCategoryFilter[] = [];
    selectedFilter: DmpCategoryFilter;
    globalLoading: boolean;
    showClearIcon = false;

    items: string;
    page: string;

    pageItemCount: any[];
    paginationTotalElements: any;
    paginationRows: any;


    @Input() searchString: string;
    @Input() isAdmin: boolean;
    singletonList: any[];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    private _unsubscribeAll: Subject<any>;

    constructor(
        public _matDialog: MatDialog,
        public _dmpService: DmpCategoryService
    ) {
        this._unsubscribeAll = new Subject<any>();
    }

    ngOnInit(): void {
        this.globalLoading = true;
        this.pageItemCount = [
            5, 10, 15, 50, 100
        ];
        this.getCategoryFilters();
        console.log(this.categories);
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    onFilterChanged(): void {
        this.loadCategories();
    }

    getCategoryFilters(): void {
        this._dmpService.getFilters().pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
            this.filters = res;
            console.log(this.filters);
        });
    }


    loadCategories(): void {
        this.globalLoading = true;
        const params = 'filter=' + this.selectedFilter + '&page=' + 0;
        this._dmpService.getCategoryPageable(params).pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
            this.categories = res.content;
            this.initialCategories = res;
            this.paginationTotalElements = parseInt(res.total);
            this.paginationRows = parseInt(res.pageable.size);
            this.globalLoading = false;
        });
    }

    changeTableList(event): void {
        this.globalLoading = true;
        const params = 'page=' + event.pageIndex + '&size=' + event.pageSize + '&filter=' + this.selectedFilter;
        this._dmpService.getCategoryPageable(params).subscribe(res => {
            this.categories = res.content;
            this.initialCategories = res;
            this.paginationTotalElements = parseInt(res.total);
            this.paginationRows = parseInt(res.pageable.size);
            this.globalLoading = false;
        });
    }

    checkFilterData(): void {
        console.log(this.searchString);
        if (this.searchString.length > 0) {
            this.showClearIcon = true;
        } else {
            this.showClearIcon = false;
            this.categories = this.initialCategories.content;
            this.paginationTotalElements = parseInt(this.initialCategories.total);
            this.paginationRows = parseInt(this.initialCategories.pageable.size);
        }
    }

    reload(): void {
        this.categories = this.initialCategories.content;
        this.paginationTotalElements = parseInt(this.initialCategories.total);
        this.paginationRows = parseInt(this.initialCategories.pageable.size);
        this.showClearIcon = false;
        this.searchString = '';
    }

    openCategory(id: string): void {
        let dialogRef = null;

        if (id === null) {
            dialogRef = this._matDialog.open(CategoryDetailsComponent, {
                panelClass: 'app-category-details',
                height: '600px',
                width: '800px',
                data: {
                    category: new Category(),
                    filters: this.filters
                }
            });
            dialogRef.afterClosed().subscribe((result) => {
                if (result !== undefined && result !== null) {
                    this.loadCategories();
                }
            });
        } else {
            this._dmpService.getCategory(id).pipe(takeUntil(this._unsubscribeAll)).subscribe((category) => {
                dialogRef = this._matDialog.open(CategoryDetailsComponent, {
                    panelClass: 'app-category-details',
                    height: '600px',
                    width: '800px',
                    data: {
                        category,
                        filters: this.filters
                    }
                });
                dialogRef.afterClosed().subscribe((result) => {
                    if (result !== undefined && result !== null) {
                        this.loadCategories();
                    }
                });

            });

        }

    }

    deactivate(id: string): void {
        const dialogRef = this._matDialog.open(DeleteConfirmationComponent, {
            panelClass: 'app-delete-confirmation',
            data: {}
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result !== undefined && result !== null) {
                this._dmpService.deleteCategory(id).pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
                    this.loadCategories();
                });
            } else {
                console.log('Just closed');
            }
        });

    }


}
