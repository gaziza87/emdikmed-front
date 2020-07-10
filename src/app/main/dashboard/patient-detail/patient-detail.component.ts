import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {FakeDbService} from './fake-db.service';
import {MatDialog} from '@angular/material/dialog';
import {UserService} from '../../../shared/services/administration/user.service';
import {User} from '../../../shared/models/admin/user';
import {takeUntil} from 'rxjs/operators';
import {LaboratoryComponent} from './laboratory/laboratory.component';
import {Visit} from '../../models/dmp/visit/visit';
import {Subject} from 'rxjs';
import {VisitContent} from '../../models/dmp/visit/visitContent';
import {VisitService} from '../../dmp/services/visit.service';
import {VisitContentService} from '../../dmp/services/visitContent.service';
import {ActivatedRoute} from '@angular/router';
import {DiseaseData} from '../../models/dmp/configuration/disease-data';
import {DiseaseService} from '../../dmp/services/disease.service';
import {Disease} from '../../models/dmp/configuration/disease';
import {LaboratoryService} from '../../dmp/services/laboratory.service';
import {DiagnosticService} from '../../dmp/services/diagnostic.service';
import {ProcedureAndInterventionsService} from '../../dmp/services/procedure-and-interventions.service';
import {AppointmentService} from '../../../shared/services/appointment/appointment.service';
import {UserDTO} from '../../../shared/models/admin/userDTO';

@Component({
    selector: 'app-patient-detail',
    templateUrl: './patient-detail.component.html',
    styleUrls: ['./patient-detail.component.scss']
})
export class PatientDetailComponent implements OnInit {

    public displayedColumns = ['position', 'name', 'weight', 'symbol', 'button'];

    public dataSource: any;

    visitContent: VisitContent;

    minDate = new Date();

    public sidenavOpen = true;
    public check = true;

    currentUserAccountId: string;
    doctor: UserDTO;

    user: User;
    patient: User;
    visitId: string;
    visit: Visit;
    isNew = true;

    selectedDiseases: Disease[] = [];
    selectedMedicines: any[] = [];
    selectedLaboratories: any[] = [];
    selectedDiagnostics: any[] = [];
    selectedProcedures: any[] = [];

    animationDirection: 'left' | 'right' | 'none';
    course: any;
    currentStep: number;
    dialogRef: any;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    private _unsubscribeAll: Subject<any>;

    constructor(
        private fakeDbService: FakeDbService,
        public dialog: MatDialog,
        private route: ActivatedRoute,
        private visitService: VisitService,
        private diseaseService: DiseaseService,
        private labService: LaboratoryService,
        private cellService: AppointmentService,
        private diagService: DiagnosticService,
        private procAndInvService: ProcedureAndInterventionsService,
        private visitContentService: VisitContentService,
        private _userService: UserService
    ) {
        this.dataSource = this.fakeDbService.getData();

        this.currentUserAccountId = localStorage.getItem('userAccountId');
        this.loadCurrentUser();
    }


    ngOnInit(): void {

    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
    }

    loadCurrentUser(): void {
        this._userService.getDTOByUserAccountId(this.currentUserAccountId).subscribe((res) => {
            this.doctor = res;
            this.init();
        });
    }

    init(): void {
        this.route.params.subscribe((params) => {
            console.log('testing', params.type === 'new');
            if (params.cellId) {
                this.cellService.getCellInfoById(params.cellId).subscribe(res => {
                    if (res.visitId && res.visitId.length > 0) {
                        this.visitId = params.id;
                        this.getVisitById();
                    } else {
                        this._userService.getById(params.id).subscribe(response => {
                            this.patient = response;
                            this.visit = new Visit();
                            this.visit.patientId = this.patient.id;
                            this.visit.doctorId = this.doctor.user.id;
                            this.visitService.createVisit(this.visit).subscribe(res1 => {
                                this.visit = res1;
                                res.visitId = this.visit.id;
                                this.cellService.updateCellInfo(res).subscribe(result => {
                                    this.initNewDMPV2();
                                });
                            });
                        }, err => {
                            console.error(err);
                        });
                    }
                });
            } else {
                if (params.type === 'new') {
                    this._userService.getById(params.id).subscribe(response => {
                        this.patient = response;
                        this.visit = new Visit();
                        // this.visit.doctorId =
                        this.visit.patientId = this.patient.id;
                        this.visit.doctorId = this.doctor.user.id;
                        this.visitService.createVisit(this.visit).subscribe(res => {
                            this.visit = res;
                            this.initNewDMPV2();
                        });
                    }, err => {
                        console.error(err);
                    });

                } else {
                    this.visitId = params.id;
                    this.getVisitById();
                }
            }


        });
    }

