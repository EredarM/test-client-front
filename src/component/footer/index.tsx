import React from "react";

import styles from './index.module.css';
import {Link} from "react-router-dom";
import {
    infoAboutCompanyRoutePath,
    infoCertificateRoutePath,
    infoDeliveryRoutePath, infoLicensedProductRoutePath,
    infoPaymentRoutePath
} from "../../utils/route-paths";

const Footer = (): React.JSX.Element => {
    return (
        <footer className={styles.footer}>
            <div className={`global_container ${styles.content__wrapper}`}>
                <div className={styles.container}>
                    <ul>
                        <li className={styles.header__item}>
                            <Link to={'/'}>Главная</Link>
                        </li>
                    </ul>
                </div>
                <div className={styles.container}>
                    <ul>
                        <li className={styles.header__item}>
                            <span>Покупателям</span>
                        </li>
                        <li className={styles.content__item}>
                            <Link to={infoCertificateRoutePath}>Подарочный сертификат</Link>
                        </li>
                        <li className={styles.content__item}>
                            <Link to={infoDeliveryRoutePath}>Доставка</Link>
                        </li>
                        <li className={styles.content__item}>
                            <Link to={infoPaymentRoutePath}>Оплата</Link>
                        </li>
                        <li className={styles.content__item}>
                            <Link to={infoLicensedProductRoutePath}>Лицензионный товар</Link>
                        </li>
                    </ul>
                </div>
                <div className={styles.container}>
                    <ul>
                        <li className={styles.header__item}>
                            <span>Компания</span>
                        </li>
                        <li className={styles.content__item}>
                            <Link to={infoAboutCompanyRoutePath}>О компании</Link>
                        </li>
                    </ul>
                </div>
                <div className={styles.container}>
                    <ul>
                        <li className={styles.header__item}>
                            <span>Контакты</span>
                        </li>
                        <li className={styles.content__item}>
                            <Link to={'tel:+73433604786'}>+7 (343) 360-47-86</Link>
                        </li>
                        <li className={styles.content__item}>
                            <Link to={'tel:+73433604787'}>+7 (343) 360-47-87</Link>
                        </li>
                    </ul>
                </div>
                <div className={styles.container}>
                    <ul>
                        <li className={styles.header__item}>
                            <span>Адрес</span>
                        </li>
                        <li className={styles.content__item}>
                            <Link to={'https://yandex.ru/maps/-/CCUDiWXSpD'} target={'_blank'}>620088, г. Екатеринбург,<br/> ул.40 лет Октября, д.29</Link>
                        </li>
                    </ul>
                </div>
                <div className={styles.container}>
                    <ul>
                        <li className={styles.header__item}>
                            <span>Мы в соц сетях</span>
                        </li>
                        <li className={styles.content__item}>
                            <Link to={'https://vk.com/prostorohota'}>Вконтакте</Link>
                        </li>
                        <li className={styles.content__item}>
                            <Link to={'/'}>WhatsApp</Link>
                        </li>
                        <li className={styles.content__item}>
                            <Link to={'/'}>Telegram</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;