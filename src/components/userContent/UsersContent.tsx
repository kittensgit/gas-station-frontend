import { FC } from 'react';

import { IUser, IUserRoleData } from 'types/user';

import User from './user/User';

import styles from './UsersContent.module.css';

interface UsersContentProps {
    users: IUser[];
    onSetUserRole: (userRoleData: IUserRoleData) => void;
    onRemoveUser: (userId: IUser['_id']) => void;
}

const UsersContent: FC<UsersContentProps> = ({
    users,
    onSetUserRole,
    onRemoveUser,
}) => {
    return (
        <div className={styles.wrapper}>
            <ul className={styles.users_top}>
                <li>Name</li>
                <li>Email</li>
                <li>Role</li>
                <li>Scores</li>
            </ul>
            <ul className={styles.users}>
                {users.map((user) => (
                    <User
                        key={user._id}
                        user={user}
                        onSetUserRole={onSetUserRole}
                        onRemoveUser={onRemoveUser}
                    />
                ))}
            </ul>
        </div>
    );
};

export default UsersContent;
