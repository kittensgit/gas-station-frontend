import { FC } from 'react';

import errorIcon from 'assets/icons/error.png';

import styles from './Error.module.css';

const Error: FC = () => {
    return (
        <div className={styles.error}>
            <div className={styles.error_content}>
                <img src={errorIcon} alt="error" />
                <h3>Something went wrong</h3>
            </div>
        </div>
    );
};

export default Error;
