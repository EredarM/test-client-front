import React, {useEffect, useMemo} from "react";
import {useParams} from "react-router-dom";

import CategoryCard from "./components/card";
import {useAppDispatch, useAppSelector} from "../../service/hooks";

import styles from './index.module.css';
import {getCatalog} from "../../service/reducers/catalog";

const Catalog = () => {
    const dispatch = useAppDispatch();
    const items = useAppSelector(state => state.catalog);
    const routeParams = useParams<{ catalogId: string }>();
    const filteredItems = useMemo(
        () => items?.data?.find(i => i.categoryId === routeParams.catalogId),
        [items?.data, routeParams]
    );

    useEffect(
        () => {
            dispatch(getCatalog())
        },
        [dispatch]
    );

    return (
        <>
            {
                filteredItems && (
                    <div className={`grid__container ${styles.wrapper__item}`}>
                        {
                            filteredItems.childCategories.map(
                                ({imageId, title, productCount, categoryId, childCategories}, index) => (
                                    <CategoryCard
                                        key={index}
                                        imageId={imageId}
                                        title={title}
                                        productCount={productCount}
                                        categoryId={categoryId}
                                        childCategories={childCategories}
                                    />
                                )
                            )
                        }
                    </div>
                )
            }
        </>
    )
};

export default Catalog;