    getVisitContentById(visitContentId: string): void {
        this.visitContentService.getVisitContentById(visitContentId).subscribe(res => {
            this.visitContent = res;
            if (this.visitContent.checkFullFill === null || this.visitContent.checkFullFill === undefined) {
                this.visitContent.checkFullFill = false;
            }
            if (this.visitContent.diseaseData.procAndInter === null) {
                this.visitContent.diseaseData.procAndInter = [];
            }
            if (this.visitContent.diseaseData.diagMethods === null) {
                this.visitContent.diseaseData.diagMethods = [];
            }
            if (this.visitContent.diseaseData.labAnalys === null) {
                this.visitContent.diseaseData.labAnalys = [];
            }
            if (this.visitContent.diseaseData.lekNazn === null) {
                this.visitContent.diseaseData.lekNazn = [];
            }

            this.loadDiseasesInformations();
            this.loadSelectedLaboratories();
            this.loadSelectedDiagnostics();
            // this.loadSelectedMedicines();
            this.loadSelectedProceduresAndInterventions();

        });
    }

    getVisitById(): void {
        this.visitService.getVisitById(this.visitId).subscribe(res => {
            this.visit = res;

            if (this.visit.patientId) {
                this.getUserById(this.visit.patientId);
            }
            if (this.visit.visitContentId) {
                this.getVisitContentById(this.visit.visitContentId);
                this.isNew = false;
                // this.showParameters = false;
                // this.showData = true;
            } else {
                this.initNewDMPV2();
            }
        });
    }

    initNewDMPV2(): void {
        this.visitContent = new VisitContent();
        this.visitContent.diseaseData = new DiseaseData();
        this.visitContent.checkFullFill = false;
        this.visitContent.diseaseData.subDannie = '';
        this.visitContent.diseaseData.anamZhiz = '';
        this.visitContent.diseaseData.anamBol = '';
        this.visitContent.diseaseData.diagMethods = [];
        this.visitContent.diseaseData.diagMethodsText = '';
        this.visitContent.diseaseData.diagZakl = '';
        this.visitContent.diseaseData.infoMat = '';
        this.visitContent.diseaseData.labAnalys = [];
        this.visitContent.diseaseData.labAnalysText = '';
        this.visitContent.diseaseData.lekNazn = [];
        this.visitContent.diseaseData.lekNaznText = '';
        this.visitContent.diseaseData.procAndInter = [];
        this.visitContent.diseaseData.procAndInterText = '';
        this.visitContent.diseaseData.note = '';
        this.visitContent.diseaseData.objDannie = '';
        this.visitContent.diseaseData.sovNomadiet = '';
        this.visitContent.diseaseData.vrachRec = '';
        this.visitContentService.createVisitContent(this.visitContent).subscribe(res => {
            this.visitContent = res;
            this.isNew = false;
            this.visit.visitContentId = res.id;
            this.visitService.updateVisit(this.visit).subscribe(sub => {
            });
        });
    }

    loadDiseasesInformations(): void {
        this.diseaseService.getDiseaseIterableByIdIn(this.visitContent.selectedDiseaseIds)
            .subscribe((res) => {
                this.selectedDiseases = res;
            });
    }

    loadSelectedLaboratories(): void {
        if (this.visitContent !== null && this.visitContent !== undefined && this.visitContent.diseaseData
            !== null && this.visitContent.diseaseData !== undefined) {
            if (this.visitContent.diseaseData.labAnalys !== null && this.visitContent.diseaseData.labAnalys
                !== undefined && this.visitContent.diseaseData.labAnalys.length > 0) {
                this.labService.getLabIterableByIdIn(this.visitContent.diseaseData.labAnalys)
                    .subscribe((res) => {
                        this.selectedLaboratories = res;
                    });
            }
        }
    }

    loadSelectedDiagnostics(): void {
        if (this.visitContent !== null && this.visitContent !== undefined && this.visitContent.diseaseData !== null
            && this.visitContent.diseaseData !== undefined) {
            if (this.visitContent.diseaseData.diagMethods !== null && this.visitContent.diseaseData.diagMethods !== undefined
                && this.visitContent.diseaseData.diagMethods.length > 0) {
                this.diagService.getDiagnosticsByIdIn(this.visitContent.diseaseData.diagMethods)
                    .subscribe((res) => {
                        this.selectedDiagnostics = res;
                    });
            } else {
                this.selectedDiagnostics = [];
            }
        }
    }

