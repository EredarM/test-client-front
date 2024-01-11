import {Link} from "react-router-dom";

import {rootRoutePath} from "../../../utils/route-paths";

import styles from '../index.module.css';

const NotFound = () => {
    return (
        <div className={styles.container}>
            <span className={styles.header}>404</span>
            <div className={styles.desc_wrapper}>
                <span className={styles.desc_header}>Страница не найдена</span>
                <span className={styles.desc_text}>
                    Страница, на которую вы пытаетесь перейти не найдена.
                    <br/>
                    Возможно, вы ввели неправильный адрес, или страница была удалена.
                    <br/>
                    <br/>
                    <Link to={rootRoutePath} className={styles.desc_link}>Перейти на главную страницу</Link>
                </span>
            </div>
        </div>
    );
};

export default NotFound;