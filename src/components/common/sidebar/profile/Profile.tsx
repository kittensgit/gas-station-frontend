import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import logoutIcon from 'assets/icons/logout.png';
import pointsIcon from 'assets/icons/points_violet.png';

import styles from './Profile.module.css';

interface ProfileProps {
    isAuth: boolean;
    fullName: string;
    scores: number;
    logOut: () => void;
}

const Profile: FC<ProfileProps> = ({ isAuth, fullName, scores, logOut }) => {
    const { pathname } = useLocation();

    const onLogOut = () => {
        logOut();
    };
    return (
        <div className={styles.wrapper}>
            {isAuth ? (
                <>
                    <h3>Profile</h3>
                    <div className={styles.profile}>
                        <div className={styles.info}>
                            <div className={styles.about}>
                                <h2>{fullName}</h2>
                                <p>
                                    {scores}
                                    <img src={pointsIcon} alt="points" />
                                </p>
                            </div>
                            <button className={styles.btn} onClick={onLogOut}>
                                <img src={logoutIcon} alt="logout" />
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <div className={styles.profileSwitch}>
                    <Link
                        className={
                            pathname === '/login'
                                ? `${styles.active} ${styles.link}`
                                : styles.link
                        }
                        to={'/login'}
                    >
                        Sign In
                    </Link>
                    <Link
                        className={
                            pathname === '/register'
                                ? `${styles.active} ${styles.link}`
                                : styles.link
                        }
                        to={'/register'}
                    >
                        Sign Up
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Profile;
