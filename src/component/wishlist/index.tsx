import styles from './index.module.css';
import {useAppSelector} from "../../service/hooks";
import ProductCard from "../common/product-card";
import {Link} from "react-router-dom";
import {rootRoutePath} from "../../utils/route-paths";
import React from "react";


const Wishlist = () => {
    const items = useAppSelector(state => state.wishlist.data);

    return (
        <div className={styles.container}>
            {
                items.length > 0 ? (
                    items.map((i, index) =>
                        <div key={index} className={styles.content}>
                            <ProductCard
                                productId={i.productId}
                                title={i.title}
                                priceNew={i.priceNew}
                                priceOld={i.priceOld}
                                isLicensedProduct={i.isLicensedProduct}
                                rating={i.rating}
                                imageIds={[i.imgId]}
                                commentCount={i.commentCount}
                                categoryId={i.categoryId}
                                attributes={i.attributes}
                                purchasesCount={i.purchasesCount}/>
                        </div>
                    )
                ) : (
                    <div className={styles.container_empty}>
                        <span
                            className={styles.container_empty_text}>В списке пока нет ни одного избранного товара</span>
                        <Link to={rootRoutePath} className={styles.container_empty_link}>Вернуться к покупкам</Link>
                    </div>
                )

            }
        </div>
    );
};

export default Wishlist;