import { FC } from 'react';

import { IOrderFuel } from 'types/fuel';

import fuelSmIcon from 'assets/icons/fuelSm.png';

import styles from './Fuel.module.css';

interface FuelProps {
    orderFuel: IOrderFuel;
}

const Fuel: FC<FuelProps> = ({ orderFuel }) => {
    return (
        <div className={styles.fuel}>
            <div className={styles.fuel_info}>
                <div
                    className={styles.fuel_image}
                    style={{
                        backgroundColor: `${orderFuel.color}`,
                    }}
                >
                    <img src={fuelSmIcon} alt="fuel sm" />
                </div>
                <div className={styles.fuel_about}>
                    <h4>{orderFuel.name}</h4>
                    <p>{orderFuel.literQuantity}L</p>
                </div>
            </div>
            <b className={styles.fuel_price}>${orderFuel.price}</b>
        </div>
    );
};

export default Fuel;
