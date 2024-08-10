import { FC } from 'react';
import { Navigate } from 'react-router-dom';

import SignUp from 'components/signUp/SignUp';

import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAuth } from 'hooks/useAuth';

import { ISignUpData } from 'types/auth';

import { fetchRegister } from '../redux/slices/auth';

const Register: FC = () => {
    const { isAuth } = useAuth();
    const dispatch = useAppDispatch();

    const signUp = async (values: ISignUpData) => {
        const data = await dispatch(fetchRegister(values));
        if (!data.payload) {
            return alert('Failed to register');
        }
        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token);
        }
    };

    if (isAuth) {
        return <Navigate to={'/'} />;
    }

    return <SignUp signUp={signUp} />;
};

export default Register;
