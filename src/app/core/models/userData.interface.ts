import { Roles } from './roles.interface';
export interface UserData {
    uid: string;
    imgUrl: string;
    name: string;
    email: string;
    roles: Roles;
    organization: string;
    registered: string;
}



