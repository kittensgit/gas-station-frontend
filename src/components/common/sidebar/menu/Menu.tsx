import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { IUser } from 'types/user';

import fuelIcon from 'assets/icons/fuelSm.png';
import showerIcon from 'assets/icons/shower.png';
import productsIcon from 'assets/icons/products.png';
import laundryIcon from 'assets/icons/laundry.png';
import historyIcon from 'assets/icons/history.png';
import orderIcon from 'assets/icons/order.png';
import ordersIcon from 'assets/icons/orders.png';
import usersIcon from 'assets/icons/users.png';
import washMachineIcon from 'assets/icons/washing_machineSm.png';

import MenuItem from './menuItem/MenuItem';

import styles from './Menu.module.css';

const userLinkList = [
    {
        path: '',
        naming: 'Refuel',
        img: fuelIcon,
    },
    {
        path: 'products/all',
        naming: 'Products',
        img: productsIcon,
    },
    {
        path: 'showers',
        naming: 'Showers',
        img: showerIcon,
    },
    {
        path: 'laundry',
        naming: 'Laundry',
        img: laundryIcon,
    },
];

const adminLinkList = [
    {
        path: '',
        naming: 'Fuels',
        img: fuelIcon,
    },
    {
        path: 'users',
        naming: 'Users',
        img: usersIcon,
    },
    {
        path: 'orders',
        naming: 'Orders',
        img: ordersIcon,
    },
    {
        path: 'products/catalog',
        naming: 'Products',
        img: productsIcon,
    },
    {
        path: 'showers/catalog',
        naming: 'Showers',
        img: showerIcon,
    },
    {
        path: 'washMachines/catalog',
        naming: 'Washinig Machines',
        img: washMachineIcon,
    },
];

interface MenuProps {
    userRole: IUser['role'];
    isAuth: boolean;
}

const Menu: FC<MenuProps> = ({ isAuth, userRole }) => {
    const { pathname } = useLocation();

    const isAdminRole = userRole === 'admin';
    return (
        <ul className={styles.list}>
            {isAdminRole
                ? adminLinkList.map((item, index) => (
                      <MenuItem key={index} item={item} />
                  ))
                : userLinkList.map((item, index) => (
                      <MenuItem key={index} item={item} />
                  ))}
            {isAuth && !isAdminRole && (
                <Link to={'/refuelHistory'}>
                    <li
                        className={
                            pathname === '/refuelHistory'
                                ? `${styles.link} ${styles.active}`
                                : styles.link
                        }
                    >
                        <img src={historyIcon} alt="history" />
                        <p>Refuel history</p>
                    </li>
                </Link>
            )}
            {isAuth && !isAdminRole && (
                <Link to={'/userOrders'}>
                    <li
                        className={
                            pathname === '/userOrders'
                                ? `${styles.link} ${styles.active}`
                                : styles.link
                        }
                    >
                        <img src={orderIcon} alt="order" />
                        <p>Orders</p>
                    </li>
                </Link>
            )}
        </ul>
    );
};

export default Menu;
