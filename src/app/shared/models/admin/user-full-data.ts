import {UserAccount} from './user-account';
import {User} from './user';

export class UserFullData {

    constructor(
        public userId?: string,
        public user?: User,
        public userAccount?: UserAccount
    ) {
    }

}
