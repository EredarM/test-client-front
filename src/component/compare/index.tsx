import React, {useMemo, useState} from "react";
import {Link} from "react-router-dom";

import {rootRoutePath} from "../../utils/route-paths";
import {groupCategory} from "../../utils/formatter";
import ProductCard from "../common/product-card";
import {useAppSelector} from "../../service/hooks";
import {ReactComponent as StarIcon} from '../../assets/common/star.svg';


import styles from "./index.module.css";

const Compare = () => {
    const [activeCategory, setActiveCategory] = useState(0);
    const itemsCompare = useAppSelector(state => state.compare.data);
    const itemsCategory = useAppSelector(state => state.catalog);

    const groupedByCategory = useMemo(
        () => groupCategory(itemsCompare),
        [itemsCompare]
    );

    const activeGroup = groupedByCategory[activeCategory];

    const groupedByAttribute = useMemo(() => {
        if (activeGroup) {
            const uniqueAttributeNames = Array.from(
                new Set(activeGroup.items.flatMap(compare => compare.attributes.map(attribute => attribute.name)))
            );
            return uniqueAttributeNames.map(name => {
                const values = activeGroup.items.map(i => {
                    const attribute = i.attributes.find(j => j.name === name);
                    return attribute ? attribute.value : "—";
                });
                return {name, values};
            });
        }
        return [];
    }, [activeGroup]);

    const renderProducts = () => {
        return activeGroup.items.map((item, index) => (
            <div key={index} className={styles.wrapper_head}>
                <ProductCard
                    productId={item.productId}
                    title={item.title}
                    attributes={item.attributes}
                    categoryId={item.categoryId}
                    commentCount={item.commentCount}
                    imageIds={[item.imgId]}
                    isLicensedProduct={item.isLicensedProduct}
                    priceNew={item.priceNew}
                    priceOld={item.priceOld}
                    rating={item.rating}
                    purchasesCount={item.purchasesCount}
                />
            </div>
        ));
    };

    const renderRating = () => {
        return activeGroup.items.map((item, index) => (
            <li key={index} className={styles.inner_content_item}>
                <span className={`${styles.inner_content_text_odd} ${styles.inner_content_text}`}>
                  <StarIcon/>&nbsp;{item.rating}
                </span>
            </li>
        ));
    };

    const renderAttributes = () => {
        return groupedByAttribute.map((group, index) => (
            <div key={index}
                 className={`${styles.inner_content_wrapper} ${index % 2 === 0 && styles.inner_content_even}`}>
                <span className={styles.inner_content_head}>{group.name}</span>
                <ul className={styles.inner_content_list}>
                    {group.values.map((value, indexJ) => (
                        <li key={indexJ} className={styles.inner_content_item}>
                              <span
                                  className={`${index % 2 === 0 ? styles.inner_content_text_even : styles.inner_content_text_odd}`}>
                                {value}
                              </span>
                        </li>
                    ))}
                </ul>
            </div>
        ));
    };

    return (
        <>
            {
                itemsCategory.data && (
                    !itemsCategory.data.isEmpty() && itemsCompare.length > 0 ? (
                        <div className={styles.container}>
                            <nav className={styles.nav}>
                                <ul className={styles.nav_list}>
                                    {groupedByCategory.map((group, index) => (
                                        <li
                                            key={index}
                                            onClick={() => setActiveCategory(index)}
                                            className={`${styles.nav_item} ${activeCategory === index ? styles.nav_item_active : ''}`}
                                        >
                                  <span>
                                    {`${itemsCategory.data!!.find(x => x.categoryId === group.categoryId)!!.title} ${group.items.length}`}
                                  </span>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                            <div className={styles.scrollbar_wrapper_content}>
                                <div className={styles.content}>
                                    {activeGroup && (
                                        <>
                                            {renderProducts()}
                                            <div className={`${styles.wrapper_content}`}>
                                                <div className={`${styles.inner_content_wrapper}`}>
                                                    <span className={styles.inner_content_head}>Рейтинг</span>
                                                    <ul className={styles.inner_content_list}>
                                                        {renderRating()}
                                                    </ul>
                                                </div>
                                                {groupedByAttribute && renderAttributes()}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.container_empty}>
                            <span className={styles.container_empty_text}>Список сравнения пуст</span>
                            <Link to={rootRoutePath} className={styles.container_empty_link}>
                                Вернуться к покупкам
                            </Link>
                        </div>
                    )
                )
            }
        </>
    );
};

export default Compare;