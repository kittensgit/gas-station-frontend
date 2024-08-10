import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IOrder, IUserOrderData } from 'types/order';

import axios from '../../axios';

export const fetchAllOrders = createAsyncThunk(
    'orders/fetchAllOrders',
    async () => {
        const { data } = await axios.get<IOrder[]>(`/orders`);
        return data;
    }
);

export const changeStatusReady = createAsyncThunk(
    'orders/changeStatusReady',
    async (params: IUserOrderData) => {
        const { data } = await axios.put(
            `/orders/${params.userId}/${params.orderId}/changeStatusReady`
        );
        return data;
    }
);

interface IInitialState {
    orders: IOrder[];
    status: 'loading' | 'loaded' | 'error';
}

const initialState: IInitialState = {
    orders: [],
    status: 'loading',
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // загрузка всех заказов
            .addCase(fetchAllOrders.pending, (state) => {
                state.orders = [];
                state.status = 'loading';
            })
            .addCase(
                fetchAllOrders.fulfilled,
                (state, action: PayloadAction<IOrder[]>) => {
                    state.orders = action.payload;
                    state.status = 'loaded';
                }
            )
            .addCase(fetchAllOrders.rejected, (state) => {
                state.orders = [];
                state.status = 'error';
            })
            // смена статуса
            .addCase(changeStatusReady.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(changeStatusReady.fulfilled, (state, action) => {
                const order = state.orders.find(
                    (item) => item.user._id === action.meta.arg.userId
                );
                const userOrder = order?.orders.find(
                    (item) => item._id === action.meta.arg.orderId
                );
                if (userOrder) {
                    userOrder.readyTime = action.payload.readyTime;
                    userOrder.endReadyTime = action.payload.endReadyTime;
                    userOrder.statusReady = true;
                }
                state.status = 'loaded';
            })
            .addCase(changeStatusReady.rejected, (state) => {
                state.status = 'error';
            });
    },
});

export const ordersReducer = ordersSlice.reducer;
