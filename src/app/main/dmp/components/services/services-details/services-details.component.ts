import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Services} from '../../../../models/dmp/configuration/services';
import {DmpCategory} from '../../../../models/dmp/configuration/dmp-category';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {Subject} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DmpCategoryService} from '../../../services/dmpCategory.service';
import {MedicationsDetailsComponent} from '../../medications/medications-details/medications-details.component';
import {ServicesService} from '../../../services/services.service';
import {takeUntil} from "rxjs/operators";

@Component({
    selector: 'app-services-details',
    templateUrl: './services-details.component.html',
    styleUrls: ['./services-details.component.scss']
})
export class ServicesDetailsComponent implements OnInit, OnDestroy {
    service: Services;
    categories: DmpCategory[];
    dialogTitle: string;

    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';

    private _unsubscribeAll: Subject<any>;
    constructor(
        public matDialogRef: MatDialogRef<MedicationsDetailsComponent>,
        public _dmpCategoryService: DmpCategoryService,
        public _service: ServicesService,
        public snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.service = this.data.service;

        if (this.service.name === undefined || this.service.name === null) {
            this.service.name = {
                kz: null,
                ru: null,
                en: null
            };
        }

        if (this.service.description === undefined || this.service.description === null) {
            this.service.description = {
                kz: null,
                ru: null,
                en: null
            };
        }
        this._unsubscribeAll = new Subject();

    }

    ngOnInit(): void {
        this.dialogTitle = 'Заполните необходимые поля';
        this.loadCategories();
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    loadCategories(): void {
        this._dmpCategoryService.getCategoryIterableByFilter('services').pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
            this.categories = res;
        });
    }

    displayMessage(message: string): void {
        this.snackBar.open(message, '', {
            duration: 5000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }

    save(): void {
        if (this.service.id === null || this.service.id === undefined) {
            this._service.createServices(this.service).pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
                this.service = res;
                this.matDialogRef.close('ok');
                this.displayMessage('Услуга успешно создана!');
            }, () => {
                this.displayMessage('Ошибка! Не удалось создать услугу!');
            });
        } else {
            this._service.updateService(this.service).pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
                this.service = res;
                this.matDialogRef.close('ok');
                this.displayMessage('Изменения успешно сохранены!');
            }, () => {
                this.displayMessage('Ошибка! Не удалось сохранить услугу!');
            });
        }
    }



}
