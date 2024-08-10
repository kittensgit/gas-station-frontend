import { FC, useEffect } from 'react';

import ProductsCatalogContent from 'components/productsCatalogContent/ProductsCatalogContent';
import Loading from 'components/common/loading/Loading';
import Error from 'components/common/error/Error';

import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { IProduct } from 'types/product';

import {
    addProduct,
    deleteProduct,
    fetchProducts,
} from '../redux/slices/products';

const ProductsCatalog: FC = () => {
    const dispatch = useAppDispatch();

    const { products, status } = useAppSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts('all'));
    }, [dispatch]);

    const onAddProduct = (product: Omit<IProduct, '_id'>) => {
        dispatch(addProduct(product));
    };

    const onRemoveProduct = (productId: IProduct['_id']) => {
        dispatch(deleteProduct(productId));
    };

    if (status === 'loading') {
        return <Loading />;
    }

    if (status === 'error') {
        return <Error />;
    }

    return (
        <ProductsCatalogContent
            products={products}
            onAddProduct={onAddProduct}
            onRemoveProduct={onRemoveProduct}
        />
    );
};

export default ProductsCatalog;
