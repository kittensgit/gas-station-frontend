import { FC } from 'react';

import Loading from 'components/common/loading/Loading';

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
    return (
        <div className={styles.wrapper}>
            {status === 'loading' ? (
                <Loading />
            ) : (
                <FuelList
                    isAuth={isAuth}
                    isAdmin={isAdmin}
                    isAddFuel={isAddFuel}
                    fuels={fuels}
                    onAddOrderFuel={onAddOrderFuel}
                    onAddFuel={onAddFuel}
                    onRemoveFuel={onRemoveFuel}
                />
            )}

            {!isAdmin && (
                <StationInfo
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
