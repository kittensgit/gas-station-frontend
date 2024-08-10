import { IRefuelHistory } from './fuel';

export interface IUser {
    _id: string;
    fullName: string;
    email: string;
    scores: number;
    role: string;
    refuelingHistory: IRefuelHistory[];
}

export interface IUserRoleData {
    userId: IUser['_id'];
    role: IUser['role'];
}
