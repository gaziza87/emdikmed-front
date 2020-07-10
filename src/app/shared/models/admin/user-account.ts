export class UserAccount {
    id: string;
    userId: string;
    username: string;
    password: string;
    active: boolean;
    signupToken: string;
    position: string;
    specialty: string;
    doctorCode: string;
    avatarId: string;
    imageUrl: string;
    aboutYourself: string;
    interfaceLang: string;
    sysRegDate: Date;
    userRoleOrgMapList: any[];
    isAutoRegistered: boolean;
    isRegularUser: boolean;
}
