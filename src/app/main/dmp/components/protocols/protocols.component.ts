import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Protocol} from '../../../models/dmp/configuration/protocol';
import {Subject} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {ProtocolService} from '../../services/protocol.service';
import {takeUntil} from 'rxjs/operators';
import {Medication} from '../../../models/dmp/configuration/medication';
import {ProtocolDetailsComponent} from './protocol-details/protocol-details.component';
import {DeleteConfirmationComponent} from '../../utils/delete-confirmation/delete-confirmation.component';

@Component({
    selector: 'app-protocols',
    templateUrl: './protocols.component.html',
    styleUrls: ['./protocols.component.scss']
})
export class ProtocolsComponent implements OnInit, OnDestroy {
    displayedColumns = ['code', 'name', 'description', 'action'];
    protocols: Protocol[] = [];

    pageItemCount: any[];

    initialLaboratories: any;
    globalLoading: boolean;
    paginationTotalElements: any;
    paginationRows: any;
    private _unsubscribeAll: Subject<any>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    constructor(
        public _matDialog: MatDialog,
        public _protocolService: ProtocolService
    ) {
        this._unsubscribeAll = new Subject<any>();
    }

    ngOnInit(): void {
        this.globalLoading = true;
        this.pageItemCount = [
            5, 10, 15, 50, 100
        ];

        this.loadProtocols();
    }

    ngOnDestroy(): void {
    }

    loadProtocols(): void {
        this.globalLoading = true;
        this._protocolService.getProtocolPageable('').pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
            this.protocols = res.content;
            this.initialLaboratories = res;
            this.paginationTotalElements = parseInt(res.total);
            this.paginationRows = parseInt(res.pageable.size);
            this.globalLoading = false;
        });
    }

    changeTableList(event): void {
        this.globalLoading = true;
        const params = 'page=' + event.pageIndex + '&size=' + event.pageSize;
        this._protocolService.getProtocolPageable(params).subscribe(res => {
            this.protocols = res.content;
            this.initialLaboratories = res;
            this.paginationTotalElements = parseInt(res.totalElements);
            this.paginationRows = parseInt(res.size);
            this.globalLoading = false;
        });
    }

    openProtocol(id: string): void {
        let dialogRef = null;

        if (id === null) {
            dialogRef = this._matDialog.open(ProtocolDetailsComponent, {
                panelClass: 'app-protocol-details',
                height: '600px',
                width: '800px',
                data: {
                    protocol: new Protocol()
                }
            });
        } else {
            this._protocolService.getProtocol(id).pipe(takeUntil(this._unsubscribeAll)).subscribe((protocol) => {
                dialogRef = this._matDialog.open(ProtocolDetailsComponent, {
                    panelClass: 'app-protocol-details',
                    height: '600px',
                    width: '800px',
                    data: {
                        protocol
                    }
                });
            });
        }

        if (dialogRef !== null) {

            dialogRef.afterClosed().subscribe((result) => {
                if (result !== undefined && result !== null) {
                    this.loadProtocols();
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
                this._protocolService.deleteProtocol(id).pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
                    this.loadProtocols();
                });
            } else {
                console.log('Just closed');
            }
        });

    }


}
