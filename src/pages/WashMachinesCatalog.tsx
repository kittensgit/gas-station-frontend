import { FC, useEffect } from 'react';

import WashMachinesContent from 'components/washMachinesContent/WashMachinesContent';
import Loading from 'components/common/loading/Loading';
import Error from 'components/common/error/Error';

import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { IMachine } from 'types/machine';

import {
    addMachine,
    deleteMachine,
    fetchMachines,
    updateMachinePrice,
} from '../redux/slices/machines';

const WashMachinesCatalog: FC = () => {
    const dispatch = useAppDispatch();

    const { machines, status, machinePrice } = useAppSelector(
        (state) => state.machines
    );

    useEffect(() => {
        dispatch(fetchMachines());
    }, [dispatch]);

    const onAddMachine = (quantity: number) => {
        dispatch(addMachine(quantity));
    };

    const onRemoveMachine = (machineId: IMachine['_id']) => {
        dispatch(deleteMachine(machineId));
    };

    const onUpdateMachinePrice = (updatedPrice: number) => {
        dispatch(updateMachinePrice(updatedPrice));
    };

    if (status === 'loading') {
        return <Loading />;
    }

    if (status === 'error') {
        return <Error />;
    }

    return (
        <WashMachinesContent
            machines={machines}
            machinePrice={machinePrice}
            onAddMachine={onAddMachine}
            onRemoveMachine={onRemoveMachine}
            onUpdateMachinePrice={onUpdateMachinePrice}
        />
    );
};

export default WashMachinesCatalog;
