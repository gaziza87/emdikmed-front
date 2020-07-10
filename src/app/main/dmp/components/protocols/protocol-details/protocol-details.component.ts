import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Protocol} from '../../../../models/dmp/configuration/protocol';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {Subject} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {takeUntil} from 'rxjs/operators';
import {DiseaseService} from '../../../services/disease.service';
import {Disease} from '../../../../models/dmp/configuration/disease';
import {ProtocolService} from '../../../services/protocol.service';

@Component({
    selector: 'app-protocol-details',
    templateUrl: './protocol-details.component.html',
    styleUrls: ['./protocol-details.component.scss']
})
export class ProtocolDetailsComponent implements OnInit, OnDestroy {
    protocol: Protocol;
    dialogTitle: string;
    disease: Disease[];

    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';

    private _unsubscribeAll: Subject<any>;

    constructor(
        public matDialogRef: MatDialogRef<ProtocolDetailsComponent>,
        public snackBar: MatSnackBar,
        public _diseaseService: DiseaseService,
        public _protocolService: ProtocolService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.protocol = this.data.protocol;
        if (this.protocol.name === undefined || this.protocol.name === null) {
            this.protocol.name = {
                kz: null,
                ru: null,
                en: null
            };
        }

        if (this.protocol.description === undefined || this.protocol.description === null) {
            this.protocol.description = {
                kz: null,
                ru: null,
                en: null
            };
        }

        this._unsubscribeAll = new Subject();

    }

    ngOnInit(): void {
        this.dialogTitle = 'Заполните необходимые поля';
        this.loadDiseases();
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    loadDiseases(): void {
        this._diseaseService.getDiseaseIterable().pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
            this.disease = res;
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
        if (this.protocol.id === null || this.protocol.id === undefined) {
            this._protocolService.createProtocol(this.protocol).pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
                this.protocol = res;
                this.matDialogRef.close('ok');
                this.displayMessage('Протокол успешно создана!');
            }, () => {
                this.displayMessage('Ошибка! Не удалось создать протокол!');
            });
        } else {
            this._protocolService.updateProtocol(this.protocol).pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
                this.protocol = res;
                this.matDialogRef.close('ok');
                this.displayMessage('Изменения успешно сохранены!');
            }, () => {
                this.displayMessage('Ошибка! Не удалось сохранить протокол!');
            });
        }
    }

}
