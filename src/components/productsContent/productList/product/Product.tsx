import { ChangeEvent, FC, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { IOrderProduct, IProduct } from 'types/product';

import mainIcon from 'assets/icons/mainLg.png';
import dessertIcon from 'assets/icons/dessertLg.png';
import drinksIcon from 'assets/icons/drinksLg.png';
import pointsIcon from 'assets/icons/points.png';
import addIcon from 'assets/icons/add.png';

import styles from './Product.module.css';

interface ProductProps {
    product: IProduct;
    productQuantity: number;
    isEditActive: boolean;
    isAuth: boolean;
    onChangeProductQuantity: (e: ChangeEvent<HTMLInputElement>) => void;
    handleAddOrderProduct: (product: IOrderProduct) => void;
    toggleEdit: (name: string) => void;
}

const Product: FC<ProductProps> = ({
    product,
    isAuth,
    isEditActive,
    productQuantity,
    toggleEdit,
    onChangeProductQuantity,
    handleAddOrderProduct,
}) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        if (isAuth) {
            toggleEdit(product.name);
        } else {
            navigate('/login');
        }
    };

    const addOrderProduct = () => {
        handleAddOrderProduct({
            productId: product._id,
            quantity: productQuantity,
            scoresCount: product.scoresCount * productQuantity,
        });
    };

    const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addOrderProduct();
        }
    };

    return (
        <li className={styles.product}>
            <div
                className={styles.productIcon}
                style={{
                    backgroundColor:
                        product.type === 'main'
                            ? '#FFD770'
                            : product.type === 'dessert'
                            ? '#F1A4DC'
                            : '#2C4260',
                }}
            >
                <img
                    src={
                        product.type === 'main'
                            ? mainIcon
                            : product.type === 'dessert'
                            ? dessertIcon
                            : drinksIcon
                    }
                    alt="product icon"
                />
            </div>
            <h3 className={styles.title}>{product.name}</h3>
            <div className={styles.info}>
                <b>
                    {product.scoresCount}
                    <img src={pointsIcon} alt="points" />
                </b>
                {isEditActive ? (
                    <div className={styles.edit}>
                        <p>Q:</p>
                        <input
                            value={productQuantity}
                            type="number"
                            placeholder="0"
                            name={product.name}
                            onChange={onChangeProductQuantity}
                            onKeyDown={handleEnter}
                        />
                        <button onClick={addOrderProduct}>
                            <img src={addIcon} alt="add" />
                        </button>
                    </div>
                ) : (
                    <button onClick={handleEdit} className={styles.btn}>
                        Order
                    </button>
                )}
            </div>
        </li>
    );
};

export default Product;
