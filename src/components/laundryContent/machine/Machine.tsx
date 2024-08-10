import { FC, useEffect, useState } from 'react';

import { IMachine } from 'types/machine';

import machineIcon from 'assets/icons/washing_machine.png';
import bookingIcon from 'assets/icons/book.png';

import styles from './Machine.module.css';

interface MachineProps {
    machine: IMachine;
    machineNum: number;
    userMachine: IMachine;
    onReleaseMachine: (machineId: IMachine['_id']) => void;
    onBookMachine: (machineId: IMachine['_id']) => void;
}

const Machine: FC<MachineProps> = ({
    machine,
    machineNum,
    userMachine,
    onBookMachine,
    onReleaseMachine,
}) => {
    const [remainingTime, setRemainingTime] = useState<string | null>(null);

    const machineStatus = machine.occupied.user;

    useEffect(() => {
        if (machine.occupied.bookedUntil) {
            const interval = setInterval(() => {
                const now = new Date();
                const bookedUntil = new Date(machine.occupied.bookedUntil);

                const timeDiff = bookedUntil.getTime() - now.getTime();

                if (timeDiff <= 0) {
                    setRemainingTime(null);
                    clearInterval(interval);
                    onReleaseMachine(machine._id);
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
    }, [machine.occupied.bookedUntil]);

    return (
        <li className={styles.machine}>
            <img
                className={styles.machine_img}
                src={machineIcon}
                alt="machine"
            />
            <div className={styles.machine_info}>
                <h4>
                    Wash Machine <span>#{machineNum}</span>
                </h4>
                <p className={styles.status}>
                    Status:
                    <span
                        className={
                            machineStatus ? styles.occupied : styles.free
                        }
                    >
                        {machineStatus ? 'Occupied' : 'Free'}
                        {!machineStatus && !userMachine && (
                            <button
                                className={styles.booking}
                                onClick={() => onBookMachine(machine._id)}
                            >
                                <img src={bookingIcon} alt="booking" />
                            </button>
                        )}
                    </span>
                </p>
                {userMachine === machine && remainingTime && (
                    <p className={styles.time}>{remainingTime}</p>
                )}
            </div>
        </li>
    );
};

export default Machine;
