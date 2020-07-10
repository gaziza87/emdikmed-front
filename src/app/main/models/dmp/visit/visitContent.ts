import {DiseaseData} from '../configuration/disease-data';

export class VisitContent {
    constructor(
        public id?: string,
        public diseaseData?: DiseaseData,
        public whichTemplatesAdded?: any,
        public nextVisitDate?: any,
        public checkFullFill?: boolean,
        public selectedDiseaseIds?: any,
        public selectedDiagnosticIds?: any,
        public selectedLaboratoryIds?: any,
        public selectedMedicineIds?: any,
        public selectedMediaContentIds?: any,
        public selectedProceduresAndInterventionsIds?: any,
        public state?: any,
    ) {}
}
