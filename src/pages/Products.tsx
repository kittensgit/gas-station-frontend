import { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ProductsContent from 'components/productsContent/ProductsContent';
import Error from 'components/common/error/Error';

import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { useAuth } from 'hooks/useAuth';
import { IOrderProduct } from 'types/product';

import { fetchOrderProduct, fetchProducts } from '../redux/slices/products';

const Products: FC = () => {
    const { typeFilter } = useParams();
    const { isAuth } = useAuth();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { products, status } = useAppSelector((state) => state.products);

    useEffect(() => {
        if (typeFilter) {
            dispatch(fetchProducts(typeFilter));
        }
    }, [dispatch, typeFilter]);

    const onAddOrderProduct = async (product: IOrderProduct) => {
        const { payload } = await dispatch(fetchOrderProduct(product));
        if (!payload) {
            alert('Failed to order product');
        } else {
            navigate('/userOrders');
        }
    };

    if (status === 'error') {
        return <Error />;
    }

    return (
        <ProductsContent
            products={products}
            isAuth={isAuth}
            status={status}
            onAddOrderProduct={onAddOrderProduct}
        />
    );
};

export default Products;
