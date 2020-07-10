import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {log} from 'util';
import {VideoContentService} from '../../../../../shared/services/administration/video-content.service';
import {VideoContent} from '../../../../../shared/models/admin/video-content';
import {ServiceCommonConstant} from '../../../../../shared/constant/service-common-constant';
import {PatientVideoContentService} from '../../../../dmp/services/patient-video-content.service';
import {PatientVideoMap} from '../../../../models/dmp/visit/patientVideoMap';

@Component({
    selector: 'app-video-add-edit',
    templateUrl: './video-add-edit.component.html',
    styleUrls: ['./video-add-edit.component.scss']
})
export class VideoAddEditComponent implements OnInit {

    public searchText: string;
    videoContentList: VideoContent[] = [];
    patientId: string;
    adminUrl = ServiceCommonConstant.adminModuleUrl;
    patientVideoContentMap: PatientVideoMap;

    constructor(public dialogRef: MatDialogRef<VideoAddEditComponent>,
                @Inject(MAT_DIALOG_DATA) public _data: any,
                private _videoContentService: VideoContentService,
                private _patientVideoMapService: PatientVideoContentService
    ) {
        console.log(this._data);

        this.patientId = this._data;
        this.getAllVideos();
    }

    ngOnInit(): void {
    }

    getAllVideos() {
        this._videoContentService.getAllVideoContent().subscribe(res => {
            this.videoContentList = res;
        });
    }

    close(): void {
        this.dialogRef.close();
    }

    checkItem(item: any) {
        console.log(item);
    }

    createPatientVideoMap(videoContent) {
        this.patientVideoContentMap = new PatientVideoMap();
        this.patientVideoContentMap.videoContent = videoContent;
        this.patientVideoContentMap.patientId = this.patientId;
        console.log('this.patientVideoContentMap', this.patientVideoContentMap.patientId);
        this._patientVideoMapService.savePatientVideoContentMap(this.patientVideoContentMap).subscribe(res => {
            this.dialogRef.close();
        }, error => {
            console.log(error);
        });
    }
}
