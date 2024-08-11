import { FC, useEffect, useState } from 'react';

import ShowersContent from 'components/showersContent/ShowersContent';
import Loading from 'components/common/loading/Loading';
import Error from 'components/common/error/Error';
import EmptyList from 'components/common/emptyList/EmptyList';

import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { useAuth } from 'hooks/useAuth';
import { IShower } from 'types/shower';

import {
    bookShower,
    fetchShowers,
    releaseShower,
} from '../redux/slices/showers';

const Showers: FC = () => {
    const dispatch = useAppDispatch();
    const { userId, isAuth } = useAuth();

    const [isBook, setIsBook] = useState<boolean>(false);
    const [isRelease, setIsRelease] = useState<boolean>(false);

    const { showers, status, showerPrice } = useAppSelector(
        (state) => state.showers
    );

    useEffect(() => {
        dispatch(fetchShowers());
    }, [dispatch, isRelease, isBook]);

    const onBookShower = async (showerId: IShower['_id']) => {
        const { payload } = await dispatch(
            bookShower({ showerId, scoresCount: showerPrice })
        );
        if (payload) {
            setIsBook(true);
        } else {
            alert('Failed to book');
        }
    };

    const onReleaseShower = async (showerId: IShower['_id']) => {
        const { payload } = await dispatch(releaseShower(showerId));
        if (payload) {
            setIsRelease(true);
        }
    };

    if (status === 'loading') {
        return <Loading />;
    }

    if (status === 'error') {
        return <Error />;
    }

    if (!showers.length) {
        return <EmptyList listName="Showers" />;
    }

    return (
        <ShowersContent
            showers={showers}
            userId={userId}
            showerPrice={showerPrice}
            isAuth={isAuth}
            onReleaseShower={onReleaseShower}
            onBookShower={onBookShower}
        />
    );
};

export default Showers;
