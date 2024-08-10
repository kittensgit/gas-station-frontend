import { FC } from 'react';

import History from 'components/history/History';
import EmptyList from 'components/common/emptyList/EmptyList';

import { useAuth } from 'hooks/useAuth';

const RefuelHistory: FC = () => {
    const { refuelingHistory } = useAuth();

    if (!refuelingHistory.length) {
        return <EmptyList listName="Refueling history" />;
    }

    return <History refuelingHistory={refuelingHistory} />;
};

export default RefuelHistory;
