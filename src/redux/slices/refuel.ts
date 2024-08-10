import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { IOrderFuel, IRefuelData } from 'types/fuel';

import axios from '../../axios';

import { addPoints, addRefuelHistory } from './auth';

export const fetchRefuel = createAsyncThunk(
    'refuel/fetchRefuel',
    async (params: IRefuelData, { dispatch }) => {
        const { data } = await axios.post('/refuel', params);
        dispatch(addPoints(params.scores));
        dispatch(addRefuelHistory(data));
        return data;
    }
);

interface IInitialState {
    orderFuel: IOrderFuel;
    totalCost: number;
}

const initialState: IInitialState = {
    orderFuel: {
        name: '',
        color: '',
        price: 0,
        literQuantity: 0,
        scores: 0,
        discount: 0,
    },
    totalCost: 0,
};

const refuelSlice = createSlice({
    name: 'refuel',
    initialState,
    reducers: {
        addOrderFuel: (state, action) => {
            state.orderFuel.price = action.payload.price;
            state.orderFuel.name = action.payload.name;
            state.orderFuel.color = action.payload.color;
            state.orderFuel.literQuantity = action.payload.literQuantity;
            state.orderFuel.scores = action.payload.scores;
            state.totalCost =
                action.payload.literQuantity * action.payload.price;
            state.orderFuel.discount = action.payload.discount;
        },
        removeOrderFuel: (state) => {
            state.orderFuel.price = 0;
            state.orderFuel.name = '';
            state.orderFuel.color = '';
            state.orderFuel.literQuantity = 0;
            state.orderFuel.scores = 0;
            state.orderFuel.discount = 0;
            state.totalCost = 0;
        },
    },
});

export const { addOrderFuel, removeOrderFuel } = refuelSlice.actions;

export const refuelReducer = refuelSlice.reducer;
