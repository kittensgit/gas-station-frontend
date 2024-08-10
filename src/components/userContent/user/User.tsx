import { FC } from 'react';

import { IUser, IUserRoleData } from 'types/user';

import pointsIcon from 'assets/icons/points.png';
import removeIcon from 'assets/icons/remove.png';

import styles from './User.module.css';

interface UserProps {
    user: IUser;
    onSetUserRole: (userRoleData: IUserRoleData) => void;
    onRemoveUser: (userId: IUser['_id']) => void;
}

const User: FC<UserProps> = ({ user, onSetUserRole, onRemoveUser }) => {
    const { email, fullName, role, scores, _id } = user;

    const isAdmin = role === 'admin';

    const handleSetUserRole = () => {
        const newRole = isAdmin ? 'user' : 'admin';
        onSetUserRole({
            userId: _id,
            role: newRole,
        });
    };
    return (
        <li className={styles.user}>
            <p>{fullName}</p>
            <p className={styles.email}>{email}</p>
            <p>
                {
                    <span
                        onClick={handleSetUserRole}
                        className={
                            isAdmin
                                ? `${styles.admin} ${styles.role}`
                                : styles.role
                        }
                    >
                        {role}
                        <div
                            className={
                                isAdmin
                                    ? `${styles.triangle} ${styles.triangle_admin}`
                                    : styles.triangle
                            }
                        ></div>
                    </span>
                }
            </p>
            <p className={styles.scores}>
                <span>{scores}</span>
                <img src={pointsIcon} alt="points" />
            </p>

            <button onClick={() => onRemoveUser(_id)} className={styles.remove}>
                <img src={removeIcon} alt="remove" />
            </button>
        </li>
    );
};

export default User;
