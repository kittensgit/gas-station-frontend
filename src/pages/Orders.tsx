import { FC, useEffect } from 'react';

import OrdersContent from 'components/ordersContent/OrdersContent';
import Loading from 'components/common/loading/Loading';
import Error from 'components/common/error/Error';
import EmptyList from 'components/common/emptyList/EmptyList';

import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { IUser } from 'types/user';
import { IOrder } from 'types/order';

import { changeStatusReady, fetchAllOrders } from '../redux/slices/orders';

const Orders: FC = () => {
    const dispatch = useAppDispatch();

    const { orders, status } = useAppSelector((state) => state.orders);

    useEffect(() => {
        dispatch(fetchAllOrders());
    }, [dispatch]);

    const onChangeStatusReady = (
        userId: IUser['_id'],
        orderId: IOrder['_id']
    ) => {
        dispatch(
            changeStatusReady({
                userId,
                orderId,
            })
        );
    };

    if (status === 'loading') {
        return <Loading />;
    }

    if (status === 'error') {
        return <Error />;
    }

    if (!orders.length) {
        return <EmptyList listName="Orders" />;
    }

    return (
        <OrdersContent
            orders={orders}
            onChangeStatusReady={onChangeStatusReady}
        />
    );
};

export default Orders;
