import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {DmpCategory} from '../../../../models/dmp/configuration/dmp-category';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Subject} from 'rxjs';
import {DmpCategoryService} from '../../../services/dmpCategory.service';
import {takeUntil} from 'rxjs/operators';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {DmpCategoryFilter} from '../../../../models/dmp/configuration/dmp-category-filter';

@Component({
    selector: 'app-category-details',
    templateUrl: './category-details.component.html',
    styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent implements OnInit, OnDestroy {
    dialogTitle: string;
    category: DmpCategory;
    filters: DmpCategoryFilter[] = [];

    selectedLanguage: string;

    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';

    private _unsubscribeAll: Subject<any>;

    constructor(
        public _dmpService: DmpCategoryService,
        public matDialogRef: MatDialogRef<CategoryDetailsComponent>,
        public snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.category = this.data.category;
        this.filters = this.data.filters;

        if (this.category.name === undefined || this.category.name === null) {
            this.category.name = {
                kz: null,
                ru: null,
                en: null
            };
        }

        if (this.category.description === undefined || this.category.description === null) {
            this.category.description = {
                kz: null,
                ru: null,
                en: null
            };
        }

        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.dialogTitle = 'Заполните необходимые поля';
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    save(): void {
        if (this.category.id === null || this.category.id === undefined) {
            this._dmpService.createCategory(this.category).pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
                this.category = res;
                this.matDialogRef.close('ok');
                this.displayMessage('Категория успешно создана!');
            }, () => {
                this.displayMessage('Ошибка! Не удалось создать категорию!');
            });
        } else {
            this._dmpService.updateCategory(this.category).pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
                this.category = res;
                this.matDialogRef.close('ok');
                this.displayMessage('Изменения успешно сохранены!');
            }, () => {
                this.displayMessage('Ошибка! Не удалось сохранить изменения!');
            });
        }
    }

    displayMessage(message: string): void {
        this.snackBar.open(message, '', {
            duration: 5000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }


}
