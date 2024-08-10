import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IFuel } from 'types/fuel';

import axios from '../../axios';

export const fetchFuels = createAsyncThunk('fuels/fetchFuels', async () => {
    const { data } = await axios.get('/fuels');
    return data;
});

export const addFuel = createAsyncThunk(
    'fuels/addFuel',
    async (params: Omit<IFuel, '_id'>) => {
        const { data } = await axios.post('/fuels/add', {
            ...params,
        });
        return data;
    }
);
export const removeFuel = createAsyncThunk(
    'fuels/removeFuel',
    async (params: IFuel['_id']) => {
        const { data } = await axios.delete(`/fuels/${params}`);
        return data;
    }
);

interface IInitialState {
    fuels: IFuel[];
    status: 'loading' | 'loaded' | 'error';
}

const initialState: IInitialState = {
    fuels: [],
    status: 'loading',
};

const fuelsSlice = createSlice({
    name: 'fuels',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFuels.pending, (state) => {
                state.fuels = [];
                state.status = 'loading';
            })
            .addCase(
                fetchFuels.fulfilled,
                (state, action: PayloadAction<IFuel[]>) => {
                    state.fuels = action.payload;
                    state.status = 'loaded';
                }
            )
            .addCase(fetchFuels.rejected, (state) => {
                state.fuels = [];
                state.status = 'error';
            })
            .addCase(addFuel.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(
                addFuel.fulfilled,
                (state, action: PayloadAction<IFuel>) => {
                    state.fuels.push(action.payload);
                    state.status = 'loaded';
                }
            )
            .addCase(addFuel.rejected, (state) => {
                state.status = 'error';
            })
            .addCase(removeFuel.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(removeFuel.fulfilled, (state, action) => {
                state.fuels = state.fuels.filter(
                    (item) => item._id !== action.meta.arg
                );
                state.status = 'loaded';
            })
            .addCase(removeFuel.rejected, (state) => {
                state.status = 'error';
            });
    },
});

export const fuelsReducer = fuelsSlice.reducer;
