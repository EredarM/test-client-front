import React, {useMemo} from "react";
import {useSearchParams} from "react-router-dom";

import PriceFilter from "./price";
import {AttributeCommonFilter, AttributeToggleFilter} from "./attribute-flter";
import {useAppSelector} from "../../../../service/hooks";
import {groupAttribute} from "../../../../utils/formatter";

import styles from './index.module.css';


const Filters = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const items = useAppSelector(state => state.products.searchProductData.data);
    const groupingAttribute = useMemo(
        () => {
            if (items) {
                return groupAttribute(items.flatMap(i => i.attributes))
            }
        },
        [items]
    );
    const price = useMemo<[string | null, string | null, string, string] | undefined>(() => {
        if (items) {
            const prices = items.map(i => i.priceNew ? i.priceNew : i.priceOld);
            if (prices.length > 0) {
                const currentPriceMin = searchParams.get('priceMin');
                const currentPriceMax = searchParams.get('priceMax');
                const priceMin = Math.min(...prices).toString();
                const priceMax = Math.max(...prices).toString();
                return [currentPriceMin, currentPriceMax, priceMin, priceMax];
            }
        }
    }, [searchParams, items]);

    return (
        <>
            {
                price && <PriceFilter
                    currentPriceMin={price[0]}
                    currentPriceMax={price[1]}
                    priceMin={price[2]}
                    priceMax={price[3]}/>
            }
            <ul className={styles.list}>
                {
                    groupingAttribute && groupingAttribute.map((i, index) => {
                        return (
                            <li key={index} className={styles.container__item}>
                                <AttributeCommonFilter name={i.name} values={i.values}/>
                            </li>
                        );
                    })
                }
                <li className={styles.container__item}>
                    <AttributeToggleFilter name={'Новинки'}/>
                </li>
                <li className={styles.container__item}>
                    <AttributeToggleFilter name={'Специальные предложения'}/>
                </li>
            </ul>
            <button className={styles.btn} onClick={() => setSearchParams(new URLSearchParams())}>Очистить фильтры
            </button>
        </>
    );
};

export default React.memo(Filters);