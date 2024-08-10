import { ChangeEvent, FC, useState } from 'react';

import { IOrderProduct, IProduct } from 'types/product';

import Product from './product/Product';

import styles from './ProductList.module.css';

interface ProductListProps {
    isAuth: boolean;
    products: IProduct[];
    onAddOrderProduct: (product: IOrderProduct) => void;
}

const ProductList: FC<ProductListProps> = ({
    isAuth,
    products,
    onAddOrderProduct,
}) => {
    const [productQuantity, setProductQuantity] = useState(1);
    const [activeProduct, setActiveProduct] = useState<string | null>(null);

    const onChangeProductQuantity = (e: ChangeEvent<HTMLInputElement>) => {
        setProductQuantity(parseInt(e.target.value, 10));
    };

    const toggleEdit = (name: string) => {
        setActiveProduct(name);
    };

    const handleAddOrderProduct = (product: IOrderProduct) => {
        onAddOrderProduct(product);
        setActiveProduct(null);
    };

    return (
        <ul className={styles.products}>
            {products.map((product) => (
                <Product
                    key={product._id}
                    product={product}
                    isAuth={isAuth}
                    productQuantity={productQuantity}
                    isEditActive={activeProduct === product.name}
                    toggleEdit={toggleEdit}
                    handleAddOrderProduct={handleAddOrderProduct}
                    onChangeProductQuantity={onChangeProductQuantity}
                />
            ))}
        </ul>
    );
};

export default ProductList;
