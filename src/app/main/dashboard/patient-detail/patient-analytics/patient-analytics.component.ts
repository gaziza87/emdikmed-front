import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Analytics} from '../fake-db.service';

@Component({
    selector: 'app-patient-analytics',
    templateUrl: './patient-analytics.component.html',
    styleUrls: ['./patient-analytics.component.scss']
})

export class PatientAnalyticsComponent implements OnInit {

    public analytics: any[];
    public showXAxis = true;
    public showYAxis = true;
    public gradient = false;
    public showLegend = false;
    public showXAxisLabel = false;
    public xAxisLabel = 'Year';
    public showYAxisLabel = false;
    public yAxisLabel = 'Profit';
    public colorScheme = {
        domain: ['#283593', '#039BE5', '#FF5252']
    };
    public autoScale = true;
    public roundDomains = true;
    @ViewChild('resizedDiv') resizedDiv: ElementRef;
    public previousWidthOfResizedDiv = 0;

    constructor() {
    }

    ngOnInit(): void {
        this.analytics = Analytics;
    }

    onSelect(event) {
        console.log(event);
    }

    ngAfterViewChecked() {
        if (this.previousWidthOfResizedDiv !== this.resizedDiv.nativeElement.clientWidth) {
            this.analytics = [...Analytics];
        }
        this.previousWidthOfResizedDiv = this.resizedDiv.nativeElement.clientWidth;
    }
}
