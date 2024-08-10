import { ChangeEvent, FC } from 'react';

import locationIcon from 'assets/icons/location.png';
import stationIcon from 'assets/icons/station.png';

import styles from './Inputs.module.css';

interface InputsProps {
    stationName: string;
    location: string;
    onChangeStationInfo: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Inputs: FC<InputsProps> = ({
    stationName,
    location,
    onChangeStationInfo,
}) => {
    return (
        <div className={styles.inputs}>
            <div className={styles.input}>
                <img src={stationIcon} alt="station" />
                <input
                    value={stationName}
                    name="stationName"
                    type="text"
                    placeholder="Station name"
                    onChange={onChangeStationInfo}
                />
            </div>
            <div className={styles.input}>
                <img src={locationIcon} alt="location" />
                <input
                    value={location}
                    name="location"
                    type="text"
                    placeholder="Location"
                    onChange={onChangeStationInfo}
                />
            </div>
        </div>
    );
};

export default Inputs;
