import {Link} from "react-router-dom";
import React from "react";

import img from '../../../../assets/info/about-company.png';
import img1 from '../../../../assets/info/certificate-1.png';
import img2 from '../../../../assets/info/certificate-2.png';
import img3 from '../../../../assets/info/certificate-3.png';
import img4 from '../../../../assets/info/certificate-4.png';
import img5 from '../../../../assets/info/certificate-5.png';
import img6 from '../../../../assets/info/certificate-6.png';

import styles from './index.module.css';


const AboutCompany = () => {
    return (
        <>
            <h2 className={styles.header}>О компании</h2>
            <div className={styles.content}>
                <div className={styles.content_top_left}>
                    <div className={styles.content_img}>
                        <img src={img} alt="О компании" loading="lazy" width="100%" height="100%"/>
                    </div>
                    <div className={styles.content_label_top}>
                        <Link to={'https://yandex.ru/maps/-/CCUDiWXSpD'} target={'_blank'}>
                            г. Екатеринбург, ул.40 лет Октября, д.29</Link>
                    </div>
                    <div className={styles.content_label_bottom}>
                        <Link className={styles.label_bottom_left} to={'tel:+73433604786'}>+7 (343) 360-47-86</Link>
                        <Link className={styles.label_bottom_right} to={'tel:+73433604787'}>+7 (343) 360-47-87</Link>
                    </div>
                </div>
                <div className={styles.content_top_right}>
                    <p>
                        Если Вы решили стать настоящим охотником, рыболовом или туристом, то всё необходимое можно
                        приобрести в оружейном магазине «ПРОСТОР». На 200 кв. метрах торговых залов нашего магазина
                        представлено более 6000 наименований товара.
                    </p>
                    <p>
                        Наши консультанты, работая в области продаж товаров для охоты, рыбалки и туризма более 15 лет, с
                        радостью помогут Вам подобрать подарок для близкого человека в зависимости от его увлечений или
                        приобрести подарочные сертификаты.
                    </p>
                    <p>
                        У нас всегда большой ассортимент охотничьего, пневматического оружия и оружия самообороны
                        отечественных и зарубежных производителей, ножи Златоустовских, Кизлярских и Нижегородских
                        мастеров, патроны всех видов и калибров, оптические прицелы Leupold, Hakko, ВОМЗ и других марок,
                        бинокли Nikon, Olimpus, Veber, Leupold, дальномеры, тепловизоры, GPS-навигаторы, рации,
                        различные аксессуары и запчасти для оружия.
                    </p>
                    <p>
                        Большой выбор одежды и обуви на все сезоны, а также спальники, палатки, туристическая мебель.
                        В рыболовном отделе всегда в наличии надувные лодки: «REEF», «Сокол», лодочные моторы GOLFSTREAM
                        (PARSUN), спиннинги, удочки, катушки, ведущих производителей (Shimano, Daiwa, Salmo), мормышки,
                        ледобуры, рыболовные ящики, крючки, поплавки электронные сигнализаторы клёва и эхолоты.
                    </p>
                </div>
                <ul className={styles.content_certificates_list}>
                    <li className={styles.content_certificates_item}>
                        <img src={img1} alt="Диплом за долгосрочное сотрудничество с  ЗАО Байкал" loading="lazy"
                             width="100%" height="100%"/>
                    </li>
                    <li className={styles.content_certificates_item}>
                        <img src={img2}
                             alt="Благодарственное письмо за организацию и проведение чемпионата по рыбной ловле"
                             loading="lazy" width="100%" height="100%"/>
                    </li>
                    <li className={styles.content_certificates_item}>
                        <img src={img3} alt="Свидетельство о дистрибьюции ООО Псков-Полимер" loading="lazy" width="100%"
                             height="100%"/>
                    </li>
                    <li className={styles.content_certificates_item}>
                        <img src={img4} alt="Димплом Майский экстрим 2012" loading="lazy" width="100%" height="100%"/>
                    </li>
                    <li className={styles.content_certificates_item}>
                        <img src={img5} alt="Сертификат дилера Golfstream" loading="lazy" width="100%" height="100%"/>
                    </li>
                    <li className={styles.content_certificates_item}>
                        <img src={img6} alt="Сертификат дилера Toyama" loading="lazy" width="100%" height="100%"/>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default AboutCompany;