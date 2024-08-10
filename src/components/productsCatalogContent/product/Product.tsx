import { FC } from 'react';

import { IProduct } from 'types/product';

import mainIcon from 'assets/icons/mainLg.png';
import dessertIcon from 'assets/icons/dessertLg.png';
import drinksIcon from 'assets/icons/drinksLg.png';
import pointsIcon from 'assets/icons/points.png';
import removeIcon from 'assets/icons/remove.png';

import styles from './Product.module.css';

interface ProductProps {
    product: IProduct;
    onRemoveProduct: (productId: IProduct['_id']) => void;
}

const Product: FC<ProductProps> = ({ product, onRemoveProduct }) => {
    const { type, name, scoresCount, _id } = product;
    const productIcon =
        type === 'main'
            ? mainIcon
            : type === 'dessert'
            ? dessertIcon
            : drinksIcon;
    const productIconColor =
        type === 'main'
            ? styles.main
            : type === 'dessert'
            ? styles.dessert
            : styles.drink;

    const handleRemoveProduct = () => {
        onRemoveProduct(_id);
    };

    return (
        <li className={styles.product}>
            <div className={`${styles.productIcon} ${productIconColor}`}>
                <img src={productIcon} alt="product" />
            </div>
            <div className={styles.product_info}>
                <h3>{name}</h3>
                <div className={styles.cost}>
                    <p>{scoresCount}</p>
                    <img src={pointsIcon} alt="points" />
                </div>
            </div>
            <button className={styles.remove} onClick={handleRemoveProduct}>
                <img src={removeIcon} alt="remove" />
            </button>
        </li>
    );
};

export default Product;
