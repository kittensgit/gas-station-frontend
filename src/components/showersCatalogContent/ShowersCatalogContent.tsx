import { ChangeEvent, FC, useEffect, useState } from 'react';

import { IShower, IShowers } from 'types/shower';

import plusIcon from 'assets/icons/plus.png';
import showerIcon from 'assets/icons/showerLg.png';
import addIcon from 'assets/icons/add.png';
import editIcon from 'assets/icons/edit.png';
import pointsIcon from 'assets/icons/points.png';

import Shower from './shower/Shower';

import styles from './ShowersCatalogContent.module.css';

interface ShowersCatalogContentProps {
    showers: IShower[];
    showerPrice: IShowers['price'];
    onAddShower: (quantity: number) => void;
    onRemoveShower: (showerId: IShower['_id']) => void;
    onUpdateShowerPrice: (showerPrice: number) => void;
}

const ShowersCatalogContent: FC<ShowersCatalogContentProps> = ({
    showers,
    showerPrice,
    onAddShower,
    onRemoveShower,
    onUpdateShowerPrice,
}) => {
    const [isEditShower, setIsEditShower] = useState<boolean>(false);
    const [isEditPrice, setIsEditPrice] = useState<boolean>(false);
    const [quantity, setQuantity] = useState<number>(1);
    const [updatedPrice, setUpdatedPrice] = useState<number>(showerPrice);

    useEffect(() => {
        setUpdatedPrice(showerPrice);
    }, [showerPrice]);

    const onChangeQuantity = (e: ChangeEvent<HTMLInputElement>) => {
        setQuantity(parseInt(e.target.value, 10));
    };

    const onChangeUpdatedPrice = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdatedPrice(parseInt(e.target.value, 10));
    };

    const toggleEditShower = () => {
        setIsEditShower(!isEditShower);
    };

    const toggleEditPrice = () => {
        setIsEditPrice(!isEditPrice);
    };

    const handleAddShower = () => {
        if (quantity) {
            onAddShower(quantity);
            toggleEditShower();
            setQuantity(1);
        } else {
            alert('Quantity will be greater than 0');
        }
    };

    const handleUpdateShowersPrice = () => {
        if (updatedPrice) {
            onUpdateShowerPrice(updatedPrice);
            toggleEditPrice();
        }
    };

    return (
        <div className={styles.showers_content}>
            <div className={styles.title}>
                <h1>
                    Shower price -{' '}
                    {isEditPrice ? (
                        <input
                            className={styles.price_input}
                            value={updatedPrice}
                            type="number"
                            placeholder="Price"
                            autoFocus
                            onChange={onChangeUpdatedPrice}
                        />
                    ) : (
                        <span>{showerPrice}</span>
                    )}
                </h1>
                {isEditPrice ? (
                    <button
                        className={styles.add}
                        onClick={handleUpdateShowersPrice}
                    >
                        <img src={addIcon} alt="add" />
                    </button>
                ) : (
                    <img src={pointsIcon} alt="points" />
                )}

                {!isEditPrice && (
                    <button
                        className={styles.edit_price}
                        onClick={toggleEditPrice}
                    >
                        <img src={editIcon} alt="edit price" />
                    </button>
                )}
            </div>
            <ul className={styles.showers}>
                <li className={styles.add_shower}>
                    {isEditShower ? (
                        <div className={styles.edit}>
                            <img
                                className={styles.shower_icon}
                                src={showerIcon}
                                alt="shower"
                            />
                            <div className={styles.edit_info}>
                                <p>Quantity:</p>
                                <input
                                    value={quantity}
                                    onChange={onChangeQuantity}
                                    type="number"
                                    placeholder="0"
                                />
                                <button
                                    onClick={handleAddShower}
                                    className={styles.add}
                                >
                                    <img src={addIcon} alt="add" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={toggleEditShower}
                            className={styles.plus}
                        >
                            <img src={plusIcon} alt="add" />
                        </button>
                    )}
                </li>
                {showers.map((item, index) => (
                    <Shower
                        key={item._id}
                        shower={item}
                        showerNum={index + 1}
                        onRemoveShower={onRemoveShower}
                    />
                ))}
            </ul>
        </div>
    );
};

export default ShowersCatalogContent;
