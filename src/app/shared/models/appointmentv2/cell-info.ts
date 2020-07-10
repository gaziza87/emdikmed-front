export class CellInfo {

    constructor(
        public userId?: string,
        public userFullName?: string,
        public doctorId?: string,
        public doctorCode?: string,
        public doctorFullName?: string,
        public doctorSpecialty?: string,
        public appointDate?: any,
        public appointDateString?: string,
        public day?: string,
        public time?: number,
        public timeString?: string,
        public active?: boolean,
        public color?: string,
        public cellText?: string,
        public room?: string,
        public visitId?: string,
        public visitFulfilled?: boolean
    ) {
    }

}
