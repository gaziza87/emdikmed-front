export class VisitMeasurement {
    constructor(
        public height?: any,
        public weight?: any,
        public bmi?: any,
        public adSys?: any,
        public adDys?: any,
        public ad?: any,
    ) {
        this.height = '';
        this.weight = '';
        this.bmi = '';
        this.adSys = ['', '', ''];
        this.adDys = ['', '', ''];
        this.ad = '';
    }
}
