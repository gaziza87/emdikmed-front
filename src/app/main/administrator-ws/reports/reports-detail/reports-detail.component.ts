import {Component, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {VideoContentService} from '../../../../shared/services/administration/video-content.service';
import {TemplateService} from '../../../../shared/services/administration/template.service';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {Template} from '../../../../shared/models/admin/template';
import {Organization} from '../../../../shared/models/admin/organization';
import {ServiceCommonConstant} from '../../../../shared/constant/service-common-constant';

@Component({
    selector: 'app-reports-detail',
    templateUrl: './reports-detail.component.html',
    styleUrls: ['./reports-detail.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ReportsDetailComponent implements OnInit {

    @ViewChild(DatatableComponent) table: DatatableComponent;
    public searchText: string;
    fileToUpload: any;
    template: Template;
    action: string;
    dialogTitle: string;
    templateTypes: Array<string> = [];
    adminUrl = ServiceCommonConstant.adminModuleUrl;


    constructor(public dialogRef: MatDialogRef<ReportsDetailComponent>,
                private _videoContentService: VideoContentService,
                private _templateService: TemplateService,
                private _matSnackBar: MatSnackBar,
                @Inject(MAT_DIALOG_DATA) public _data: any) {
        this.action = this._data.action;
        if (this.action === 'edit') {
            this.template = this._data.temp;
            this.dialogTitle = 'Редактирования ' + this.template.name;
        } else {
            this.dialogTitle = 'Добавления новый документ';
            this.template = new Template();
        }
        console.log('this.template', this.template);
    }

    ngOnInit(): void {
        this.templateTypes = ['.docx', '.jrxml'];
    }

    close(): void {
        this.dialogRef.close();
    }

    saveTemplate() {
        this._templateService.saveTemplate(this.template).subscribe(res => {
            this._matSnackBar.open('Отчетный форма сохранен', '', {
                verticalPosition: 'top',
                duration: 2000
            } as MatSnackBarConfig);
        });
    }

    addFile(link: string): void {
        const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
        fileUpload.onchange = () => {
            if (fileUpload.files && fileUpload.files[0]) {
                this.fileToUpload = fileUpload.files[0];
                this.uploadFile(link);
            }
        };
        fileUpload.click();
    }

    uploadFile(link): void {
        const input = new FormData();
        input.append('file', this.fileToUpload);
        console.log('this.fileToUpload', this.fileToUpload);
        this.template.fileName = this.fileToUpload.name;
        this._videoContentService.uploadFile(input).subscribe((res) => {
            console.log('res:', res);
            if (this.template.fileId) {
                this._videoContentService.deleteFile(this.template.fileId);
                console.log('file deleted');
            }
            this.template.fileId = res.id;

            this._matSnackBar.open('Файл добавлен', '', {
                verticalPosition: 'top',
                duration: 2000
            } as MatSnackBarConfig);


        }, error => {
            console.log('error', error);
        });

    }
    downloadFile(id, fileType): void {
        this._videoContentService.downloadFile(id).subscribe((res: any) => {
            console.log('res of download file', res);

        }, error => {
            console.log('error of download', error)
            console.log('download error:', JSON.stringify(error));
        }, () => {
            console.log('Completed file download.');
        });
    }

}
