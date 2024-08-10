import { FC } from 'react';

import { IOrder } from 'types/order';
import { IUser } from 'types/user';
import { formatOrderDate } from 'helpers';

import pointsIcon from 'assets/icons/points.png';

import styles from './Order.module.css';

interface OrderProps {
    order: IOrder;
    onChangeStatusReady: (userId: IUser['_id'], orderId: IOrder['_id']) => void;
}

const Order: FC<OrderProps> = ({ order, onChangeStatusReady }) => {
    return (
        <div className={styles.order}>
            <div className={styles.order_top}>
                <p>{order.user.fullName}</p>
            </div>
            <ul className={styles.order_list}>
                {order.orders.map((item) => {
                    const {
                        product,
                        quantity,
                        totalScores,
                        orderDate,
                        statusReady,
                        _id,
                    } = item;
                    return (
                        <li className={styles.order_item} key={_id}>
                            <p>{product.name}</p>
                            <p className={styles.quantity}>×{quantity}</p>
                            <div className={styles.price}>
                                <p>{totalScores}</p>
                                <img src={pointsIcon} alt="points" />
                            </div>
                            <p className={styles.date}>
                                {formatOrderDate(orderDate)}
                            </p>
                            <button
                                className={styles.status}
                                onClick={() =>
                                    onChangeStatusReady(order.user._id, _id)
                                }
                            >
                                <div
                                    className={
                                        statusReady
                                            ? styles.green_circle
                                            : styles.yellow_circle
                                    }
                                ></div>
                                <p>{statusReady ? 'Ready' : 'Preparing'}</p>
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Order;
