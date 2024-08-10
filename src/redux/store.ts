import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './slices/auth';
import { refuelReducer } from './slices/refuel';
import { productsReducer } from './slices/products';
import { ordersReducer } from './slices/orders';
import { machinesReducer } from './slices/machines';
import { showersReducer } from './slices/showers';
import { userOrdersReducer } from './slices/userOrders';
import { usersReducer } from './slices/users';
import { fuelsReducer } from './slices/fuels';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        refuel: refuelReducer,
        products: productsReducer,
        orders: ordersReducer,
        userOrders: userOrdersReducer,
        machines: machinesReducer,
        showers: showersReducer,
        users: usersReducer,
        fuels: fuelsReducer,
    },
});
