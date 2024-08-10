import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { IUserOrder, IUserOrderData } from 'types/order';

import axios from '../../axios';

// params -> userId
export const fetchUserOrders = createAsyncThunk(
    'orders/fetchUserOrders',
    async (params: string) => {
        const { data } = await axios.get<IUserOrder[]>(`/userOrders/${params}`);
        return data;
    }
);

export const removeUserOrder = createAsyncThunk(
    'orders/removeUserOrder',
    async (params: IUserOrderData) => {
        const { data } = await axios.delete(`/userOrders/${params.orderId}`);
        return data;
    }
);

interface IInitialState {
    orders: IUserOrder[];
    status: 'loading' | 'loaded' | 'error';
}

const initialState: IInitialState = {
    orders: [],
    status: 'loading',
};

const userOrdersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // загрузка заказов юзера
            .addCase(fetchUserOrders.pending, (state) => {
                state.orders = [];
                state.status = 'loading';
            })
            .addCase(fetchUserOrders.fulfilled, (state, action) => {
                state.orders = action.payload;
                state.status = 'loaded';
            })
            .addCase(fetchUserOrders.rejected, (state) => {
                state.orders = [];
                state.status = 'error';
            })
            // удаление заказа
            .addCase(removeUserOrder.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(removeUserOrder.fulfilled, (state, action) => {
                state.orders = state.orders.filter(
                    (item) => item._id !== action.meta.arg.orderId
                );
                state.status = 'loaded';
            })
            .addCase(removeUserOrder.rejected, (state) => {
                state.status = 'error';
            });
    },
});

export const userOrdersReducer = userOrdersSlice.reducer;
