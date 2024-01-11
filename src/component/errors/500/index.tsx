import {Link} from "react-router-dom";

import {rootRoutePath} from "../../../utils/route-paths";

import styles from '../index.module.css';

const ServerError = () => {
    return (
        <div className={styles.container}>
            <span className={styles.header}>500</span>
            <div className={styles.desc_wrapper}>
                <span className={styles.desc_header}>Внутренняя ошибка сервера</span>
                <span className={styles.desc_text}>
                    Произошла непредвиденная ошибка на сервере.
                    <br/>
                    Мы будем рады, если вы сообщите нам о ней, чтобы мы могли быстро ее исправить.
                    <br/>
                    Спасибо за ваше понимание.
                    <br/>
                    <br/>
                    <Link to={rootRoutePath} className={styles.desc_link}>Перейти на главную страницу</Link>
                </span>
            </div>
        </div>
    );
};

export default ServerError;