export class Appointment {

    constructor(
        public id?: string,
        public organizationId?: string,
        public doctorId?: string,
        public from?: any,
        public due?: any,
        public fromString?: string,
        public dueString?: string,
        public cellInfoMap?: any,
        public state?: any,
    ) {

    }

}
