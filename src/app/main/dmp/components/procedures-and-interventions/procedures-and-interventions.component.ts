import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProcedureAndInterventions} from '../../../models/dmp/configuration/procedureandinterventions';
import {Subject} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {ProcedureAndInterventionsService} from '../../services/procedure-and-interventions.service';
import {takeUntil} from 'rxjs/operators';
import {ProcedureAndInterventionsDetailsComponent} from './procedure-and-interventions-details/procedure-and-interventions-details.component';
import {DeleteConfirmationComponent} from '../../utils/delete-confirmation/delete-confirmation.component';

@Component({
    selector: 'app-procedures-and-interventions',
    templateUrl: './procedures-and-interventions.component.html',
    styleUrls: ['./procedures-and-interventions.component.scss']
})
export class ProceduresAndInterventionsComponent implements OnInit, OnDestroy {
    displayedColumns = ['code', 'name', 'description', 'action'];
    pais: ProcedureAndInterventions[] = [];

    pageItemCount: any[];

    initialLaboratories: any;
    globalLoading: boolean;
    paginationTotalElements: any;
    paginationRows: any;
    private _unsubscribeAll: Subject<any>;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        public _matDialog: MatDialog,
        public _paiService: ProcedureAndInterventionsService
    ) {

        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.globalLoading = true;
        this.pageItemCount = [
            5, 10, 15, 50, 100
        ];
        this.loadPAI();
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    loadPAI(): void {
        this.globalLoading = true;
        this._paiService.getProcedureAndInterventionsPageable('')
            .pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
            this.pais = res.content;
            this.initialLaboratories = res;
            this.paginationTotalElements = parseInt(res.total);
            this.paginationRows = parseInt(res.pageable.size);
            this.globalLoading = false;
        });
    }

    changeTableList(event): void {
        this.globalLoading = true;
        const params = 'page=' + event.pageIndex + '&size=' + event.pageSize;
        this._paiService.getProcedureAndInterventionsPageable(params).subscribe(res => {
            this.pais = res.content;
            this.initialLaboratories = res;
            this.paginationTotalElements = parseInt(res.totalElements);
            this.paginationRows = parseInt(res.size);
            this.globalLoading = false;
        });
    }

    openPAI(id: string): void {
        let dialogRef = null;

        if (id === null) {
            dialogRef = this._matDialog.open(ProcedureAndInterventionsDetailsComponent, {
                panelClass: 'app-procedure-and-interventions-details',
                height: '600px',
                width: '800px',
                data: {
                    pai: new ProcedureAndInterventions()
                }
            });
        } else {
            this._paiService.getProceduresAndInterventions(id).pipe(takeUntil(this._unsubscribeAll)).subscribe((pai) => {
                dialogRef = this._matDialog.open(ProcedureAndInterventionsDetailsComponent, {
                    panelClass: 'app-procedure-and-interventions-details',
                    height: '600px',
                    width: '800px',
                    data: {
                        pai
                    }
                });
            });
        }

        if (dialogRef !== null) {

            dialogRef.afterClosed().subscribe((result) => {
                if (result !== undefined && result !== null) {
                    this.loadPAI();
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
                this._paiService.deleteProceduresAndInterventions(id).pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
                    this.loadPAI();
                });
            } else {
                console.log('Just closed');
            }
        });

    }


}
