import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {VideoAddEditComponent} from './video-add-edit/video-add-edit.component';
import {ServiceCommonConstant} from '../../../shared/constant/service-common-constant';
import {VideoContentService} from '../../../shared/services/administration/video-content.service';
import {VideoContent} from '../../../shared/models/admin/video-content';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

@Component({
    selector: 'app-video',
    templateUrl: './video.component.html',
    styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {


    adminUrl = ServiceCommonConstant.adminModuleUrl;

    videoContents: VideoContent[];

    constructor(
        public dialog: MatDialog,
        private _matSnackBar: MatSnackBar,
        public _videoService: VideoContentService) {
        this.getAllVideoContents();
    }

    getAllVideoContents() {
        this._videoService.getAllVideoContent().subscribe(res => {
            this.videoContents = res;
            console.log(this.videoContents);
        });
    }

    ngOnInit(): void {
    }

    public Edit(video) {
        const action = video !== null ? 'edit' : 'new';
        const dialogRef = this.dialog.open(VideoAddEditComponent, {
            data: {
                video,
                action
            }
        });

        dialogRef.afterClosed().subscribe(response => {
            this.getAllVideoContents();
        });
    }
    Delete(video) {
        const snackBarRef = this._matSnackBar.open('Вы действительно хотите удалить пациента?', 'Да', {
            verticalPosition: 'top',
            duration        : 5000
        } as MatSnackBarConfig);
        snackBarRef.onAction().subscribe(() => {
            this._videoService.deleteFile(video.videoId).subscribe(response => {
            });
            this._videoService.deleteVideoContent(video.id).subscribe(response => {
                this.getAllVideoContents();
            });
        });
    }

}
