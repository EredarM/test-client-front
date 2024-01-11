import React, {useEffect} from "react";
import {useParams, useSearchParams} from "react-router-dom";

import Filters from "./components/filters";
import Cards from "./components/cards";
import {getSearchProducts} from "../../service/reducers/product";
import {useAppDispatch} from "../../service/hooks";

import styles from './index.module.css';

const Search = () => {
    const dispatch = useAppDispatch();
    const param = useParams<{ catalogId: string }>();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const text = searchParams.get("text");
        dispatch(getSearchProducts({
            params: searchParams,
            catalogId: param.catalogId,
            text: text ?? undefined
        }));
    }, [dispatch, param.catalogId, searchParams]);

    return (
        <div className={styles.container}>
            <div className={styles.filter__wrapper}>
                <Filters/>
            </div>
            <div className={styles.cards__wrapper}>
                <Cards/>
                <div className={styles.show__more}>
                    <button className={styles.show__more_btn}>Показать ещё</button>
                </div>
            </div>
        </div>
    );
};

export default React.memo(Search);