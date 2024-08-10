import { FC } from 'react';

import { IMachine } from 'types/machine';

import machineIcon from 'assets/icons/washing_machine.png';
import removeIcon from 'assets/icons/remove.png';

import styles from './Machine.module.css';

interface MachineProps {
    machine: IMachine;
    machineNum: number;
    onRemoveMachine: (machineId: IMachine['_id']) => void;
}

const Machine: FC<MachineProps> = ({
    machine,
    machineNum,
    onRemoveMachine,
}) => {
    const machineStatus = machine.occupied.user;
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
                    </span>
                </p>
            </div>
            <button
                onClick={() => onRemoveMachine(machine._id)}
                className={styles.remove}
            >
                <img src={removeIcon} alt="remove" />
            </button>
        </li>
    );
};

export default Machine;
