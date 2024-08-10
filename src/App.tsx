import { ComponentType, FC, Suspense, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Sidebar from 'components/common/sidebar/Sidebar';
import Loading from 'components/common/loading/Loading';

import {
    LazyHomePage,
    LazyLaundryPage,
    LazyLoginPage,
    LazyNotFoundPage,
    LazyOrdersPage,
    LazyProductsCatalogPage,
    LazyProductsPage,
    LazyRefuelHistoryPage,
    LazyRegisterPage,
    LazyShowersCatalogPage,
    LazyShowersPage,
    LazyUserOrdersPage,
    LazyUsersPage,
    LazyWashMachinesCatalogPage,
} from 'pages/lazy';

import { useAuth } from 'hooks/useAuth';
import { useAppDispatch } from 'hooks/useAppDispatch';

import { fetchAuthMe } from './redux/slices/auth';

const App: FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAuthMe());
    }, [dispatch]);

    return (
        <div className="wrapper">
            <div className="container">
                <Sidebar />
                <Suspense fallback={<Loading />}>
                    <div className="content">
                        <Routes>
                            <Route path="/" element={<LazyHomePage />} />
                            <Route path="/login" element={<LazyLoginPage />} />
                            <Route
                                path="/register"
                                element={<LazyRegisterPage />}
                            />
                            <Route
                                path="/laundry"
                                element={<LazyLaundryPage />}
                            />
                            <Route
                                path="/showers"
                                element={<LazyShowersPage />}
                            />
                            <Route
                                path="/products/:typeFilter"
                                element={<LazyProductsPage />}
                            />
                            <Route
                                path="/refuelHistory"
                                element={<LazyRefuelHistoryPage />}
                            />
                            {/* Auth Routes */}
                            <Route
                                path="/userOrders"
                                element={
                                    <AuthRoute element={LazyUserOrdersPage} />
                                }
                            />
                            {/* Admin Routes */}
                            <Route
                                path="/users"
                                element={<AdminRoute element={LazyUsersPage} />}
                            />
                            <Route
                                path="/orders"
                                element={
                                    <AdminRoute element={LazyOrdersPage} />
                                }
                            />
                            <Route
                                path="/products/catalog"
                                element={
                                    <AdminRoute
                                        element={LazyProductsCatalogPage}
                                    />
                                }
                            />
                            <Route
                                path="/showers/catalog"
                                element={
                                    <AdminRoute
                                        element={LazyShowersCatalogPage}
                                    />
                                }
                            />
                            <Route
                                path="/washMachines/catalog"
                                element={
                                    <AdminRoute
                                        element={LazyWashMachinesCatalogPage}
                                    />
                                }
                            />
                            <Route path="*" element={<LazyNotFoundPage />} />
                        </Routes>
                    </div>
                </Suspense>
            </div>
        </div>
    );
};

interface ProtectedRouteProps {
    element: ComponentType<any>;
}

const AuthRoute: FC<ProtectedRouteProps> = ({ element: Element }) => {
    const { isAuth } = useAuth();

    return isAuth ? <Element /> : <Navigate to="/login" />;
};

const AdminRoute: FC<ProtectedRouteProps> = ({ element: Element }) => {
    const { role } = useAuth();

    return role === 'admin' ? <Element /> : <Navigate to="/" />;
};

export default App;
