import { ChangeEvent, FC, useState } from 'react';

import plusIcon from 'assets/icons/plus.png';
import fuelIcon from 'assets/icons/fuelSm.png';

import { IFuel } from 'types/fuel';

import styles from './AddFuel.module.css';

interface AddFuelProps {
    onAddFuel: (fuel: Omit<IFuel, '_id'>) => void;
}

const AddFuel: FC<AddFuelProps> = ({ onAddFuel }) => {
    const [editFuel, setEditFuel] = useState<boolean>(false);

    const [color, setColor] = useState<string>('#80b7a9');
    const [name, setName] = useState<string>('');
    const [iconName, setIconName] = useState<string>('');
    const [pricePerLiter, setPricePerLiter] = useState<number>(1);
    const [pointsPerLiter, setPointsPerLiter] = useState<number>(1);
    const [discount, setDiscount] = useState<number>(0);

    const toggleEdit = () => {
        setEditFuel(!editFuel);
    };

    const handleChange =
        <T,>(
            setter: React.Dispatch<React.SetStateAction<T>>,
            parse: (value: string) => T
        ) =>
        (e: ChangeEvent<HTMLInputElement>) => {
            setter(parse(e.target.value));
        };

    const handleAddFuel = () => {
        if (name && iconName) {
            onAddFuel({
                color,
                discount,
                logo: iconName,
                name,
                price: pricePerLiter,
                scores: pointsPerLiter,
            });
            toggleEdit();
            setColor('');
            setName('');
            setIconName('');
            setDiscount(0);
            setPointsPerLiter(1);
            setPricePerLiter(1);
        }
    };

    return (
        <li className={styles.add_fuel}>
            {editFuel ? (
                <div className={styles.edit}>
                    <div
                        className={styles.fuel_icon}
                        style={{ backgroundColor: color }}
                    >
                        <img src={fuelIcon} alt="fuel" />
                    </div>
                    <div className={styles.edit_info}>
                        <div className={styles.info_item}>
                            <p>Name:</p>
                            <input
                                className={styles.lg_input}
                                type="text"
                                placeholder="Gasoline AI-95"
                                value={name}
                                onChange={handleChange<string>(
                                    setName,
                                    (value) => value
                                )}
                            />
                        </div>
                        <div className={styles.info_item}>
                            <p>Icon name:</p>
                            <input
                                className={styles.sm_input}
                                type="text"
                                placeholder="95"
                                value={iconName}
                                onChange={handleChange<string>(
                                    setIconName,
                                    (value) => value
                                )}
                                maxLength={2}
                            />
                        </div>
                        <div className={styles.info_item}>
                            <p>Price per liter:</p>
                            <input
                                className={styles.sm_input}
                                type="number"
                                placeholder="$"
                                value={pricePerLiter}
                                onChange={handleChange<number>(
                                    setPricePerLiter,
                                    parseFloat
                                )}
                            />
                        </div>
                        <div className={styles.info_item}>
                            <p>Points per liter:</p>
                            <input
                                className={styles.sm_input}
                                type="number"
                                placeholder="0"
                                value={pointsPerLiter}
                                onChange={handleChange<number>(
                                    setPointsPerLiter,
                                    (value) => parseInt(value, 10)
                                )}
                            />
                        </div>
                        <div className={styles.info_item}>
                            <p>Color icon:</p>
                            <input
                                className={styles.color_input}
                                type="color"
                                value={color}
                                onChange={handleChange<string>(
                                    setColor,
                                    (value) => value
                                )}
                            />
                        </div>
                        <div className={styles.info_item}>
                            <p>Discount:</p>
                            <input
                                className={styles.sm_input}
                                type="number"
                                placeholder="%"
                                value={discount}
                                onChange={handleChange<number>(
                                    setDiscount,
                                    (value) => parseInt(value, 10)
                                )}
                            />
                        </div>
                    </div>
                    <button className={styles.add} onClick={handleAddFuel}>
                        Add
                    </button>
                </div>
            ) : (
                <button onClick={toggleEdit} className={styles.plus}>
                    <img src={plusIcon} alt="plus" />
                </button>
            )}
        </li>
    );
};

export default AddFuel;
