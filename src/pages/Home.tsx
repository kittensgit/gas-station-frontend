import { FC, useEffect, useState } from 'react';
import { loadStripe, StripeError } from '@stripe/stripe-js';

import HomeContent from 'components/homeContent/HomeContent';
import Error from 'components/common/error/Error';

import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { useAuth } from 'hooks/useAuth';
import { IFuel, IOrderFuel, IRefuelData } from 'types/fuel';

import {
    addOrderFuel,
    fetchRefuel,
    removeOrderFuel,
} from '../redux/slices/refuel';
import { addFuel, fetchFuels, removeFuel } from '../redux/slices/fuels';

const stripePromise = loadStripe(
    'pk_test_51PWYf402vF6hOY02eEkeJtxfl6OPpJO1DgWyQp4QQ7ZYINWvDVpipn8oL13i0NfK6gyALs0CjS6FXlYVoj9ayVeU00IiLd8XXR'
);

const Home: FC = () => {
    const dispatch = useAppDispatch();

    const { isAuth, role } = useAuth();
    const { orderFuel, totalCost } = useAppSelector((state) => state.refuel);
    const { fuels, status } = useAppSelector((state) => state.fuels);

    useEffect(() => {
        dispatch(fetchFuels());
    }, [dispatch]);

    const isAddFuel = !!orderFuel.name;

    const isAdmin = role === 'admin';

    const [error, setError] = useState<StripeError | null>(null);

    // user

    const onAddOrderFuel = (orderFuel: IOrderFuel) => {
        dispatch(addOrderFuel(orderFuel));
    };

    const onResetOrder = () => {
        dispatch(removeOrderFuel());
    };

    const onRefuel = async (refuelData: IRefuelData) => {
        const { payload } = await dispatch(fetchRefuel(refuelData));

        const stripe = await stripePromise;
        if (stripe) {
            const { error } = await stripe.redirectToCheckout({
                sessionId: payload.sessionId,
            });
            if (error) {
                setError(error);
            }
            onResetOrder();
        }
    };

    // admin

    const onAddFuel = (fuel: Omit<IFuel, '_id'>) => {
        dispatch(addFuel(fuel));
    };

    const onRemoveFuel = (fuelId: IFuel['_id']) => {
        dispatch(removeFuel(fuelId));
    };

    if (error) {
        return <Error />;
    }

    return (
        <HomeContent
            isAuth={isAuth}
            isAdmin={isAdmin}
            isAddFuel={isAddFuel}
            orderFuel={orderFuel}
            totalCost={totalCost}
            fuels={fuels}
            status={status}
            onAddOrderFuel={onAddOrderFuel}
            onRefuel={onRefuel}
            onResetOrder={onResetOrder}
            onAddFuel={onAddFuel}
            onRemoveFuel={onRemoveFuel}
        />
    );
};

export default Home;
