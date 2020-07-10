import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {DiseaseService} from '../../../services/disease.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {DmpCategoryService} from '../../../services/dmpCategory.service';
import {Laboratory} from '../../../../models/dmp/configuration/laboratory';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {LaboratoryService} from '../../../services/laboratory.service';
import {DmpCategory} from '../../../../models/dmp/configuration/dmp-category';
import {Disease} from '../../../../models/dmp/configuration/disease';

@Component({
    selector: 'app-laboratory-details',
    templateUrl: './laboratory-details.component.html',
    styleUrls: ['./laboratory-details.component.scss']
})
export class LaboratoryDetailsComponent implements OnInit, OnDestroy {

    dialogTitle: string;
    laboratory: Laboratory;
    diseases: Disease[] = [];
    categories: DmpCategory[] = [];
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';

    private _unsubscribeAll: Subject<any>;

    constructor(public _diseaseService: DiseaseService,
                public _laboratoryService: LaboratoryService,
                public matDialogRef: MatDialogRef<LaboratoryDetailsComponent>,
                public snackBar: MatSnackBar,
                public _dmpCategoryService: DmpCategoryService,
                @Inject(MAT_DIALOG_DATA) public data: any) {
        this.laboratory = this.data.laboratory;

        if (this.laboratory.name === undefined || this.laboratory.name === null) {
            this.laboratory.name = {
                kz: null,
                ru: null,
                en: null
            };
        }

        if (this.laboratory.description === undefined || this.laboratory.description === null) {
            this.laboratory.description = {
                kz: null,
                ru: null,
                en: null
            };
        }
        this._unsubscribeAll = new Subject();

    }

    loadCategories(): void {
        this._dmpCategoryService.getCategoryIterableByFilter('laboratory').pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
            this.categories = res;
        });
    }

    loadDiseases(): void {
        this._diseaseService.getDiseaseIterable().pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
            this.diseases = res;
        });
    }

    ngOnInit(): void {
        this.dialogTitle = 'Заполните необходимые поля';
        this.loadCategories();
        this.loadDiseases();

    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    displayMessage(message: string): void {
        this.snackBar.open(message, '', {
            duration: 5000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }

    save(): void {
        if (this.laboratory.id === null || this.laboratory.id === undefined) {
            this._laboratoryService.createLaboratory(this.laboratory).pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
                this.laboratory = res;
                this.matDialogRef.close('ok');
                this.displayMessage('Лаборатория успешно создана!');
            }, () => {
                this.displayMessage('Ошибка! Не удалось создать лабораторию!');
            });
        } else {
            this._laboratoryService.updateLaboratory(this.laboratory).pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
                this.laboratory = res;
                this.matDialogRef.close('ok');
                this.displayMessage('Изменения успешно сохранены!');
            }, () => {
                this.displayMessage('Ошибка! Не удалось сохранить лабораторию!');
            });
        }
    }

}
