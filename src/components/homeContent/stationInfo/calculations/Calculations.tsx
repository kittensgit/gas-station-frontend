import { FC } from 'react';

import pointsIcon from 'assets/icons/points_green.png';

import styles from './Calculations.module.css';

interface CalculationsProps {
    subTotal: number;
    discount?: number;
    scores: number;
}

const Calculations: FC<CalculationsProps> = ({
    subTotal,
    discount,
    scores,
}) => {
    return (
        <div className={styles.calculations}>
            <div className={styles.calc_item}>
                <p>Subtotal</p>
                <b>${subTotal}</b>
            </div>
            <div className={styles.calc_item}>
                <p>Discount</p>
                <b>-${discount ? discount : '0.00'}</b>
            </div>
            <div className={styles.calc_item}>
                <p>Bonus(points)</p>
                <b>
                    {scores}
                    <img src={pointsIcon} alt="points" />
                </b>
            </div>
        </div>
    );
};

export default Calculations;
