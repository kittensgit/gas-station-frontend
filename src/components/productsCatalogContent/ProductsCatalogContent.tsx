import { ChangeEvent, FC, KeyboardEvent, useState } from 'react';

import { IProduct } from 'types/product';

import plusIcon from 'assets/icons/plus.png';
import addIcon from 'assets/icons/add_mark.png';

import Product from './product/Product';

import styles from './ProductsCatalogContent.module.css';

interface ProductsCatalogContentProps {
    products: IProduct[];
    onAddProduct: (product: Omit<IProduct, '_id'>) => void;
    onRemoveProduct: (productId: IProduct['_id']) => void;
}

const ProductsCatalogContent: FC<ProductsCatalogContentProps> = ({
    products,
    onAddProduct,
    onRemoveProduct,
}) => {
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [scoresCount, setScoresCount] = useState<number>(1);
    const [type, setType] = useState<IProduct['type']>('main');

    const toggleEdit = () => {
        setIsEdit(!isEdit);
    };

    const toggleType = (type: IProduct['type']) => {
        setType(type);
    };

    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };
    const onChangeScoresCount = (e: ChangeEvent<HTMLInputElement>) => {
        setScoresCount(parseInt(e.target.value, 10));
    };

    const handleAddProduct = () => {
        if (type && scoresCount > 0 && name) {
            onAddProduct({
                name,
                scoresCount,
                type,
            });
            toggleEdit();
            setType('main');
        }
    };

    const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleAddProduct();
        }
    };

    return (
        <ul className={styles.products}>
            <li className={styles.add_product}>
                {isEdit ? (
                    <div className={styles.edit}>
                        <div className={styles.inputs}>
                            <input
                                value={name}
                                className={styles.name}
                                type="text"
                                placeholder="Name"
                                onChange={onChangeName}
                            />
                            <input
                                value={scoresCount}
                                className={styles.cost}
                                type="number"
                                placeholder="Price"
                                onChange={onChangeScoresCount}
                                onKeyDown={handleEnter}
                            />
                        </div>
                        <div className={styles.edit_info}>
                            <ul className={styles.type}>
                                <li
                                    onClick={() => toggleType('main')}
                                    className={
                                        type === 'main' ? styles.active : ''
                                    }
                                >
                                    Main
                                </li>
                                <li
                                    onClick={() => toggleType('dessert')}
                                    className={
                                        type === 'dessert' ? styles.active : ''
                                    }
                                >
                                    Dessert
                                </li>
                                <li
                                    onClick={() => toggleType('drinks')}
                                    className={
                                        type === 'drinks' ? styles.active : ''
                                    }
                                >
                                    Drinks
                                </li>
                            </ul>
                            <button
                                onClick={handleAddProduct}
                                className={styles.edit_add}
                            >
                                <img src={addIcon} alt="checkmark" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <button onClick={toggleEdit} className={styles.add}>
                        <img src={plusIcon} alt="plus" />
                    </button>
                )}
            </li>
            {products.map((item) => (
                <Product
                    key={item._id}
                    product={item}
                    onRemoveProduct={onRemoveProduct}
                />
            ))}
        </ul>
    );
};

export default ProductsCatalogContent;
