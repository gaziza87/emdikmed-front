import {User} from './user';
import {UserAccount} from './user-account';

export class UserDTO {
    userId: string;
    user: User;
    userAccount: UserAccount;
    healthStatus: number;
}
