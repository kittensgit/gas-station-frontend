import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IMachine, IMachines } from 'types/machine';

import axios from '../../axios';

import { deductPoints } from './auth';

export const fetchMachines = createAsyncThunk(
    'machines/fetchMachines',
    async () => {
        const { data } = await axios.get(`/machines`);
        return data;
    }
);

export const bookMachine = createAsyncThunk(
    'machines/bookMachine',
    async (
        params: { machineId: IMachine['_id']; scoresCount: IMachines['price'] },
        { dispatch }
    ) => {
        const { data } = await axios.get(`/machines/${params.machineId}/book`);
        dispatch(deductPoints(params.scoresCount));
        return data;
    }
);

export const releaseMachine = createAsyncThunk(
    'machines/releaseMachine',
    async (params: IMachine['_id']) => {
        const { data } = await axios.get(`/machines/${params}/release`);
        return data;
    }
);

// params -> quantity
export const addMachine = createAsyncThunk(
    'machines/addMachine',
    async (params: number) => {
        const { data } = await axios.post(`/machines/add`, {
            quantity: params,
        });
        return data;
    }
);

// params -> machineId
export const deleteMachine = createAsyncThunk(
    'machines/deleteMachine',
    async (params: IMachine['_id']) => {
        const { data } = await axios.delete(`/machines/${params}`);
        return data;
    }
);

// params -> updatedPrice
export const updateMachinePrice = createAsyncThunk(
    'machines/updateMachinePrice',
    async (params: number) => {
        const { data } = await axios.put('/machines/price/update', {
            price: params,
        });
        return data;
    }
);

interface IInitialState {
    machines: IMachine[];
    machinePrice: IMachines['price'];
    status: 'loading' | 'loaded' | 'error';
}

const initialState: IInitialState = {
    machines: [],
    machinePrice: 0,
    status: 'loading',
};

const machinesSlice = createSlice({
    name: 'machines',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // получение всех машин
            .addCase(fetchMachines.pending, (state) => {
                state.machines = [];
                state.machinePrice = 0;
                state.status = 'loading';
            })
            .addCase(
                fetchMachines.fulfilled,
                (state, action: PayloadAction<IMachines>) => {
                    state.machines = action.payload.machines;
                    state.machinePrice = action.payload.price;
                    state.status = 'loaded';
                }
            )
            .addCase(fetchMachines.rejected, (state) => {
                state.machines = [];
                state.machinePrice = 0;
                state.status = 'error';
            })
            // добавление машин
            .addCase(addMachine.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(
                addMachine.fulfilled,
                (state, action: PayloadAction<Omit<IMachines, 'price'>>) => {
                    state.machines.push(...action.payload.machines);
                    state.status = 'loaded';
                }
            )
            .addCase(addMachine.rejected, (state) => {
                state.status = 'error';
            })
            // удаление машины
            .addCase(deleteMachine.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteMachine.fulfilled, (state, action) => {
                state.machines = state.machines.filter(
                    (item) => item._id !== action.meta.arg
                );
                state.status = 'loaded';
            })
            .addCase(deleteMachine.rejected, (state) => {
                state.status = 'error';
            })
            // обновление прайса машин
            .addCase(updateMachinePrice.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateMachinePrice.fulfilled, (state, action) => {
                state.machinePrice = action.meta.arg;
                state.status = 'loaded';
            })
            .addCase(updateMachinePrice.rejected, (state) => {
                state.status = 'error';
            });
    },
});

export const machinesReducer = machinesSlice.reducer;
