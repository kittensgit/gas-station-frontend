import { FC } from 'react';

import emptyIcon from 'assets/icons/empty.png';

import styles from './EmptyList.module.css';

interface EmptyListProps {
    listName: string;
}

const EmptyList: FC<EmptyListProps> = ({ listName }) => {
    return (
        <div className={styles.empty}>
            <div className={styles.empty_content}>
                <img src={emptyIcon} alt="empty" />
                <h3>{listName} list is empty</h3>
            </div>
        </div>
    );
};

export default EmptyList;
