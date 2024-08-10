import { IUser } from './user';

export interface IShower {
    _id: string;
    occupied: {
        user: IUser | null;
        bookedAt: Date | null;
        bookedUntil: Date | null;
    };
}

export interface IShowers {
    showers: IShower[];
    price: number;
}
