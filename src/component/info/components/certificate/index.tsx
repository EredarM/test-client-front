import React from "react";

import img from "../../../../assets/info/certificate-main.png";

import styles from "./index.module.css";


const Certificate = () => {
    return (
        <>
            <h2 className={styles.header}>Подарочный сертификат</h2>
            <div className={styles.content}>
                <div className={styles.content_left}>
                    <img src={img} alt="О компании" loading="lazy" width="100%" height="100%"/>
                </div>
                <div className={styles.content_right}>
                    <p className={styles.content_right_text}>
                        Подарочный сертификат - это идеальный подарок: на любой вкус, возраст и бюджет, который
                        обязательно порадует Ваших любимых, друзей и родных!
                    </p>
                    <p className={`${styles.content_right_text} ${styles.content_right_text_last}`}>
                        В продаже имеются сертификаты различных номиналов: 500, 1000, 2000, 3000, 5000 и 10000 рублей.
                    </p>
                    <div className={styles.content_right_labels}>
                        <span className={styles.content_label_header}>Условия использования сертификата:</span>
                        <div className={styles.content_label_list}>
                            <p className={styles.content_label}>
                                Предъявление подарочного сертификата дает право его обладателю купить товары на сумму,
                                которая в нем указана.
                            </p>
                            <p className={styles.content_label}>
                                Товары продаются
                                в соответствии
                                с законодательством Российской Федерации.
                            </p>
                            <p className={styles.content_label}>
                                Сертификат не подлежит обмену на денежный эквивалент.
                            </p>
                            <p className={styles.content_label}>
                                В случае утери
                                не восстанавливается.
                            </p>
                        </div>
                    </div>
                    <p className={styles.content_right_text}>
                        Покупку можно оформить по телефону или в нашем магазине по адресу 620088, г. Екатеринбург, ул.40
                        лет Октября, д.29
                    </p>
                </div>
            </div>
        </>
    );
};

export default Certificate;