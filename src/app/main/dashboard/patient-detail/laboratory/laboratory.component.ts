import {Component, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {takeUntil} from 'rxjs/operators';
import {DmpCategoryService} from '../../../dmp/services/dmpCategory.service';
import {Subject} from 'rxjs';
import {DmpCategory} from '../../../models/dmp/configuration/dmp-category';
import {ProcedureAndInterventionsService} from '../../../dmp/services/procedure-and-interventions.service';
import {MedicationService} from '../../../dmp/services/medication.service';
import {LaboratoryService} from '../../../dmp/services/laboratory.service';
import {DiseaseService} from '../../../dmp/services/disease.service';
import {DiagnosticService} from '../../../dmp/services/diagnostic.service';
import {SelectionModel} from '@angular/cdk/collections';
import {PeriodicElement} from '../../../dmp/dmp.component';

@Component({
    selector: 'app-laboratory',
    templateUrl: './laboratory.component.html',
    styleUrls: ['./laboratory.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LaboratoryComponent implements OnInit, OnDestroy {

    dialogTitle = '';
    displayedColumns: string[] = ['select', 'code', 'name', 'description'];
    categories: DmpCategory[] = [];
    selectedCategoryId: string;

    dataSource: any[] = [];

    pageItemCount: any[];
    paginationTotalElements: any;
    paginationRows: any;
    pageIndex = 0;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    selection = new SelectionModel<PeriodicElement>(true, []);
    selectedIds = [];

    private _unsubscribeAll: Subject<any>;

    constructor(
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<LaboratoryComponent>,
        public _dmpService: DmpCategoryService,
        public _paiService: ProcedureAndInterventionsService,
        public _medicationService: MedicationService,
        public _laboratoryService: LaboratoryService,
        public _diseaseService: DiseaseService,
        public _diagnosticService: DiagnosticService,
        @Inject(MAT_DIALOG_DATA) public _data: any,
    ) {

        this._unsubscribeAll = new Subject();
    }


    ngOnInit(): void {
        this.dialogTitle = 'Справочники';
        this.initSelection();
        this.loadCategories();

    }

    ngOnDestroy(): void {
    }

    loadCategories(): void {
        this._dmpService.getCategoryIterableByFilter(this._data.filter).pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
            this.categories = res;
        });
    }

    initSelection(): void {
        let selectedList;
        if (!this._data.isNew) {

            this.displayedColumns = ['select', 'name', 'description'];
            switch (this._data.filter) {
                case 'illness':
                    selectedList = this._data.visit.selectedDiseaseIds;
                    this.selectedIds = selectedList !== undefined && selectedList !== null ? selectedList : [];
                    this.loadCategories();
                    break;
                case 'laboratory':
                    selectedList = this._data.visit.selectedLaboratoryIds;
                    this.selectedIds = selectedList !== undefined && selectedList !== null ? selectedList : [];
                    this.loadCategories();
                    break;
                case 'diagnostics':
                    selectedList = this._data.visit.selectedDiagnosticIds;
                    this.selectedIds = selectedList !== undefined && selectedList !== null ? selectedList : [];
                    this.loadCategories();
                    break;
                case 'pills':
                    selectedList = this._data.visit.selectedMedicineIds;
                    this.selectedIds = selectedList !== undefined && selectedList !== null ? selectedList : [];
                    this.loadCategories();
                    break;
                case 'proceduresAndInterventions':
                    selectedList = this._data.visit.selectedProceduresAndInterventionsIds;
                    this.selectedIds = selectedList !== undefined && selectedList !== null ? selectedList : [];
                    this.loadCategories();
                    break;
                case 'protocols':
                    // list = await this.dmpService.get();
                    this.displayedColumns = ['name', 'description'];
                    selectedList = this._data.visit.selectedDiseaseIds;
                    this.selectedIds = selectedList !== undefined && selectedList !== null ? selectedList : [];
                    this.loadCategories();
                    break;
            }
        }
    }

    async loadTableDataByCategory(): Promise<any> {
        let response;
        const params = 'categoryId=' + this.selectedCategoryId;
        if (!this.selectedCategoryId) {
            /*  this.initSelection();*/
            /*       this.handleFilterCategory();*/
        } else {
            switch (this._data.filter) {
                case 'diseases':
                    response = await this._diseaseService.getDiseasePageable(params).toPromise();
                    break;
                case 'laboratory':
                    response = await this._laboratoryService.getLaboratoryPageable(params).toPromise();
                    break;
                case 'diagnostics':
                    response = await this._diagnosticService.getDiagnosticPageable(params).toPromise();
                    break;
                case 'medication':
                    response = await this._medicationService.getMedicationPageable(params).toPromise();
                    break;
                case 'proceduresAndInterventions':
                    response = await this._paiService.getProcedureAndInterventionsPageable(params).toPromise();
                    break;
                case 'protocols':
                    // list = await this.dmpService.get();
                    break;

            }
        }
        if (response) {
            this.dataSource = response.content;
            // this.originList = response;
            this.paginationTotalElements = parseInt(response.total);
            this.paginationRows = parseInt(response.pageable.size);
            this.pageIndex = response.pageable.page;
        }
    }

    toggleToSelected(row: any, event): void {
        console.log(event);
        this.selection.toggle(row);
        if (event && event.checked) {
            this.selectedIds.push(row.id);
        } else {
            this.selectedIds.splice(this.selectedIds.indexOf(row.id), 1);
        }
    }

    selectedOrNot(rowId: string): boolean {
        let selected = false;
        this.selectedIds.forEach(val => {
            if (val === rowId) {
                selected = true;
            }
        });
        return selected;
    }

    isAllSelected(): any {
        if (this.dataSource) {
            const numSelected = this.selection.selected.length;
            const numRows = this.dataSource.length;
            return numSelected === numRows;
        }
    }

    checkboxLabel(row?: PeriodicElement): string {
        if (!row) {
            return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
    }

    trackById(index, item): any {
        return item.id;
    }

    close(): void {
        console.log(this._data);
        console.log(this._data.filter);
        console.log(this._data.filter);
        switch (this._data.filter) {
            case 'diseases':
                this._data.visit.selectedDiseaseIds = this.selectedIds;
                break;
            case 'laboratory':
                this._data.visit.selectedLaboratoryIds = this.selectedIds;
                break;
            case 'diagnostics':
                this._data.visit.selectedDiagnosticIds = this.selectedIds;
                break;
            case 'pills':
                this._data.visit.selectedMedicineIds = this.selectedIds;
                break;
            case 'proceduresAndInterventions':
                this._data.visit.selectedProceduresAndInterventionsIds = this.selectedIds;
                break;
            case 'protocols':
                // list = await this.dmpService.get();
                break;
        }

        // console.log('nextVisitDate', this._data.dmpV2.nextVisitDate);

        // if (this._data.dmpV2.nextVisitDate !== undefined
        // && this._data.dmpV2.nextVisitDate !== null && this._data.dmpV2.nextVisitDate.date !== undefined) {
        //     this._data.dmpV2.nextVisitDate = this.dateParser.parseToDate(this._data.dmpV2.nextVisitDate.date);
        // }

        // console.log('nextVisitDate', this._data.visit.nextVisitDate);

        console.log('last', this._data.visit);

        this.dialogRef.close(this._data.visit);

    }

    /*async handleFilterCategory(event?): Promise<any> {
        let response;
        let params = '';
        if (event) {
            params = 'page=' + event.pageIndex + '&size=' + event.pageSize;
            if (this.selectedCategoryId !== null && this.selectedCategoryId !== undefined) {
                params += '&categoryId=' + this.selectedCategoryId;
            }
        }
        if (this.searchString !== null && this.searchString !== undefined) {
            if (this.searchString.length > 0) {
                params += '&searchString=' + this.searchString;
                switch (this._data.filter) {
                    case 'illness':
                        response = await this._diseaseService.searchDiseasePageable(params).toPromise();
                        break;
                    case 'laboratory':
                        response = await this._laboratoryService.searchLaboratoryPageable(params).toPromise();
                        break;
                    case 'diagnostics':
                        response = await this._diagnosticService.searchDiagnosticPageable(params).toPromise();
                        break;
                    case 'pills':
                        response = await this._medicationService.searchMedicationPageable(params).toPromise();
                        break;
                    case 'proceduresAndInterventions':
                        response = await this._paiService.searchProcedureAndInterventionsPageable(params).toPromise();
                        break;
                    case 'protocols':
                        // list = await this.dmpService.get();
                        break;
                }
                if (response) {
                    this.list = response.content;
                    this.paginationTotalElements = parseInt(response.total);
                    this.paginationRows = parseInt(response.pageable.size);
                    this.pageIndex = response.pageable.page;
                }
            } else {
                this.restoreSearch();
            }
        } else {
            switch (this._data.filter) {
                case 'illness':
                    response = await this._diseaseService.getDiseasePageable(params).toPromise();
                    break;
                case 'laboratory':
                    response = await this._laboratoryService.getLaboratoryPageable(params).toPromise();
                    break;
                case 'diagnostics':
                    response = await this._diagnosticService.getDiagnosticPageable(params).toPromise();
                    break;
                case 'pills':
                    response = await this._medicationService.getMedicationPageable(params).toPromise();
                    break;
                case 'proceduresAndInterventions':
                    response = await this._paiService.getProcedureAndInterventionsPageable(params).toPromise();
                    break;
                /!*case 'protocols':
                    // list = await this.dmpService.get();
                    const tempResponse = await this.dmpService.getProtocolIterableByDMPV2Id(this._data.dmpV2.id).toPromise();
                    this.list = tempResponse;
                    if (this.originList === null || this.originList === undefined) {
                        this.originList = tempResponse;
                    }
                    break;*!/
            }
        }
        if (response) {
            this.list = response.content;
            if (this.originList === null || this.originList === undefined) {
                this.originList = response;
            }
            this.paginationTotalElements = parseInt(response.total);
            this.paginationRows = parseInt(response.pageable.size);
            this.pageIndex = response.pageable.page;
        }
    }*/

    /*restoreSearch(): void {
        this.searchString = null;
        this.selectedCategoryId = null;
        this.initSelection();
        this.handleFilterCategory();
        // this.list = this.originList.content;
        // this.paginationTotalElements = parseInt(this.originList.total);
        // this.paginationRows = parseInt(this.originList.pageable.size);
    }
*/
}
