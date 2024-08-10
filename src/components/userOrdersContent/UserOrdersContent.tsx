import { FC } from 'react';
import { IUserOrder, IUserOrderData } from 'types/order';

import UserOrder from './userOrder/UserOrder';

import styles from './UserOrdersContent.module.css';

interface UserOrdersContentProps {
    orders: IUserOrder[];
    onRemoveUserOrder: (orderId: IUserOrderData['orderId']) => void;
}

const UserOrdersContent: FC<UserOrdersContentProps> = ({
    orders,
    onRemoveUserOrder,
}) => {
    return (
        <ul className={styles.orders}>
            {orders.map((item) => (
                <UserOrder
                    key={item._id}
                    order={item}
                    onRemoveUserOrder={onRemoveUserOrder}
                />
            ))}
        </ul>
    );
};

export default UserOrdersContent;
