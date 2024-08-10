import { FC, useEffect } from 'react';

import ShowersCatalogContent from 'components/showersCatalogContent/ShowersCatalogContent';
import Loading from 'components/common/loading/Loading';
import Error from 'components/common/error/Error';

import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { IShower } from 'types/shower';

import {
    addShower,
    deleteShower,
    fetchShowers,
    updateShowerPrice,
} from '../redux/slices/showers';

const ShowersCatalog: FC = () => {
    const dispatch = useAppDispatch();

    const { showers, showerPrice, status } = useAppSelector(
        (state) => state.showers
    );

    useEffect(() => {
        dispatch(fetchShowers());
    }, [dispatch]);

    const onAddShower = (quantity: number) => {
        dispatch(addShower(quantity));
    };

    const onRemoveShower = (showerId: IShower['_id']) => {
        dispatch(deleteShower(showerId));
    };

    const onUpdateShowerPrice = (showerPrice: number) => {
        dispatch(updateShowerPrice(showerPrice));
    };

    if (status === 'loading') {
        return <Loading />;
    }

    if (status === 'error') {
        return <Error />;
    }

    return (
        <ShowersCatalogContent
            showers={showers}
            showerPrice={showerPrice}
            onAddShower={onAddShower}
            onRemoveShower={onRemoveShower}
            onUpdateShowerPrice={onUpdateShowerPrice}
        />
    );
};

export default ShowersCatalog;
