import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Disease} from '../../../../models/dmp/configuration/disease';
import {Subject} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {DiseaseService} from '../../../services/disease.service';
import {takeUntil} from 'rxjs/operators';

import {DmpCategory} from '../../../../models/dmp/configuration/dmp-category';
import {DmpCategoryService} from '../../../services/dmpCategory.service';
import {LaboratoryService} from '../../../services/laboratory.service';
import {Laboratory} from '../../../../models/dmp/configuration/laboratory';
import {Medication} from '../../../../models/dmp/configuration/medication';
import {ProcedureAndInterventions} from '../../../../models/dmp/configuration/procedureandinterventions';
import {ProcedureAndInterventionsService} from '../../../services/procedure-and-interventions.service';
import {DiagnosticService} from '../../../services/diagnostic.service';
import {FormControl} from '@angular/forms';
import {MedicationService} from '../../../services/medication.service';
import {Diagnostic} from '../../../../models/dmp/configuration/diagnostic';


@Component({
    selector: 'app-disease-details',
    templateUrl: './disease-details.component.html',
    styleUrls: ['./disease-details.component.scss']
})
export class DiseaseDetailsComponent implements OnInit, OnDestroy {

    constructor(
        public _diseaseService: DiseaseService,
        public matDialogRef: MatDialogRef<DiseaseDetailsComponent>,
        public snackBar: MatSnackBar,
        public _dmpCategoryService: DmpCategoryService,
        public _laboratoryService: LaboratoryService,
        public _paiService: ProcedureAndInterventionsService,
        public _diagnosticService: DiagnosticService,
        public _medicationService: MedicationService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.disease = this.data.disease;

        if (this.disease.name === undefined || this.disease.name === null) {
            this.disease.name = {
                kz: null,
                ru: null,
                en: null
            };
        }

        if (this.disease.description === undefined || this.disease.description === null) {
            this.disease.description = {
                kz: null,
                ru: null,
                en: null
            };
        }

        if (!this.disease.template) {
            this.disease.template = {};
        }


        this._unsubscribeAll = new Subject();
    }
    dialogTitle: string;
    disease: Disease;
    categories: DmpCategory[] = [];
    links: any[] = [];
    searchString: string;
    selectedLanguage: string;
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';

    laboratories: Laboratory[] = [];
    diagnostics: Diagnostic[] = [];
    proceduresAndInterventions: ProcedureAndInterventions[] = [];
    medicines: Medication[] = [];

    laboratoriesControl = new FormControl();
    categorizedLaboratories: any[] = [];
    changedCategorizedLaboratories: any[] = [];

    proceduresAndInterventionsControl = new FormControl();
    categorizedProceduresAndInterventions: any[] = [];
    changedProceduresAndInterventions: any[] = [];

    diagnosticsControl = new FormControl();
    categorizedDiagnostics: any[] = [];
    changedCategorizedDiagnostics: any[] = [];

    selectedLaboratories: string[] = [];
    selectedDiagnostics: string[] = [];
    selectedProceduresAndInterventions: string[] = [];
    selectedMedicines: string[] = [];

    labOptions: boolean;
    diagOptions: boolean;
    procOptions: boolean;

    showX = false;
    private _unsubscribeAll: Subject<any>;

    load;

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    ngOnInit(): void {
        this.dialogTitle = 'Заполните необходимые поля';
        this.loadCategories();
        this.loadCategorizedLaboratories();
        this.loadCategorizedProceduresAndInterventions();
        this.loadCategorizedDiagnostics();

    }

    displayMessage(message: string): void {
        this.snackBar.open(message, '', {
            duration: 5000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }

    loadCategories(): void {
        this._dmpCategoryService.getCategoryIterableByFilter('diseases').pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
            this.categories = res;
        });
    }

