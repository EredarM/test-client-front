import React from "react";
import { Link, useLocation } from "react-router-dom";

import styles from './index.module.css';

type Crumb = {
    label: string;
    path: string;
};

const Breadcrumbs: React.FC = () => {
    const location = useLocation();
    const crumbs = location.state?.crumbs as Crumb[] | undefined;

    return (
        <nav className={styles.nav}>
            <ul>
                <li>
                    <Link to="/">Главная</Link>
                </li>
                {crumbs &&
                    crumbs.map((crumb, index) => (
                        <React.Fragment key={index}>
                            <li>/</li>
                            <li>
                                <Link to={crumb.path}>{crumb.label}</Link>
                            </li>
                        </React.Fragment>
                    ))}
            </ul>
        </nav>
    );
};

export default Breadcrumbs;
