import React, {useMemo} from "react";

import ProductCard from "../../../common/product-card";
import {useAppSelector} from "../../../../service/hooks";

import styles from './index.module.css';


const Cards = (): React.JSX.Element => {
    const items = useAppSelector(state => state.products.searchProductData);

    const innerContent = useMemo(
        () => {
            if (items.status === 'succeeded') {
                return (
                    <>
                        <div className={styles.sort__wrapper}>
                            <span className={styles.sort__label}>Сортировать по: </span>
                            <span className={styles.sort__selected}>Цене</span>
                            <span className={styles.sort__icon}></span>
                        </div>
                        <div className={styles.card__wrapper}>
                            {
                                items.data && items.data.map((i, index) => {
                                        return (
                                            <ProductCard
                                                productId={i.productId}
                                                key={index}
                                                imageIds={i.imageIds}
                                                title={i.title}
                                                commentCount={i.commentCount}
                                                rating={i.rating}
                                                priceNew={i.priceNew}
                                                priceOld={i.priceOld}
                                                isLicensedProduct={i.isLicensedProduct}
                                                categoryId={i.categoryId}
                                                attributes={i.attributes}
                                                purchasesCount={i.purchasesCount}
                                            />
                                        );
                                    }
                                )
                            }
                        </div>
                    </>
                );
            }
        },
        [items]
    );
    return (
        <>
            {
                innerContent
            }
        </>
    )
};

export default Cards;