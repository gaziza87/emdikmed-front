import {Component, OnInit} from '@angular/core';
import {Settings} from '../../../../app.settings.model';
import {AppSettings} from '../../../../app.settings';
import {MatDialog} from '@angular/material/dialog';
import {VideoAddEditComponent} from './video-add-edit/video-add-edit.component';
import {PatientVideoContentService} from '../../../dmp/services/patient-video-content.service';
import {PatientVideoMap} from '../../../models/dmp/visit/patientVideoMap';
import {ActivatedRoute} from '@angular/router';
import {ServiceCommonConstant} from '../../../../shared/constant/service-common-constant';

@Component({
    selector: 'app-video',
    templateUrl: './video.component.html',
    styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {


    videoMapList: PatientVideoMap[] = [];
    patientId: string;
    adminUrl = ServiceCommonConstant.adminModuleUrl;

    constructor(
        public dialog: MatDialog,
        private route: ActivatedRoute,
        private _patientVideoContentMapService: PatientVideoContentService) {

    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            if (params['patientId']) {
                this.patientId = params['patientId'];
                console.log(this.patientId)
                this.getAllVideoByPatientId();
            }
        });
    }

    getAllVideoByPatientId() {
        this._patientVideoContentMapService.getAllPatientVideoContentMapByPatientId(this.patientId).subscribe(res => {
            this.videoMapList = res;
        });
    }

    public Edit(patientId) {
        const dialogRef = this.dialog.open(VideoAddEditComponent, {
            data: this.patientId
        });

        dialogRef.afterClosed().subscribe(user => {
            this.getAllVideoByPatientId();
        });
    }

}
