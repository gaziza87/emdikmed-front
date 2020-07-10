import {AppointmentCondition} from './appointment-condition';
import {CellInfo} from './cell-info';

export class Appointment {
    id?: string;
    organizationId?: string;
    userId?: string;
    doctorId?: string;
    serviceId?: string;
    appointDate?: Date;
    appointmentCondition: AppointmentCondition;
    cellInfo?: CellInfo;
    payment: string[];
}
