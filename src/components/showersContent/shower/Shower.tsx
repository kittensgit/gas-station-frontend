import { FC, useEffect, useState } from 'react';

import showerIcon from 'assets/icons/showerLg.png';
import bookingIcon from 'assets/icons/book.png';

import { IShower } from 'types/shower';

import styles from './Shower.module.css';

interface ShowerProps {
    showerNum: number;
    shower: IShower;
    userShower: IShower;
    isAuth: boolean;
    onBookShower: (showerId: IShower['_id']) => void;
    onReleaseShower: (showerId: IShower['_id']) => void;
}

const Shower: FC<ShowerProps> = ({
    shower,
    showerNum,
    userShower,
    isAuth,
    onBookShower,
    onReleaseShower,
}) => {
    const [remainingTime, setRemainingTime] = useState<string | null>(null);

    const showerStatus = shower.occupied.user;

    useEffect(() => {
        if (shower.occupied.bookedUntil) {
            const interval = setInterval(() => {
                const now = new Date();
                const bookedUntil = new Date(shower.occupied.bookedUntil!);

                const timeDiff = bookedUntil.getTime() - now.getTime();

                if (timeDiff <= 0) {
                    setRemainingTime(null);
                    clearInterval(interval);
                    onReleaseShower(shower._id);
                } else {
                    const hours = Math.floor(
                        (timeDiff / (1000 * 60 * 60)) % 24
                    );
                    const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
                    const seconds = Math.floor((timeDiff / 1000) % 60);
                    setRemainingTime(
                        `${hours.toString().padStart(2, '0')}:${minutes
                            .toString()
                            .padStart(2, '0')}:${seconds
                            .toString()
                            .padStart(2, '0')}`
                    );
                }
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [shower.occupied.bookedUntil]);

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
                        {isAuth && !showerStatus && !userShower && (
                            <button
                                className={styles.booking}
                                onClick={() => onBookShower(shower._id)}
                            >
                                <img src={bookingIcon} alt="booking" />
                            </button>
                        )}
                    </span>
                </p>
                {userShower === shower && remainingTime && (
                    <p className={styles.time}>{remainingTime}</p>
                )}
            </div>
        </li>
    );
};

export default Shower;
