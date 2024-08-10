import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAuth } from 'hooks/useAuth';

import { logout } from '../../../redux/slices/auth';

import Menu from './menu/Menu';
import Profile from './profile/Profile';

import styles from './Sidebar.module.css';

const Sidebar: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { isAuth, fullName, scores, role } = useAuth();

    const logOut = () => {
        if (window.confirm('You really want to log out?')) {
            dispatch(logout());
            window.localStorage.removeItem('token');
            navigate('/login');
        }
    };

    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebar_wrapper}>
                <Link
                    to={role === 'admin' ? '/users' : ''}
                    className={styles.logo}
                >
                    G<span>A</span>S<span>I</span>K
                </Link>
                <Menu userRole={role} isAuth={isAuth} />
            </div>
            <Profile
                isAuth={isAuth}
                fullName={fullName}
                scores={scores!}
                logOut={logOut}
            />
        </div>
    );
};

export default Sidebar;
