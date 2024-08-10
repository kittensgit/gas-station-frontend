import { ChangeEvent, FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { IFuel, IOrderFuel } from 'types/fuel';

import addIcon from 'assets/icons/add.png';
import pointsIcon from 'assets/icons/points.png';
import removeIcon from 'assets/icons/delete.png';

import styles from './FuelItem.module.css';

interface FuelItemProps {
    fuel: IFuel;
    literQuantity: number;
    isEditActive: boolean;
    isAddFuel: boolean;
    isAuth: boolean;
    isAdmin: boolean;
    onChangeLiterQuantity: (e: ChangeEvent<HTMLInputElement>) => void;
    onAddOrderFuel: (fuel: IOrderFuel) => void;
    toggleEdit: (name: string) => void;
    onRemoveFuel: (fuelId: IFuel['_id']) => void;
}

const FuelItem: FC<FuelItemProps> = ({
    fuel,
    literQuantity,
    isEditActive,
    isAddFuel,
    isAuth,
    isAdmin,
    onChangeLiterQuantity,
    onAddOrderFuel,
    toggleEdit,
    onRemoveFuel,
}) => {
    const navigate = useNavigate();
    const { color, logo, name, price, discount, scores, _id } = fuel;

    const addOrderFuel = () => {
        const newOrderFuel: IOrderFuel = {
            color,
            name,
            price,
            literQuantity,
            discount,
            scores,
        };
        onAddOrderFuel(newOrderFuel);
    };

    const handleEdit = () => {
        if (isAuth) {
            toggleEdit(name);
        } else {
            navigate('/login');
        }
    };

    return (
        <li className={styles.fuel}>
            {discount !== 0 && (
                <div className={styles.discount}>
                    <div className={styles.discount_procent}>
                        <span>-{discount}%</span>
                    </div>
                </div>
            )}
            <div className={styles.fuelIcon} style={{ backgroundColor: color }}>
                <span>{logo}</span>
            </div>
            <h3 className={styles.title}>{name}</h3>
            <div className={styles.price}>
                <p>${price}</p>
                {isAdmin ? (
                    <div className={styles.scores}>
                        <p>{scores}</p>
                        <img src={pointsIcon} alt="scores" />
                    </div>
                ) : isEditActive ? (
                    <div className={styles.edit}>
                        <p>L:</p>
                        <input
                            value={literQuantity}
                            type="number"
                            placeholder="0"
                            name={name}
                            onChange={onChangeLiterQuantity}
                        />
                        <button onClick={addOrderFuel}>
                            <img src={addIcon} alt="add" />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={handleEdit}
                        className={styles.btn}
                        disabled={isAddFuel}
                    >
                        +
                    </button>
                )}
            </div>
            {isAdmin && (
                <button
                    className={styles.remove}
                    onClick={() => onRemoveFuel(_id)}
                >
                    <img src={removeIcon} alt="remove" />
                </button>
            )}
        </li>
    );
};

export default FuelItem;
