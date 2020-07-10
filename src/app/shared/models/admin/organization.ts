export class Organization {
    id: string;
    parentId: string;
    isRootOrg: boolean;
    code: string;
    name: any;
    employeeCount: number;
    // Бик банка, в котором обслуживается данное юр.лицо
    bik: string;
    // Тип организации (1-клиника/больница, 2-диагностический центр, 3-аптека)
    orgTypeCode: string;
    address: string;
    phone: string[];
    photoId: string;
}
