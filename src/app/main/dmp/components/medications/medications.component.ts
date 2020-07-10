import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Medication} from '../../../models/dmp/configuration/medication';
import {Subject} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MedicationService} from '../../services/medication.service';
import {MatDialog} from '@angular/material/dialog';
import {takeUntil} from 'rxjs/operators';
import {MedicationsDetailsComponent} from './medications-details/medications-details.component';
import {DeleteConfirmationComponent} from '../../utils/delete-confirmation/delete-confirmation.component';

@Component({
    selector: 'app-medications',
    templateUrl: './medications.component.html',
    styleUrls: ['./medications.component.scss']
})
export class MedicationsComponent implements OnInit, OnDestroy {
    displayedColumns = ['code', 'name', 'description', 'action'];
    medications: Medication[] = [];
    pageItemCount: any[];

    initialLaboratories: any;
    globalLoading: boolean;
    paginationTotalElements: any;
    paginationRows: any;
    private _unsubscribeAll: Subject<any>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    constructor(
        public _medicationService: MedicationService,
        public _matDialog: MatDialog,
    ) {
        this._unsubscribeAll = new Subject<any>();
    }

    ngOnInit(): void {
        this.globalLoading = true;
        this.pageItemCount = [
            5, 10, 15, 50, 100
        ];
        this.loadMedications();
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    loadMedications(): void {
        this.globalLoading = true;
        this._medicationService.getMedicationPageable('').pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
            this.medications = res.content;
            this.initialLaboratories = res;
            this.paginationTotalElements = parseInt(res.total);
            this.paginationRows = parseInt(res.pageable.size);
            this.globalLoading = false;
        });
    }

    changeTableList(event): void {
        this.globalLoading = true;
        const params = 'page=' + event.pageIndex + '&size=' + event.pageSize;
        this._medicationService.getMedicationPageable(params).subscribe(res => {
            this.medications = res.content;
            this.initialLaboratories = res;
            this.paginationTotalElements = parseInt(res.totalElements);
            this.paginationRows = parseInt(res.size);
            this.globalLoading = false;
        });
    }

    openMedication(id: string): void {
        let dialogRef = null;

        if (id === null) {
            dialogRef = this._matDialog.open(MedicationsDetailsComponent, {
                panelClass: 'app-medication-details',
                height: '600px',
                width: '800px',
                data: {
                    medication: new Medication()
                }
            });
        } else {
            this._medicationService.getMedication(id).pipe(takeUntil(this._unsubscribeAll)).subscribe((medication) => {
                dialogRef = this._matDialog.open(MedicationsDetailsComponent, {
                    panelClass: 'app-medication-details',
                    height: '600px',
                    width: '800px',
                    data: {
                        medication
                    }
                });
            });
        }

        if (dialogRef !== null) {

            dialogRef.afterClosed().subscribe((result) => {
                if (result !== undefined && result !== null) {
                    this.loadMedications();
                }

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
                this._medicationService.deleteMedication(id).pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
                    this.loadMedications();
                });
            } else {
                console.log('Just closed');
            }
        });

    }



}
