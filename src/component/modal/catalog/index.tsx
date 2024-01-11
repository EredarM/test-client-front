import React, {FC, useEffect, useMemo, useState} from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../service/hooks";
import { getCatalogPath } from "../../../utils/route-paths";
import styles from './index.module.css';
import {IModalInternal} from "../index";

const CatalogModal: FC<IModalInternal> = (props) => {
    const items = useAppSelector((state) => state.catalog.data);
    const [currentTab, setCurrentTab] = useState<string | undefined>(undefined);

    useEffect(() => {
        setCurrentTab(items?.[0]?.categoryId);
    }, [items]);

    const rootItems = useMemo(
        () => items?.filter(item => item.isRoot),
        [items]
    );

    return (
        <>
            {rootItems && (
                <div
                    className={`${styles.modal} ${styles.modal_show}`}
                    onMouseEnter={props.handleMouseEnter}
                    onMouseLeave={props.handleMouseLeave}
                >
                    <ul className={styles.modal__list_left}>
                        {rootItems.map((i, index) => (
                            <li
                                key={index}
                                onMouseEnter={() => setCurrentTab(i.categoryId)}
                                className={`${styles.modal__item_left} ${
                                    currentTab === i.categoryId ? styles.modal__item_left_active : ""
                                }`}
                            >
                                <Link onClick={props.handleMouseLeave} to={getCatalogPath(i.categoryId, i.childCategories.isEmpty())}>
                                    {i.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className={styles.modal__right}>
                        {
                            rootItems.find(i => i.categoryId === currentTab)?.childCategories.map((i, index) => (
                                <ul key={index} className={styles.modal__list_right}>
                                    <li className={styles.modal__item_right}>
                                        <Link onClick={props.handleMouseLeave} to={getCatalogPath(i.categoryId, i.childCategories.isEmpty())}>
                                            {i.title}
                                        </Link>
                                    </li>
                                    {i?.childCategories.map((j, jIndex) => (
                                        <li key={jIndex} className={styles.modal__item_right}>
                                            <Link onClick={props.handleMouseLeave} to={getCatalogPath(j.categoryId, j.childCategories.isEmpty())}>
                                                {j.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ))
                        }
                    </div>
                </div>
            )}
        </>
    );
};

export default CatalogModal;
