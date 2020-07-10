import {CellInfo} from '../models/appointmentv2/cell-info';
import {User} from '../models/admin/user';
import {UserFullData} from '../models/admin/user-full-data';

export class AppointmentData {

    private headers: any[] = [];
    private rows: any;
    private time: any[];

    constructor() {
        this.time = [
            { time: 8, timeString: '08:00', active: true},
            { time: 9, timeString: '09:00', active: true},
            { time: 10, timeString: '10:00', active: true},
            { time: 11, timeString: '11:00', active: true},
            { time: 12, timeString: '12:00', active: true},
            { time: 13, timeString: '13:00', active: true},
            { time: 14, timeString: '14:00', active: true},
            { time: 15, timeString: '15:00', active: true},
            { time: 16, timeString: '16:00', active: true},
            { time: 17, timeString: '17:00', active: true},
            { time: 18, timeString: '18:00', active: true},
            { time: 19, timeString: '19:00', active: true},
            { time: 20, timeString: '20:00', active: true},
            { time: 21, timeString: '21:00', active: false},
            { time: 22, timeString: '22:00', active: false},
            { time: 23, timeString: '23:00', active: false},
            { time: 24, timeString: '24:00', active: false},
            { time: 1, timeString: '01:00', active: false},
            { time: 2, timeString: '02:00', active: false},
            { time: 3, timeString: '03:00', active: false},
            { time: 4, timeString: '04:00', active: false},
            { time: 5, timeString: '05:00', active: false},
            { time: 6, timeString: '06:00', active: false},
            { time: 7, timeString: '07:00', active: false},
        ];
    }

    getRows(user: User, doctor: UserFullData, appointDate: any): any {
        this.rows = {};
        this.time.forEach(t => {
            this.rows[t.timeString] = this.genereateCell(t, user, doctor, appointDate);
        });
        return this.rows;
    }

    private genereateCell(time: any, user: User, doctor: UserFullData, headers: any[]): CellInfo[] {
        this.headers = headers;
        const cellInfoList = [];
        for (let i = 1; i < this.headers.length; i++) {
            const cellInfo = new CellInfo();

            // cellInfo.userId = user.id;
            // cellInfo.userFullName = user.surname + ' ' + user.name + ' ' + (user.middlename || '');
            cellInfo.doctorId = doctor.userId;
            cellInfo.doctorFullName = doctor.user.surname + ' ' + doctor.user.name + ' ' + (doctor.user.middlename || '');
            cellInfo.doctorCode = doctor.userAccount.doctorCode;
            cellInfo.doctorSpecialty = doctor.userAccount.specialty;
            cellInfo.day = this.headers[i].name;
            cellInfo.room = '';
            cellInfo.appointDate = this.headers[i].date;
            cellInfo.appointDateString = this.headers[i].dateString;
            cellInfo.time = time.time;
            cellInfo.timeString = time.timeString;
            cellInfo.active = time.active;
            cellInfo.color = 'lightgray';
            cellInfo.cellText = '';
            cellInfo.visitId = null;
            cellInfo.visitFulfilled = false;

            cellInfoList.push(cellInfo);
        }
        return cellInfoList;
    }

    public dateToString(date: any): string {
        // tslint:disable-next-line:one-variable-per-declaration
        let day, month, year;
        if (date instanceof Date) {
            day = date.getDate().toString();
            month = (date.getMonth() + 1).toString();
            year = date.getFullYear().toString();
        } else {
            if (date._i.date !== null && date._i.date !== undefined) {
                day = date._i.date.toString();
                month = (date._i.month + 1).toString();
                year = date._i.year;
            } else {
                let arr = [];
                if (date._i.includes('.')) {
                    arr = date._i.trim().split('.');
                } else if (date._i.includes('-')) {
                    arr = date._i.trim().split('-');
                } else if (date._i.includes('/')) {
                    arr = date._i.trim().split('/');
                }
                day = arr[0];
                month = arr[1];
                year = arr[2];
            }
        }
        if (day.length === 1) {
            day = '0' + day;
        }
        if (month.length === 1) {
            month = '0' + month;
        }
        return day + '-' + month + '-' + year;
    }

}
