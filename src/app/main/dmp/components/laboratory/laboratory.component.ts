import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Laboratory} from '../../../models/dmp/configuration/laboratory';
import {MatPaginator} from '@angular/material/paginator';
import {Subject} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {DiseaseService} from '../../services/disease.service';
import {LaboratoryService} from '../../services/laboratory.service';
import {takeUntil} from 'rxjs/operators';
import {LaboratoryDetailsComponent} from './laboratory-details/laboratory-details.component';
import {DeleteConfirmationComponent} from '../../utils/delete-confirmation/delete-confirmation.component';

@Component({
    selector: 'app-laboratory',
    templateUrl: './laboratory.component.html',
    styleUrls: ['./laboratory.component.scss']
})
export class LaboratoryComponent implements OnInit, OnDestroy {
    displayedColumns = ['code', 'name', 'description', 'action'];

    laboratories: Laboratory[] = [];

    pageItemCount: any[];

    initialLaboratories: any;
    globalLoading: boolean;
    paginationTotalElements: any;
    paginationRows: any;
    private _unsubscribeAll: Subject<any>;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        public _matDialog: MatDialog,
        public _laboratoryService: LaboratoryService
    ) {
        this._unsubscribeAll = new Subject<any>();
    }

    ngOnInit(): void {
        this.globalLoading = true;
        this.pageItemCount = [
            5, 10, 15, 50, 100
        ];
        this.loadLaboratories();

    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    loadLaboratories(): void {
        this.globalLoading = true;
        this._laboratoryService.getLaboratoryPageable('').pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
            this.laboratories = res.content;
            this.initialLaboratories = res;
            this.paginationTotalElements = parseInt(res.total);
            this.paginationRows = parseInt(this.initialLaboratories.pageable.size);
            console.log(res.pageable.size, '-------------');
            this.globalLoading = false;
        });
    }

    changeTableList(event): void {
        this.globalLoading = true;
        const params = 'page=' + event.pageIndex + '&size=' + event.pageSize;
        this._laboratoryService.getLaboratoryPageable(params).subscribe(res => {
            this.laboratories = res.content;
            this.initialLaboratories = res;
            this.paginationTotalElements = parseInt(res.totalElements);
            this.paginationRows = parseInt(res.size);
            this.globalLoading = false;
        });
    }

    openLaboratory(id: string): void {
        let dialogRef = null;

        if (id === null) {
            dialogRef = this._matDialog.open(LaboratoryDetailsComponent, {
                panelClass: 'app-laboratory-details',
                height: '600px',
                width: '800px',
                data: {
                    laboratory: new Laboratory()
                }
            });
        } else {
            this._laboratoryService.getLaboratory(id).pipe(takeUntil(this._unsubscribeAll)).subscribe((laboratory) => {
                dialogRef = this._matDialog.open(LaboratoryDetailsComponent, {
                    panelClass: 'app-laboratory-details',
                    height: '600px',
                    width: '800px',
                    data: {
                        laboratory
                    }
                });
            });
        }

        if (dialogRef !== null) {

            dialogRef.afterClosed().subscribe((result) => {
                if (result !== undefined && result !== null) {
                    this.loadLaboratories();
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
                this._laboratoryService.deleteLaboratory(id).pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
                    this.loadLaboratories();
                });
            } else {
                console.log('Just closed');
            }
        });

    }


}
