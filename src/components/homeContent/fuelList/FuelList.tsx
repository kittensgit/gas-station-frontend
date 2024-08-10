import { ChangeEvent, FC, useState } from 'react';

import { IFuel, IOrderFuel } from 'types/fuel';

import AddFuel from '../addFuel/AddFuel';

import FuelItem from './fuelItem/FuelItem';

import styles from './FuelList.module.css';

interface FuelListProps {
    isAuth: boolean;
    isAdmin: boolean;
    isAddFuel: boolean;
    fuels: IFuel[];
    onAddOrderFuel: (orderFuel: IOrderFuel) => void;
    onAddFuel: (fuel: Omit<IFuel, '_id'>) => void;
    onRemoveFuel: (fuelId: IFuel['_id']) => void;
}

const FuelList: FC<FuelListProps> = ({
    isAuth,
    isAddFuel,
    isAdmin,
    fuels,
    onAddOrderFuel,
    onAddFuel,
    onRemoveFuel,
}) => {
    const [literQuantity, setLiterQuantity] = useState(1);
    const [activeFuel, setActiveFuel] = useState<string | null>(null);

    const onChangeLiterQuantity = (e: ChangeEvent<HTMLInputElement>) => {
        setLiterQuantity(parseInt(e.target.value, 10));
    };

    const toggleActiveFuelEdit = (name: string) => {
        setActiveFuel(name);
    };

    const handleAddOrderFuel = (fuel: IOrderFuel) => {
        onAddOrderFuel(fuel);
        setActiveFuel(null);
        setLiterQuantity(1);
    };

    return (
        <ul className={styles.list}>
            {isAdmin && <AddFuel onAddFuel={onAddFuel} />}
            {fuels.map((item) => (
                <FuelItem
                    key={item._id}
                    fuel={item}
                    literQuantity={literQuantity}
                    isEditActive={activeFuel === item.name}
                    isAddFuel={isAddFuel}
                    isAuth={isAuth}
                    isAdmin={isAdmin}
                    onChangeLiterQuantity={onChangeLiterQuantity}
                    onAddOrderFuel={handleAddOrderFuel}
                    toggleEdit={toggleActiveFuelEdit}
                    onRemoveFuel={onRemoveFuel}
                />
            ))}
        </ul>
    );
};

export default FuelList;
