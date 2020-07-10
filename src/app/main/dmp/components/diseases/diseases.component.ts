import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Disease} from '../../../models/dmp/configuration/disease';
import {DiseaseService} from '../../services/disease.service';
import {MatPaginator} from '@angular/material/paginator';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {CategoryDetailsComponent} from '../categories/category-details/category-details.component';
import {MatDialog} from '@angular/material/dialog';
import {DeleteConfirmationComponent} from '../../utils/delete-confirmation/delete-confirmation.component';
import {DiseaseDetailsComponent} from './disease-details/disease-details.component';

@Component({
    selector: 'app-diseases',
    templateUrl: './diseases.component.html',
    styleUrls: ['./diseases.component.scss']
})
export class DiseasesComponent implements OnInit, OnDestroy {
    displayedColumns = ['code', 'name', 'description', 'action'];
    diseases: Disease[] = [];
    initialDiseases: any;
    globalLoading: boolean;
    showClearIcon = false;

    items: string;
    page: string;

    pageItemCount: any[];
    paginationTotalElements: any;
    paginationRows: any;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    private _unsubscribeAll: Subject<any>;

    constructor(
        public _matDialog: MatDialog,
        public _diseaseService: DiseaseService
    ) {
        this._unsubscribeAll = new Subject<any>();
    }

    ngOnInit(): void {
        this.globalLoading = true;
        this.pageItemCount = [
            5, 10, 15, 50, 100
        ];
        this.loadDiseases();
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    loadDiseases(): void {
        this.globalLoading = true;
        this._diseaseService.getDiseasePageable('').pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
            this.diseases = res.content;
            this.initialDiseases = res;
            this.paginationTotalElements = parseInt(res.total);
            this.paginationRows = parseInt(res.pageable.size);
            this.globalLoading = false;
        });
    }

    changeTableList(event): void {
        this.globalLoading = true;
        const params = 'page=' + event.pageIndex + '&size=' + event.pageSize;
        this._diseaseService.getDiseasePageable(params).subscribe(res => {
            this.diseases = res.content;
            this.initialDiseases = res;
            this.paginationTotalElements = parseInt(res.totalElements);
            this.paginationRows = parseInt(res.size);
            this.globalLoading = false;
        });
    }

    openDisease(id: string): void {
        let dialogRef = null;

        if (id === null) {
            dialogRef = this._matDialog.open(DiseaseDetailsComponent, {
                height: '600px',
                width: '800px',
                panelClass: 'app-category-details',
                data: {
                    disease: new Disease(),
                }
            });
            dialogRef.afterClosed().subscribe((result) => {
                if (result !== undefined && result !== null) {
                    this.loadDiseases();
                }
            });
        } else {
            this._diseaseService.getDisease(id).pipe(takeUntil(this._unsubscribeAll)).subscribe((disease) => {
                dialogRef = this._matDialog.open(DiseaseDetailsComponent, {
                    panelClass: 'app-category-details',
                    height: '600px',
                    width: '800px',
                    data: {
                        disease
                    }
                });
                dialogRef.afterClosed().subscribe((result) => {
                    if (result !== undefined && result !== null) {
                        this.loadDiseases();
                    }
                });

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
                this._diseaseService.deleteDisease(id).pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
                    this.loadDiseases();
                });
            } else {
                console.log('Just closed');
            }
        });

    }



}
