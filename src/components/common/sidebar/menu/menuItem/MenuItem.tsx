import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import styles from './MenuItem.module.css';

interface MenuItemProps {
    item: {
        path: string;
        naming: string;
        img: string;
    };
}

const MenuItem: FC<MenuItemProps> = ({ item }) => {
    const { pathname } = useLocation();

    return (
        <Link to={`/${item.path}`}>
            <li
                className={
                    pathname === `/${item.path}`
                        ? `${styles.link} ${styles.active}`
                        : styles.link
                }
            >
                <img src={item.img} alt={item.naming} />
                <p>{item.naming}</p>
            </li>
        </Link>
    );
};

export default MenuItem;
