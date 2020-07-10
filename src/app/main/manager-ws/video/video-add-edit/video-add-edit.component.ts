import {Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {ServiceCommonConstant} from '../../../../shared/constant/service-common-constant';
import {VideoContentService} from '../../../../shared/services/administration/video-content.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {VideoContent} from '../../../../shared/models/admin/video-content';
import {DiseaseService} from '../../../dmp/services/disease.service';
import {Disease} from '../../../models/dmp/configuration/disease';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

@Component({
    selector: 'app-video-add-edit',
    templateUrl: './video-add-edit.component.html',
    styleUrls: ['./video-add-edit.component.scss']
})
export class VideoAddEditComponent implements OnInit, OnDestroy {

    @ViewChild(DatatableComponent) table: DatatableComponent;
    public searchText: string;
    public form: FormGroup;

    organization: string;
    adminUrl = ServiceCommonConstant.adminModuleUrl;
    videoContent: VideoContent;
    fileToUpload: any;
    pageType: string;
    videoId: any;
    diseases: Disease[];
    saved = false;
    private _unsubscribeAll: Subject<any>;

    constructor(public dialogRef: MatDialogRef<VideoAddEditComponent>,
                @Inject(MAT_DIALOG_DATA) public _data: any,
                private _service: VideoContentService,
                private _matSnackBar: MatSnackBar,
                public _diseaseService: DiseaseService) {
        this.pageType = this._data.action;
        if (this.pageType === 'edit') {
            console.log('edit');
            this.videoContent = this._data.video;
        } else {
            this.videoContent = new VideoContent();
        }
        this._unsubscribeAll = new Subject<any>();
        this.getAllDisease();
    }

    getAllDisease() {
        this._diseaseService.getDiseaseIterable().subscribe(response => {
            this.diseases = response;
            console.log(this.diseases);
        }, err => {
            console.error(err);
        });
    }

    saveVideoContent() {
        this._service.saveVideoContent(this.videoContent).subscribe(res => {
            this.saved = true;
            this._matSnackBar.open('Видео контент изменен', '', {
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
        this._service.uploadFile(input).subscribe((res) => {
            console.log('res:', res);
            if (link === 'videoId') {
                if (this.videoContent.videoId) {
                    this.deleteFile(this.videoContent.videoId);
                }
                this.videoContent.videoId = res.id;
            }
        }, error => {
            console.log('error', error);
        });

    }


    deleteFile(id): void {
        this._service.deleteFile(id)
            .pipe()
            .subscribe(response => {
                console.log('after service');
                if (this.pageType === 'edit') {
                    this.saveVideoContent();
                }
            }, error => {
                console.log(error);
            });
    }

    ngOnInit(): void {
    }

    close(): void {
        this.dialogRef.close();
    }

    ngOnDestroy(): void {
        if (!this.saved && this.pageType !== 'edit') {
            this.deleteFile(this.videoContent.videoId);
        }
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    checkItem(item: any) {
        console.log(item);
    }
}
