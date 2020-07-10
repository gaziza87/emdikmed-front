import {ROLE} from '../../../core/models/admin/role';

export class UserRoleOrgMap {
    userAccountId?: string;
    orgId: string;
    roles: ROLE[];
}
