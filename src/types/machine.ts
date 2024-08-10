import { IUser } from './user';

export interface IMachine {
    _id: string;
    occupied: {
        user: IUser;
        bookedAt: Date;
        bookedUntil: Date;
    };
}

export interface IMachines {
    machines: IMachine[];
    price: number;
}
