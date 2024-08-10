import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Loading from 'components/common/loading/Loading';
import EmptyList from 'components/common/emptyList/EmptyList';

import { IOrderProduct, IProduct } from 'types/product';

import foodIcon from 'assets/icons/meal.png';
import mainIcon from 'assets/icons/mainSm.png';
import dessertIcon from 'assets/icons/dessertSm.png';
import drinksIcon from 'assets/icons/drinksSm.png';

import ProductList from './productList/ProductList';

import styles from './ProductsContent.module.css';

interface ProductsContentProps {
    isAuth: boolean;
    products: IProduct[];
    status: 'loading' | 'error' | 'loaded';
    onAddOrderProduct: (product: IOrderProduct) => void;
}

const ProductsContent: FC<ProductsContentProps> = ({
    products,
    isAuth,
    status,
    onAddOrderProduct,
}) => {
    const { pathname } = useLocation();

    return (
        <div className={styles.wrapper}>
            <ul className={styles.links}>
                <Link to={'/products/all'}>
                    <li
                        className={
                            pathname === '/products/all' ? styles.active : ''
                        }
                    >
                        <img src={foodIcon} alt="food icon" /> All
                    </li>
                </Link>
                <Link to={'/products/main'}>
                    <li
                        className={
                            pathname === '/products/main' ? styles.active : ''
                        }
                    >
                        <img src={mainIcon} alt="main food icon" /> Main
                    </li>
                </Link>
                <Link to={'/products/dessert'}>
                    <li
                        className={
                            pathname === '/products/dessert'
                                ? styles.active
                                : ''
                        }
                    >
                        <img src={dessertIcon} alt="dessert icon" /> Dessert
                    </li>
                </Link>
                <Link to={'/products/drinks'}>
                    <li
                        className={
                            pathname === '/products/drinks' ? styles.active : ''
                        }
                    >
                        <img src={drinksIcon} alt="drinks icon" /> Drinks
                    </li>
                </Link>
            </ul>
            {status === 'loading' ? (
                <Loading />
            ) : products.length ? (
                <ProductList
                    isAuth={isAuth}
                    products={products}
                    onAddOrderProduct={onAddOrderProduct}
                />
            ) : (
                <EmptyList listName="Products" />
            )}
        </div>
    );
};

export default ProductsContent;
