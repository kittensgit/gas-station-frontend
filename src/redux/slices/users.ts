import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUser, IUserRoleData } from 'types/user';

import axios from '../../axios';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const { data } = await axios.get('/users');
    return data;
});

// params => userId and role
export const setUserRole = createAsyncThunk(
    'users/setUserRole',
    async (params: IUserRoleData) => {
        const { data } = await axios.post(`/users/${params.userId}/setRole`, {
            role: params.role,
        });
        return data;
    }
);

export const removeUser = createAsyncThunk(
    'users/removeUser',
    async (params: IUser['_id']) => {
        const { data } = await axios.delete(`/users/${params}`);
        return data;
    }
);

interface IInitialState {
    users: IUser[];
    status: 'loading' | 'loaded' | 'error';
}

const initialState: IInitialState = {
    users: [],
    status: 'loading',
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.users = [];
                state.status = 'loading';
            })
            .addCase(
                fetchUsers.fulfilled,
                (state, action: PayloadAction<IUser[]>) => {
                    state.users = action.payload;
                    state.status = 'loaded';
                }
            )
            .addCase(fetchUsers.rejected, (state) => {
                state.users = [];
                state.status = 'error';
            })
            .addCase(setUserRole.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(setUserRole.fulfilled, (state, action) => {
                const user = state.users.find(
                    (user) => user._id === action.meta.arg.userId
                );
                if (user) {
                    user.role = action.meta.arg.role;
                }
                state.status = 'loaded';
            })
            .addCase(setUserRole.rejected, (state) => {
                state.status = 'error';
            })
            .addCase(removeUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(removeUser.fulfilled, (state, action) => {
                state.users = state.users.filter(
                    (user) => user._id !== action.meta.arg
                );
                state.status = 'loaded';
            })
            .addCase(removeUser.rejected, (state) => {
                state.status = 'error';
            });
    },
});

export const usersReducer = usersSlice.reducer;
