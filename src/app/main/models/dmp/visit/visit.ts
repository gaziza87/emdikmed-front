import {VisitMeasurement} from './visitMeasurement';

export class Visit {
    constructor(
        public id?: string,
        public name?: any,
        public description?: any,
        public visitContentId?: any,
        public patientId?: any,
        public organizationId?: any,
        public doctorId?: any,
        public checkFullFill?: any,
        public measurement?: VisitMeasurement,
        public visitDate?: any,
        public prevVisitId?: any,
        public counter?: any,
    ) {
        this.measurement = new VisitMeasurement();

    }
}
