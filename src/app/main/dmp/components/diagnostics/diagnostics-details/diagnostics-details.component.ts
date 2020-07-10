import {Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Diagnostic} from '../../../../models/dmp/configuration/diagnostic';
import {DiseaseService} from '../../../services/disease.service';
import {DmpCategoryService} from '../../../services/dmpCategory.service';
import {Subject} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {Disease} from '../../../../models/dmp/configuration/disease';
import {DmpCategory} from '../../../../models/dmp/configuration/dmp-category';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {takeUntil} from 'rxjs/operators';
import {DiagnosticService} from '../../../services/diagnostic.service';

@Component({
    selector: 'app-diagnostics-details',
    templateUrl: './diagnostics-details.component.html',
    styleUrls: ['./diagnostics-details.component.scss']
})
export class DiagnosticsDetailsComponent implements OnInit, OnDestroy {
    dialogTitle: string;

    diseases: Disease[] = [];
    categories: DmpCategory[] = [];
    diagnostic: Diagnostic;
    private _unsubscribeAll: Subject<any>;
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        public _diseaseService: DiseaseService,
        public _dmpCategoryService: DmpCategoryService,
        public matDialogRef: MatDialogRef<DiagnosticsDetailsComponent>,
        public snackBar: MatSnackBar,
        public _diagnosticService: DiagnosticService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.diagnostic = this.data.diagnostic;

        if (this.diagnostic.name === undefined || this.diagnostic.name === null) {
            this.diagnostic.name = {
                kz: null,
                ru: null,
                en: null
            };
        }

        if (this.diagnostic.description === undefined || this.diagnostic.description === null) {
            this.diagnostic.description = {
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
        this._dmpCategoryService.getCategoryIterableByFilter('diagnostics').pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
            this.categories = res;
        });
    }

    loadDiseases(): void {
        this._diseaseService.getDiseaseIterable().pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
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
        if (this.diagnostic.id === null || this.diagnostic.id === undefined) {
            this._diagnosticService.createDiagnostic(this.diagnostic).pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
                this.diagnostic = res;
                this.matDialogRef.close('ok');
                this.displayMessage('Диагностика успешно создана!');
            }, () => {
                this.displayMessage('Ошибка! Не удалось создать диагностику!');
            });
        } else {
            this._diagnosticService.updateDiagnostic(this.diagnostic).pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
                this.diagnostic = res;
                this.matDialogRef.close('ok');
                this.displayMessage('Изменения успешно сохранены!');
            }, () => {
                this.displayMessage('Ошибка! Не удалось сохранить диагностику!');
            });
        }
    }


}
