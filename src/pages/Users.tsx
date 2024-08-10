import { FC, useEffect } from 'react';

import UsersContent from 'components/userContent/UsersContent';
import Loading from 'components/common/loading/Loading';
import Error from 'components/common/error/Error';
import EmptyList from 'components/common/emptyList/EmptyList';

import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { IUser, IUserRoleData } from 'types/user';

import { fetchUsers, removeUser, setUserRole } from '../redux/slices/users';

const Users: FC = () => {
    const dispatch = useAppDispatch();

    const { users, status } = useAppSelector((state) => state.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const onSetUserRole = (userRoleData: IUserRoleData) => {
        dispatch(setUserRole(userRoleData));
    };

    const onRemoveUser = (userId: IUser['_id']) => {
        dispatch(removeUser(userId));
    };

    if (status === 'loading') {
        return <Loading />;
    }

    if (status === 'error') {
        return <Error />;
    }

    if (!users.length) {
        return <EmptyList listName="Users" />;
    }

    return (
        <UsersContent
            users={users}
            onSetUserRole={onSetUserRole}
            onRemoveUser={onRemoveUser}
        />
    );
};

export default Users;
