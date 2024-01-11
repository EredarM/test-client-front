import {NavLink, Outlet} from 'react-router-dom';
import React from 'react';

import {
    infoAboutCompanyRoutePath,
    infoCertificateRoutePath,
    infoDeliveryRoutePath,
    infoLicensedProductRoutePath,
    infoPaymentRoutePath,
} from '../../utils/route-paths';

import styles from './index.module.css';

const Info = () => {
    const active = ({isActive}: { isActive: boolean }): string => {
        return isActive ? styles.link_active : '';
    };

    return (
        <div className={styles.container}>
            <nav className={styles.nav}>
                <ul className={styles.nav_list}>
                    <li className={`${styles.nav_item}`}>
                        <NavLink
                            to={infoAboutCompanyRoutePath}
                            className={active}>
                            О компании
                        </NavLink>
                    </li>
                    <li className={`${styles.nav_item}`}>
                        <NavLink
                            to={infoCertificateRoutePath}
                            className={active}>
                            Подарочный сертификат
                        </NavLink>
                    </li>
                    <li className={`${styles.nav_item}`}>
                        <NavLink
                            to={infoDeliveryRoutePath}
                            className={active}>
                            Доставка
                        </NavLink>
                    </li>
                    <li className={`${styles.nav_item}`}>
                        <NavLink
                            to={infoPaymentRoutePath}
                            className={active}>
                            Оплата
                        </NavLink>
                    </li>
                    <li className={`${styles.nav_item}`}>
                        <NavLink
                            to={infoLicensedProductRoutePath}
                            className={active}>
                            Лицензионный товар
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <div className={styles.content}>
                <Outlet/>
            </div>
        </div>
    );
};

export default Info;
