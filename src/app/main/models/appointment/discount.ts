export class Discount {
    constructor(
        public id?: string,
        public name?: any,
        public description?: any,
        public condition?: any,
        public serviceId?: string,
        public percentage?: number,
        public organizationId?: string,
        public startData?: string,
        public endDate?: string,
        public state?: any
    ) {}

}
