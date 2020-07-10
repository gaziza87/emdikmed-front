import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Medication} from '../../../../models/dmp/configuration/medication';
import {DmpCategory} from '../../../../models/dmp/configuration/dmp-category';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {Subject} from 'rxjs';
import {DmpCategoryService} from '../../../services/dmpCategory.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MedicationService} from '../../../services/medication.service';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-medications-details',
    templateUrl: './medications-details.component.html',
    styleUrls: ['./medications-details.component.scss']
})
export class MedicationsDetailsComponent implements OnInit, OnDestroy {
    medication: Medication;
    categories: DmpCategory[] = [];
    dialogTitle: string;

    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';

    private _unsubscribeAll: Subject<any>;
    constructor(
        public matDialogRef: MatDialogRef<MedicationsDetailsComponent>,
        public _medicationService: MedicationService,
        public _dmpCategoryService: DmpCategoryService,
        public snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public data: any

    ) {

        this.medication = this.data.medication;

        if (this.medication.name === undefined || this.medication.name === null) {
            this.medication.name = {
                kz: null,
                ru: null,
                en: null
            };
        }

        if (this.medication.description === undefined || this.medication.description === null) {
            this.medication.description = {
                kz: null,
                ru: null,
                en: null
            };
        }
        this._unsubscribeAll = new Subject();
    }

    loadCategories(): void {
        this._dmpCategoryService.getCategoryIterableByFilter('medication').pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
            this.categories = res;
        });
    }

    ngOnInit(): void {
        this.dialogTitle = 'Заполните необходимые поля';
        this.loadCategories();
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
        if (this.medication.id === null || this.medication.id === undefined) {
            this._medicationService.createMedication(this.medication).pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
                this.medication = res;
                this.matDialogRef.close('ok');
                this.displayMessage('Лаборатория успешно создана!');
            }, () => {
                this.displayMessage('Ошибка! Не удалось создать лабораторию!');
            });
        } else {
            this._medicationService.updateMedication(this.medication).pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
                this.medication = res;
                this.matDialogRef.close('ok');
                this.displayMessage('Изменения успешно сохранены!');
            }, () => {
                this.displayMessage('Ошибка! Не удалось сохранить лабораторию!');
            });
        }
    }

}
