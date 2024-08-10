import { FC } from 'react';

import { IShower } from 'types/shower';

import showerIcon from 'assets/icons/showerLg.png';
import removeIcon from 'assets/icons/remove.png';

import styles from './Shower.module.css';

interface ShowerProps {
    shower: IShower;
    showerNum: number;
    onRemoveShower: (showerId: IShower['_id']) => void;
}

const Shower: FC<ShowerProps> = ({ shower, showerNum, onRemoveShower }) => {
    const showerStatus = shower.occupied.user;

    return (
        <li className={styles.shower}>
            <img className={styles.shower_img} src={showerIcon} alt="shower" />
            <div className={styles.shower_info}>
                <h4>
                    Shower <span>#{showerNum}</span>
                </h4>
                <p className={styles.status}>
                    Status:
                    <span
                        className={showerStatus ? styles.occupied : styles.free}
                    >
                        {showerStatus ? 'Occupied' : 'Free'}
                    </span>
                </p>
            </div>
            <button
                onClick={() => onRemoveShower(shower._id)}
                className={styles.remove}
            >
                <img src={removeIcon} alt="remove" />
            </button>
        </li>
    );
};

export default Shower;
