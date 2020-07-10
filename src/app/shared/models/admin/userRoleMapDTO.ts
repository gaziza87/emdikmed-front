import {User} from './user';
import {UserRoleOrgMap} from './userRoleOrgMap';

export class UserRoleMapDTO {
    user: User;
    userRoleOrgMapList: UserRoleOrgMap[];
    password: string;
}
