import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Services} from '../../../models/dmp/configuration/services';
import {Subject} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {ServicesService} from '../../services/services.service';
import {takeUntil} from 'rxjs/operators';
import {ServicesDetailsComponent} from './services-details/services-details.component';

@Component({
    selector: 'app-services',
    templateUrl: './services.component.html',
    styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit, OnDestroy {
    displayedColumns = ['code', 'name', 'description', 'action'];

    services: Services[] = [];
    pageItemCount: any[];

    initialLaboratories: any;
    globalLoading: boolean;
    paginationTotalElements: any;
    paginationRows: any;
    private _unsubscribeAll: Subject<any>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    constructor(
        public _matDialog: MatDialog,
        public _servicesService: ServicesService,
    ) {
        this._unsubscribeAll = new Subject<any>();
    }

    ngOnInit(): void {
        this.globalLoading = true;
        this.pageItemCount = [
            5, 10, 15, 50, 100
        ];
        this.loadServices();
    }

    ngOnDestroy(): void {
    }

    loadServices(): void {
        this.globalLoading = true;
        this._servicesService.getServicesPageable('').pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
            this.services = res.content;
            this.initialLaboratories = res;
            this.paginationTotalElements = parseInt(res.total);
            this.paginationRows = parseInt(res.pageable.size);
            this.globalLoading = false;
        });
    }

    changeTableList(event): void {
        this.globalLoading = true;
        const params = 'page=' + event.pageIndex + '&size=' + event.pageSize;
        this._servicesService.getServicesPageable(params).subscribe(res => {
            this.services = res.content;
            this.initialLaboratories = res;
            this.paginationTotalElements = parseInt(res.totalElements);
            this.paginationRows = parseInt(res.size);
            this.globalLoading = false;
        });
    }

    openProtocol(id: string): void {
        let dialogRef = null;

        if (id === null) {
            dialogRef = this._matDialog.open(ServicesDetailsComponent, {
                panelClass: 'app-services-details',
                height: '600px',
                width: '800px',
                data: {
                    service: new Services()
                }
            });
        } else {
            this._servicesService.getServices(id).pipe(takeUntil(this._unsubscribeAll)).subscribe((service) => {
                dialogRef = this._matDialog.open(ServicesDetailsComponent, {
                    panelClass: 'app-services-details',
                    height: '600px',
                    width: '800px',
                    data: {
                        service
                    }
                });
            });
        }

        if (dialogRef !== null) {

            dialogRef.afterClosed().subscribe((result) => {
                if (result !== undefined && result !== null) {
                    this.loadServices();
                }

            });
        }
    }


}
