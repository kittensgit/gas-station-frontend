import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IOrderProduct, IProduct } from 'types/product';

import axios from '../../axios';

import { deductPoints } from './auth';

// params -> filterType ('all', 'dessert', 'main', 'drinks')
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (params: string) => {
        const { data } = await axios.get(`/products/${params}`);
        return data;
    }
);

// params -> productId and product quantity
export const fetchOrderProduct = createAsyncThunk(
    'products/fetchOrderProduct',
    async (params: IOrderProduct, { dispatch }) => {
        const { data } = await axios.post(
            `/products/${params.productId}/order`,
            {
                quantity: params.quantity,
            }
        );
        dispatch(deductPoints(params.scoresCount));
        return data;
    }
);

export const addProduct = createAsyncThunk(
    'products/addProduct',
    async (params: Omit<IProduct, '_id'>) => {
        const { name, scoresCount, type } = params;
        const { data } = await axios.post(`/products/add`, {
            name,
            scoresCount,
            type,
        });
        return data;
    }
);

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (params: IProduct['_id']) => {
        const { data } = await axios.delete(`/products/${params}`);
        return data;
    }
);

interface IInitialState {
    products: IProduct[];
    status: 'loading' | 'loaded' | 'error';
}

const initialState: IInitialState = {
    products: [],
    status: 'loading',
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // загрузка продуктов
            .addCase(fetchProducts.pending, (state) => {
                state.products = [];
                state.status = 'loading';
            })
            .addCase(
                fetchProducts.fulfilled,
                (state, action: PayloadAction<IProduct[]>) => {
                    state.products = action.payload;
                    state.status = 'loaded';
                }
            )
            .addCase(fetchProducts.rejected, (state) => {
                state.products = [];
                state.status = 'error';
            })
            // добавление продукта
            .addCase(addProduct.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(
                addProduct.fulfilled,
                (state, action: PayloadAction<IProduct>) => {
                    state.products.push(action.payload);
                    state.status = 'loaded';
                }
            )
            .addCase(addProduct.rejected, (state) => {
                state.status = 'error';
            })
            // удаление продукта
            .addCase(deleteProduct.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(
                    (item) => item._id !== action.meta.arg
                );
                state.status = 'loaded';
            })
            .addCase(deleteProduct.rejected, (state) => {
                state.status = 'error';
            });
    },
});

export const productsReducer = productsSlice.reducer;
