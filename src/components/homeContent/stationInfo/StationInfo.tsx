import { ChangeEvent, FC, useState } from 'react';

import { IOrderFuel, IRefuelData } from 'types/fuel';

import fuelLgIcon from 'assets/icons/fuelLg.png';
import resetIcon from 'assets/icons/reset.png';

import Calculations from './calculations/Calculations';
import Inputs from './inputs/Inputs';
import Fuel from './fuel/Fuel';

import styles from './StationInfo.module.css';

interface StationInfoProps {
    orderFuel: IOrderFuel;
    totalCost: number;
    onRefuel: (refuelData: IRefuelData) => void;
    onResetOrder: () => void;
}

const StationInfo: FC<StationInfoProps> = ({
    orderFuel,
    totalCost,
    onRefuel,
    onResetOrder,
}) => {
    const { literQuantity, name, price, scores, discount } = orderFuel;

    const totalDiscount = +(totalCost * (discount / 100)).toFixed(2);

    const totalScores = scores * literQuantity;

    const subTotal = +totalCost.toFixed(2);

    const total = +(subTotal - totalDiscount).toFixed(2);

    const costPerLiterWithDiscount = price - price * (discount / 100);

    const [stationInfo, setStationInfo] = useState({
        stationName: '',
        location: '',
    });

    const onChangeStationInfo = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setStationInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRefuel = async () => {
        onRefuel({
            ...stationInfo,
            cost: total,
            costPerLiter: discount ? costPerLiterWithDiscount : price,
            scores: totalScores,
            litersFilled: literQuantity,
            fuelName: name,
        });
    };

    const handleReset = () => {
        setStationInfo({
            stationName: '',
            location: '',
        });
        onResetOrder();
    };

    return (
        <div className={styles.info}>
            <div className={styles.about}>
                <div className={styles.title}>
                    <h2>Gas station</h2>
                    {name && (
                        <button onClick={handleReset} className={styles.reset}>
                            <img src={resetIcon} alt="reset" />
                        </button>
                    )}
                </div>
                <Inputs
                    location={stationInfo.location}
                    stationName={stationInfo.stationName}
                    onChangeStationInfo={onChangeStationInfo}
                />
            </div>
            {name ? (
                <Fuel orderFuel={orderFuel} />
            ) : (
                <div className={styles.fuelIcon}>
                    <img src={fuelLgIcon} alt="fuel lg" />
                    <p>Add refuel to the cart</p>
                </div>
            )}

            {subTotal !== 0 && (
                <Calculations
                    discount={totalDiscount}
                    scores={totalScores}
                    subTotal={subTotal}
                />
            )}

            {total !== 0 && (
                <div className={styles.totalCost}>
                    <p>Total cost: </p>
                    <b>${total}</b>
                </div>
            )}

            <button
                onClick={handleRefuel}
                disabled={!stationInfo.stationName && !stationInfo.location}
                className={
                    !!name && !!stationInfo.location
                        ? `${styles.activePay} ${styles.pay}`
                        : `${styles.disabledPay} ${styles.pay}`
                }
            >
                Pay
            </button>
        </div>
    );
};

export default StationInfo;
