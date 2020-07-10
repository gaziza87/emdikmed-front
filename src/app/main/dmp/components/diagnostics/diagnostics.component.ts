import {Component, OnInit, ViewChild} from '@angular/core';
import {Diagnostic} from '../../../models/dmp/configuration/diagnostic';
import {MatPaginator} from '@angular/material/paginator';
import {Subject} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {DiagnosticService} from '../../services/diagnostic.service';
import {takeUntil} from 'rxjs/operators';
import {DiagnosticsDetailsComponent} from './diagnostics-details/diagnostics-details.component';
import {DeleteConfirmationComponent} from '../../utils/delete-confirmation/delete-confirmation.component';

@Component({
    selector: 'app-diagnostics',
    templateUrl: './diagnostics.component.html',
    styleUrls: ['./diagnostics.component.scss']
})
export class DiagnosticsComponent implements OnInit {
    displayedColumns = ['code', 'name', 'description', 'action'];
    diagnostics: Diagnostic[] = [];
    initialDiagnostics: Diagnostic[] = [];

    globalLoading: boolean;
    showClearIcon = false;

    pageItemCount: any[];
    paginationTotalElements: any;
    paginationRows: any;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    private _unsubscribeAll: Subject<any>;

    constructor(
        public _matDialog: MatDialog,
        public _dmpService: DiagnosticService
    ) {
        this._unsubscribeAll = new Subject<any>();
    }

    ngOnInit(): void {
        this.globalLoading = true;
        this.pageItemCount = [
            5, 10, 15, 50, 100
        ];
        this.loadDiagnostics();
    }

    loadDiagnostics(): void {
        this.globalLoading = true;
        this._dmpService.getDiagnosticPageable('').pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
            this.diagnostics = res.content;
            this.initialDiagnostics = res;
            this.paginationTotalElements = parseInt(res.total);
            this.paginationRows = parseInt(res.pageable.size);
            this.globalLoading = false;
        });
    }

    changeTableList(event): void {
        this.globalLoading = true;
        const params = 'page=' + event.pageIndex + '&size=' + event.pageSize;
        this._dmpService.getDiagnosticPageable(params).subscribe(res => {
            this.diagnostics = res.content;
            this.initialDiagnostics = res;
            this.paginationTotalElements = parseInt(res.totalElements);
            this.paginationRows = parseInt(res.size);
            this.globalLoading = false;
        });
    }

    openDiagnostic(id: string): void {
        let dialogRef = null;

        if (id === null) {
            dialogRef = this._matDialog.open(DiagnosticsDetailsComponent, {
                panelClass: 'app-diagnostic-details',
                height: '600px',
                width: '800px',
                data: {
                    diagnostic: new Diagnostic()
                }
            });
        } else {
            this._dmpService.getDiagnostic(id).pipe(takeUntil(this._unsubscribeAll)).subscribe((diagnostic) => {
                dialogRef = this._matDialog.open(DiagnosticsDetailsComponent, {
                    panelClass: 'app-diagnostic-details',
                    height: '600px',
                    width: '800px',
                    data: {
                        diagnostic
                    }
                });
            });
        }

        if (dialogRef !== null) {
            dialogRef.afterClosed().subscribe((result) => {
                if (result !== undefined && result !== null) {
                    this.loadDiagnostics();
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
                this._dmpService.deleteDiagnostic(id).pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
                    this.loadDiagnostics();
                });
            } else {
                console.log('Just closed');
            }
        });

    }

}
