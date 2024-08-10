import { lazy } from 'react';

export const LazyFuelCatalogPage = lazy(() => import('pages/FuelCatalog'));
export const LazyHomePage = lazy(() => import('pages/Home'));
export const LazyLaundryPage = lazy(() => import('pages/Laundry'));
export const LazyLoginPage = lazy(() => import('pages/Login'));
export const LazyRegisterPage = lazy(() => import('pages/Register'));
export const LazyNotFoundPage = lazy(() => import('pages/NotFound'));
export const LazyOrdersPage = lazy(() => import('pages/Orders'));
export const LazyProductsPage = lazy(() => import('pages/Products'));
export const LazyProductsCatalogPage = lazy(
    () => import('pages/ProductsCatalog')
);
export const LazyRefuelHistoryPage = lazy(() => import('pages/RefuelHistory'));
export const LazyShowersPage = lazy(() => import('pages/Showers'));
export const LazyShowersCatalogPage = lazy(
    () => import('pages/ShowersCatalog')
);
export const LazyUserOrdersPage = lazy(() => import('pages/UserOrders'));
export const LazyUsersPage = lazy(() => import('pages/Users'));
export const LazyWashMachinesCatalogPage = lazy(
    () => import('pages/WashMachinesCatalog')
);
