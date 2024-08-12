import { FC, useRef } from 'react';

import Loading from 'components/common/loading/Loading';
import Error from 'components/common/error/Error';

import { IFuel, IOrderFuel, IRefuelData } from 'types/fuel';

import FuelList from './fuelList/FuelList';
import StationInfo from './stationInfo/StationInfo';

import styles from './HomeContent.module.css';

interface HomeContentProps {
    isAuth: boolean;
    isAdmin: boolean;
    isAddFuel: boolean;
    orderFuel: IOrderFuel;
    totalCost: number;
    fuels: IFuel[];
    status: 'loading' | 'loaded' | 'error';
    onAddOrderFuel: (orderFuel: IOrderFuel) => void;
    onRefuel: (refuelData: IRefuelData) => void;
    onResetOrder: () => void;
    onAddFuel: (fuel: Omit<IFuel, '_id'>) => void;
    onRemoveFuel: (fuelId: IFuel['_id']) => void;
}

const HomeContent: FC<HomeContentProps> = ({
    isAuth,
    isAdmin,
    isAddFuel,
    orderFuel,
    totalCost,
    fuels,
    status,
    onAddOrderFuel,
    onRefuel,
    onResetOrder,
    onAddFuel,
    onRemoveFuel,
}) => {
    const targetRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        if (targetRef.current) {
            targetRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className={styles.wrapper}>
            {status === 'loading' ? (
                <Loading />
            ) : status === 'error' ? (
                <Error />
            ) : (
                <FuelList
                    isAuth={isAuth}
                    isAdmin={isAdmin}
                    isAddFuel={isAddFuel}
                    fuels={fuels}
                    onAddOrderFuel={onAddOrderFuel}
                    onAddFuel={onAddFuel}
                    onRemoveFuel={onRemoveFuel}
                    handleScroll={handleScroll}
                />
            )}

            {!isAdmin && (
                <StationInfo
                    targetRef={targetRef}
                    orderFuel={orderFuel}
                    totalCost={totalCost}
                    onRefuel={onRefuel}
                    onResetOrder={onResetOrder}
                />
            )}
        </div>
    );
};

export default HomeContent;
