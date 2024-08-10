import { FC, useEffect, useState } from 'react';

import LaundryContent from 'components/laundryContent/LaundryContent';
import Loading from 'components/common/loading/Loading';
import Error from 'components/common/error/Error';
import EmptyList from 'components/common/emptyList/EmptyList';

import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { useAuth } from 'hooks/useAuth';
import { IMachine } from 'types/machine';

import {
    bookMachine,
    fetchMachines,
    releaseMachine,
} from '../redux/slices/machines';

const Laundry: FC = () => {
    const dispatch = useAppDispatch();
    const { userId } = useAuth();

    const { machines, machinePrice, status } = useAppSelector(
        (state) => state.machines
    );

    const [isBook, setIsBook] = useState<boolean>(false);
    const [isRelease, setIsRelease] = useState<boolean>(false);

    useEffect(() => {
        dispatch(fetchMachines());
    }, [dispatch, isRelease, isBook]);

    const onBookMachine = async (machineId: IMachine['_id']) => {
        const { payload } = await dispatch(
            bookMachine({
                machineId,
                scoresCount: machinePrice,
            })
        );
        if (payload) {
            setIsBook(true);
        } else {
            alert('Failed to book');
        }
    };

    const onReleaseMachine = async (machineId: IMachine['_id']) => {
        const { payload } = await dispatch(releaseMachine(machineId));
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

    if (!machines.length) {
        return <EmptyList listName="Washing machines" />;
    }

    return (
        <LaundryContent
            userId={userId}
            machines={machines}
            machinePrice={machinePrice}
            onBookMachine={onBookMachine}
            onReleaseMachine={onReleaseMachine}
        />
    );
};

export default Laundry;
