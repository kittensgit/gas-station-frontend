import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { IUser, IUserRoleData } from 'types/user';
import { ISignInData, ISignUpData } from 'types/auth';

import axios from '../../axios';

export const fetchAuth = createAsyncThunk(
    'auth/fetchAuth',
    async (params: ISignInData) => {
        const { data } = await axios.post('/auth/login', params);
        return data;
    }
);

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
    const { data } = await axios.get('/auth/me');
    return data;
});

export const fetchRegister = createAsyncThunk(
    'auth/fetchRegister',
    async (params: ISignUpData) => {
        const { data } = await axios.post('/auth/register', params);
        return data;
    }
);

interface IInitialState {
    data: IUser;
    status: 'loading' | 'loaded' | 'error';
}

const initialState: IInitialState = {
    data: {
        _id: '',
        email: '',
        fullName: '',
        refuelingHistory: [],
        role: '',
        scores: 0,
    },
    status: 'loading',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = {
                _id: '',
                email: '',
                fullName: '',
                refuelingHistory: [],
                role: '',
                scores: 0,
            };
        },
        deductPoints: (state, action) => {
            state.data.scores -= action.payload;
        },
        addPoints: (state, action) => {
            state.data.scores += action.payload;
        },
        addRefuelHistory: (state, action) => {
            state.data.refuelingHistory.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuth.pending, (state) => {
                state.data = {
                    _id: '',
                    email: '',
                    fullName: '',
                    refuelingHistory: [],
                    role: '',
                    scores: 0,
                };
                state.status = 'loading';
            })
            .addCase(fetchAuth.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = 'loaded';
            })
            .addCase(fetchAuth.rejected, (state) => {
                state.data = {
                    _id: '',
                    email: '',
                    fullName: '',
                    refuelingHistory: [],
                    role: '',
                    scores: 0,
                };
                state.status = 'error';
            })
            .addCase(fetchAuthMe.pending, (state) => {
                state.data = {
                    _id: '',
                    email: '',
                    fullName: '',
                    refuelingHistory: [],
                    role: '',
                    scores: 0,
                };
                state.status = 'loading';
            })
            .addCase(fetchAuthMe.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = 'loaded';
            })
            .addCase(fetchAuthMe.rejected, (state) => {
                state.data = {
                    _id: '',
                    email: '',
                    fullName: '',
                    refuelingHistory: [],
                    role: '',
                    scores: 0,
                };
                state.status = 'error';
            })
            .addCase(fetchRegister.pending, (state) => {
                state.data = {
                    _id: '',
                    email: '',
                    fullName: '',
                    refuelingHistory: [],
                    role: '',
                    scores: 0,
                };
                state.status = 'loading';
            })
            .addCase(fetchRegister.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = 'loaded';
            })
            .addCase(fetchRegister.rejected, (state) => {
                state.data = {
                    _id: '',
                    email: '',
                    fullName: '',
                    refuelingHistory: [],
                    role: '',
                    scores: 0,
                };
                state.status = 'error';
            });
    },
});

export const authReducer = authSlice.reducer;

export const { logout, deductPoints, addPoints, addRefuelHistory } =
    authSlice.actions;
