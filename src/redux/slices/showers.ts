import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IShower, IShowers } from 'types/shower';

import axios from '../../axios';

import { deductPoints } from './auth';

export const fetchShowers = createAsyncThunk(
    'showers/fetchShowers',
    async () => {
        const { data } = await axios.get(`/showers`);
        return data;
    }
);

// params -> showerId and scoresCount
export const bookShower = createAsyncThunk(
    'showers/bookShower',
    async (
        params: {
            showerId: IShower['_id'];
            scoresCount: IShowers['price'];
        },
        { dispatch }
    ) => {
        const { data } = await axios.get(`/showers/${params.showerId}/book`);
        dispatch(deductPoints(params.scoresCount));
        return data;
    }
);

// params -> showerId
export const releaseShower = createAsyncThunk(
    'showers/releaseShower',
    async (params: IShower['_id']) => {
        const { data } = await axios.get(`/showers/${params}/release`);
        return data;
    }
);

// params => quantity
export const addShower = createAsyncThunk(
    'showers/addShower',
    async (params: number) => {
        const { data } = await axios.post(`/showers/add`, {
            quantity: params,
        });
        return data;
    }
);

// params -> showerId
export const deleteShower = createAsyncThunk(
    'showers/deleteShower',
    async (params: IShower['_id']) => {
        const { data } = await axios.delete(`/showers/${params}`);
        return data;
    }
);

// params showerPrice
export const updateShowerPrice = createAsyncThunk(
    'showers/updateShowerPrice',
    async (params: number) => {
        const { data } = await axios.put('/showers/price/update', {
            price: params,
        });
        return data;
    }
);

interface IInitialState {
    showers: IShower[];
    showerPrice: IShowers['price'];
    status: 'loading' | 'loaded' | 'error';
}

const initialState: IInitialState = {
    showers: [],
    showerPrice: 0,
    status: 'loading',
};

const showersSlice = createSlice({
    name: 'showers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // получение всех душевых
            .addCase(fetchShowers.pending, (state) => {
                state.showers = [];
                state.showerPrice = 0;
                state.status = 'loading';
            })
            .addCase(
                fetchShowers.fulfilled,
                (state, action: PayloadAction<IShowers>) => {
                    state.showers = action.payload.showers;
                    state.showerPrice = action.payload.price;
                    state.status = 'loaded';
                }
            )
            .addCase(fetchShowers.rejected, (state) => {
                state.showers = [];
                state.showerPrice = 0;
                state.status = 'error';
            })
            // добавление душевых
            .addCase(addShower.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(
                addShower.fulfilled,
                (state, action: PayloadAction<Omit<IShowers, 'price'>>) => {
                    state.showers.push(...action.payload.showers);
                    state.status = 'loaded';
                }
            )
            .addCase(addShower.rejected, (state) => {
                state.status = 'error';
            })
            // удаление душевой
            .addCase(deleteShower.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteShower.fulfilled, (state, action) => {
                state.showers = state.showers.filter(
                    (item) => item._id !== action.meta.arg
                );
                state.status = 'loaded';
            })
            .addCase(deleteShower.rejected, (state) => {
                state.status = 'error';
            })
            // обновление прайса душевой
            .addCase(updateShowerPrice.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateShowerPrice.fulfilled, (state, action) => {
                state.showerPrice = action.meta.arg;
                state.status = 'loaded';
            })
            .addCase(updateShowerPrice.rejected, (state) => {
                state.status = 'error';
            });
    },
});

export const showersReducer = showersSlice.reducer;