    // loadSelectedMedicines(): void {
    //     if (this.visitContent !== null && this.visitContent !== undefined && this.visitContent.diseaseData !== null
    //         && this.visitContent.diseaseData !== undefined) {
    //         if (this.visitContent.diseaseData.lekNazn !== null && this.visitContent.diseaseData.lekNazn !== undefined
    //             && this.visitContent.diseaseData.lekNazn.length > 0) {
    //             this.visitContentService.getMedicineIterableByIdIn(this.visitContent.diseaseData.lekNazn)
    //                 .pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
    //                 this.selectedMedicines = res;
    //             });
    //         }
    //     }
    // }

    loadSelectedProceduresAndInterventions(): void {
        if (this.visitContent !== null && this.visitContent !== undefined && this.visitContent.diseaseData !== null
            && this.visitContent.diseaseData !== undefined) {
            if (this.visitContent.diseaseData.procAndInter !== null && this.visitContent.diseaseData.procAndInter !== undefined
                && this.visitContent.diseaseData.procAndInter.length > 0) {
                this.procAndInvService.getProceduresAndInterventionsByIdIn(this.visitContent.diseaseData.procAndInter)
                    .subscribe((res) => {
                        this.selectedProcedures = res;
                    });
            }
        }
    }

    getUserById(id: string) {
        this._userService.getById(id).subscribe(response => {
            this.patient = response;
        }, err => {
            console.error(err);
        });
    }

    openDialog(filter: string): void {
        this.dialogRef = this.dialog.open(LaboratoryComponent, {
            data: {
                filter,
                visit: this.visitContent,
                isNew: this.isNew
            }
        });
        this.dialogRef.afterClosed()
            .subscribe((visitContent: any) => {
                console.log('visitContent', visitContent);
                console.log('visit', this.visit);
                if (visitContent !== null && visitContent !== undefined) {
                    this.visitContentService.updateVisitContent(visitContent)
                        .subscribe((response: any) => {
                            console.log('updateDMPV2', response);
                            this.visit.visitContentId = response.id;
                            this.updateVisit();
                            this.updateDMPV2AfterDiseaseSelection();
                        });
                }
            });
    }

    updateVisitContent(): void {
        this.visitContentService.updateVisitContent(this.visitContent)
            .subscribe((response: any) => {
                console.log('updateDMPV2', response);
                this.visit.visitContentId = response.id;
                this.updateVisit();
                this.updateDMPV2AfterDiseaseSelection();
            });
    }

    updateVisit(): void {
        this.visitService.updateVisit(this.visit).subscribe((res) => {
            this.visit = res;
        });
    }

    updateDMPV2AfterDiseaseSelection(): void {
        this.visitContentService.update2AfterDiseaseSelection(this.visitContent).subscribe((res) => {
            this.visitContent = res;
            if (this.visitContent.checkFullFill === null || this.visitContent.checkFullFill === undefined) {
                this.visitContent.checkFullFill = false;
            }
            if (this.visitContent.diseaseData.procAndInter === null) {
                this.visitContent.diseaseData.procAndInter = [];
            }
            if (this.visitContent.diseaseData.diagMethods === null) {
                this.visitContent.diseaseData.diagMethods = [];
            }
            if (this.visitContent.diseaseData.labAnalys === null) {
                this.visitContent.diseaseData.labAnalys = [];
            }
            if (this.visitContent.diseaseData.lekNazn === null) {
                this.visitContent.diseaseData.lekNazn = [];
            }

            this.loadDiseasesInformations();
            this.loadSelectedLaboratories();
            this.loadSelectedDiagnostics();
            // this.loadSelectedMedicines();
            this.loadSelectedProceduresAndInterventions();
        });
    }

    change(bool) {
        if (bool) {
            this.check = false;
        } else {
            this.check = true;
        }
    }

    setRows(id): void {
        const area = document.getElementById(id);
        if (this.visitContent.diseaseData[id] !== null && this.visitContent.diseaseData[id] !== undefined &&
            this.visitContent.diseaseData[id] !== '') {
            area.style.height = '1px';
            area.style.height = (25 + area.scrollHeight) + 'px';
        }
    }
}
