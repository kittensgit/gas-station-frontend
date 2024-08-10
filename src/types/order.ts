import { IProduct } from './product';
import { IUser } from './user';

export interface IUserOrderData {
    userId: string;
    orderId: string;
}

export interface IUserOrder {
    _id: string;
    product: IProduct;
    quantity: number;
    totalScores: number;
    statusReady: boolean;
    orderDate: Date;
    readyTime: Date;
    endReadyTime: Date;
}

export interface IOrder {
    _id: string;
    user: IUser;
    orders: IUserOrder[];
}
