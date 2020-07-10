export class Payment {
    constructor(
        public payment?: number,
        public patientAgree?: boolean,
        public serviceId?: string,
        public discountId?: string
    ) {}

}