    loadCategorizedLaboratories(): void {
        this._laboratoryService.getCategorizedLaboratories().pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
            this.categorizedLaboratories = res;
        });
    }

    loadCategorizedProceduresAndInterventions(): void {
        this._paiService.getCategorizedProceduresAndInterventions().pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
            this.categorizedProceduresAndInterventions = res;
        });
    }

    loadCategorizedDiagnostics(): void {
        this._diagnosticService.getCategorizedDiagnostic().pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
            this.categorizedDiagnostics = res;
        });
    }

    loadLaboratoriesByCategoryId(group): void {
        this.changedCategorizedLaboratories = [];
        this.changedCategorizedLaboratories.push(group);
    }

    loadProceduresAndInterventionsByCategoryId(group): void {
        this.changedProceduresAndInterventions = [];
        this.changedProceduresAndInterventions.push(group);
    }

    loadDiagnosticsByCategoryId(group): void {
        this.changedCategorizedDiagnostics = [];
        this.changedCategorizedDiagnostics.push(group);
    }



    searchLaboratories(): void {
        const params = 'searchString=' + this.searchString + '&size=' + 50;
        this._laboratoryService.searchLaboratoryPageable(params).pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
            this.laboratories = res.content;
        });
    }

    SearchDiagnostics(): void {
        const params = 'searchString=' + this.searchString + '&size=' + 50;
        this._diagnosticService.searchDiagnosticPageable(params).pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
            this.diagnostics = res.content;
        });
    }

    searchProceduresAndInterventions(): void {
        const params = 'searchString=' + this.searchString + '&size=' + 50;
        this._paiService.searchProcedureAndInterventionsPageable(params).pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
            this.proceduresAndInterventions = res.content;
        });
    }

    searchMedication(): void {
        const params = 'searchString=' + this.searchString + '&size=' + 50;
        this._medicationService.searchMedicationPageable(params).pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
            this.medicines = res.content;
        });

    }

    save(): void {
        if (this.disease.id === null || this.disease.id === undefined) {
            this._diseaseService.createDisease(this.disease).pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
                this.disease = res;
                this.matDialogRef.close('ok');
                this.displayMessage('Заболевание успешно создана!');
            }, () => {
                this.displayMessage('Ошибка! Не удалось создать забалевание!');
            });
        } else {
            this._diseaseService.updateDisease(this.disease).pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
                this.disease = res;
                this.matDialogRef.close('ok');
                this.displayMessage('Изменения успешно сохранены!');
            }, () => {
                this.displayMessage('Ошибка! Не удалось сохранить изменения!');
            });
        }
    }

    checkKeyup(searchString): void {
        if (searchString.length > 0) {
            this.showX = true;
        } else {
            this.showX = false;
        }
    }

    selections(objects: string[], type: string): void {
        console.log('event', objects);
        for (let i = 0; i < objects.length; i++) {
            switch (type) {
                case 'Laboratory':
                    this.disease.template.labAnalysText = ''
                    if (!this.selectedLaboratories.includes(objects[i])) {
                        this.selectedLaboratories.push(objects[i]);
                        this._laboratoryService.getLaboratory(objects[i])
                            .pipe(takeUntil(this._unsubscribeAll)).subscribe((res: Laboratory) => {
                            this.disease.template.labAnalysText += res.name.ru + '\n';
                            console.log(this.disease.template, '----------');
                        });
                    }
                    break;
                case 'Diagnostics':
                    this.disease.template.diagMethodsText = ''
                    if (!this.selectedDiagnostics.includes(objects[i])) {
                        this.selectedDiagnostics.push(objects[i]);
                        this._diagnosticService.getDiagnostic(objects[i])
                            .pipe(takeUntil(this._unsubscribeAll)).subscribe((res: Laboratory) => {
                            this.disease.template.diagMethodsText += res.name.ru + '\n';
                        });
                    }
                    break;
                case 'ProceduresAndInterventions':
                    this.disease.template.procAndInterText = ''
                    if (!this.selectedProceduresAndInterventions.includes(objects[i])) {
                        this.selectedProceduresAndInterventions.push(objects[i]);
                        this._paiService.getProceduresAndInterventions(objects[i])
                            .pipe(takeUntil(this._unsubscribeAll)).subscribe((res: Laboratory) => {
                            this.disease.template.procAndInterText += res.name.ru + '\n';
                        });
                    }
                    break;
                case 'Medicine':
                    if (!this.selectedMedicines.includes(objects[i])) {
                        this.selectedMedicines.push(objects[i]);
                        // this.disease.template.lekNaznText += objects[i].name + '\n';
                    }
                    break;
            }
        }
        if (type === 'Laboratory') {
            const actualLaboratories = [];
            for (let i = 0; i < this.selectedLaboratories.length; i++) {
                for (let j = 0; j < objects.length; j++) {
                    if (this.selectedLaboratories[i] === objects[j]) {
                        actualLaboratories.push(this.selectedLaboratories[i]);
                    }
                }
            }
            this.laboratories = actualLaboratories;
        }
    }

    select(object: any, type: string): void {
        switch (type) {
            case 'Laboratory':
                if (!this.selectedLaboratories.includes(object.id)) {
                    this.selectedLaboratories.push(object.id);
                    this.disease.template.labAnalysText += object.name.ru + '\n';
                }
                break;
            case 'Diagnostics':
                if (!this.selectedDiagnostics.includes(object.id)) {
                    this.selectedDiagnostics.push(object.id);
                    this.disease.template.diagMethodsText += object.name.ru + '\n';
                }
                break;
            case 'ProceduresAndInterventions':
                if (!this.selectedProceduresAndInterventions.includes(object.id)) {
                    this.selectedProceduresAndInterventions.push(object.id);
                    this.disease.template.procAndInterText += object.name.ru + '\n';
                }
                break;
            case 'Medicine':
                if (!this.selectedMedicines.includes(object.id)) {
                    this.selectedMedicines.push(object.id);
                    this.disease.template.lekNaznText += object.name.ru + '\n';
                }
                break;
        }
    }

    deselect(object: any, type: string): void {
        switch (type) {
            case 'Laboratory':
                this.selectedLaboratories.splice(this.selectedLaboratories.indexOf(object.id), 1);
                this.disease.template.labAnalysText = this.disease.template.labAnalysText.replace(object.name, '');
                break;
            case 'Diagnostics':
                this.selectedDiagnostics.splice(this.selectedDiagnostics.indexOf(object.id), 1);
                this.disease.template.diagMethodsText = this.disease.template.diagMethodsText.replace(object.name, '');
                break;
            case 'ProceduresAndInterventions':
                this.selectedProceduresAndInterventions.splice(this.selectedProceduresAndInterventions.indexOf(object.id), 1);
                this.disease.template.procAndInterText = this.disease.template.procAndInterText.replace(object.name, '');
                break;
            case 'Medicine':
                this.selectedMedicines.splice(this.selectedMedicines.indexOf(object.id), 1);
                this.disease.template.lekNaznText = this.disease.template.lekNaznText.replace(object.name, '');
                break;
        }
    }




}
