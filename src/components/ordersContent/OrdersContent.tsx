import { FC } from 'react';

import { IOrder } from 'types/order';
import { IUser } from 'types/user';

import Order from './order/Order';

import styles from './OrdersContent.module.css';

interface OrdersContentProps {
    orders: IOrder[];
    onChangeStatusReady: (userId: IUser['_id'], orderId: IOrder['_id']) => void;
}

const OrdersContent: FC<OrdersContentProps> = ({
    orders,
    onChangeStatusReady,
}) => {
    return (
        <div className={styles.orders}>
            {orders.map((item) => (
                <Order
                    key={item._id}
                    order={item}
                    onChangeStatusReady={onChangeStatusReady}
                />
            ))}
        </div>
    );
};

export default OrdersContent;
