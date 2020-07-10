import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {DmpCategory} from '../../../../models/dmp/configuration/dmp-category';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {Subject} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DmpCategoryService} from '../../../services/dmpCategory.service';
import {ProcedureAndInterventions} from '../../../../models/dmp/configuration/procedureandinterventions';
import {takeUntil} from 'rxjs/operators';
import {DiseaseService} from '../../../services/disease.service';
import {Disease} from '../../../../models/dmp/configuration/disease';
import {ProcedureAndInterventionsService} from '../../../services/procedure-and-interventions.service';

@Component({
    selector: 'app-procedure-and-interventions-details',
    templateUrl: './procedure-and-interventions-details.component.html',
    styleUrls: ['./procedure-and-interventions-details.component.scss']
})
export class ProcedureAndInterventionsDetailsComponent implements OnInit, OnDestroy {
    categories: DmpCategory[] = [];
    diseases: Disease[];
    dialogTitle: string;
    pai: ProcedureAndInterventions;

    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';

    private _unsubscribeAll: Subject<any>;

    constructor(
        public matDialogRef: MatDialogRef<ProcedureAndInterventionsDetailsComponent>,
        public _dmpCategoryService: DmpCategoryService,
        public snackBar: MatSnackBar,
        public _diseaseService: DiseaseService,
        public _paiService: ProcedureAndInterventionsService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {

        this.pai = this.data.pai;

        if (this.pai.name === undefined || this.pai.name === null) {
            this.pai.name = {
                kz: null,
                ru: null,
                en: null
            };
        }

        if (this.pai.description === undefined || this.pai.description === null) {
            this.pai.description = {
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
        this.loadDiseases();
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    loadCategories(): void {
        this._dmpCategoryService.getCategoryIterableByFilter('proceduresAndInterventions')
            .pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
            this.categories = res;
        });
    }

    loadDiseases(): void {
        this._diseaseService.getDiseaseIterable().pipe(takeUntil(this._unsubscribeAll))
            .subscribe((res) => {
                this.diseases = res;
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
        if (this.pai.id === null || this.pai.id === undefined) {
            this._paiService.createProceduresAndInterventions(this.pai)
                .pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
                this.pai = res;
                this.matDialogRef.close('ok');
                this.displayMessage('Процедура и вмещательство успешно создана!');
            }, () => {
                this.displayMessage('Ошибка! Не удалось создать процеду и вмещательство!');
            });
        } else {
            this._paiService.updateProceduresAndInterventions(this.pai)
                .pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
                this.pai = res;
                this.matDialogRef.close('ok');
                this.displayMessage('Изменения успешно сохранены!');
            }, () => {
                this.displayMessage('Ошибка! Не удалось сохранить процедуру и вмещательство!');
            });
        }
    }


}
