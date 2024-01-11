import React, {FC} from "react";
import {Link} from "react-router-dom";

import {ReactComponent as WishlistIcon} from '../../../assets/common/wishlist.svg';
import {ReactComponent as CompareIcon} from '../../../assets/common/compare.svg';
import {ReactComponent as StarIcon} from '../../../assets/common/star.svg';

import {priceFormat} from "../../../utils/formatter";
import Button from "../button";
import {API_IMG_PATH} from "../../../service/api/api-paths";
import {product} from "../../../utils/route-paths";
import {useCartActive} from "../../../hook/useCartActive";
import {useWishlistActive} from "../../../hook/useWishlistActive";
import {useCompareActive} from "../../../hook/useCompareActive";

import styles from './index.module.css'

const ProductCard: FC<Omit<IProductCardShort, 'article'>> = (props): React.JSX.Element => {
    const commonProductProps = {
        productId: props.productId,
        imgId: props.imageIds[0],
        title: props.title,
        priceNew: props.priceNew,
        priceOld: props.priceOld,
        isLicensedProduct: props.isLicensedProduct,
    };
    const {isCartActive, handleCartClick} = useCartActive(commonProductProps);
    const {isWishlistActive, handleWishlistClick} = useWishlistActive({
        ...commonProductProps,
        rating: props.rating,
        commentCount: props.commentCount,
        categoryId: props.categoryId,
        attributes: props.attributes,
        purchasesCount: props.purchasesCount
    });

    const {isCompareActive, handleCompareClick} = useCompareActive({
        ...commonProductProps,
        rating: props.rating,
        commentCount: props.commentCount,
        categoryId: props.categoryId,
        attributes: props.attributes,
        purchasesCount: props.purchasesCount
    });


    const pricesRender = props.priceNew ? (
        <>
            <span className={styles.price}>{priceFormat(props.priceNew)}</span>
            <span className={styles.price__old}>{priceFormat(props.priceOld)}</span>
        </>
    ) : (
        <span className={styles.price}>{priceFormat(props.priceOld)}</span>
    );

    return (
        <div className={`${styles.container}`}>
            <Link to={`${product}/${props.productId}`} className={`${styles.img__container}`}>
                <img src={`${API_IMG_PATH}${props.imageIds[0]}`} alt={props.title} loading='lazy' width='100%'
                     height='100%'/>
            </Link>
            <div className={`${styles.content__container}`}>
                <Link to={`${product}/${props.productId}`}>
                    <p className={styles.content__title}>{props.title}</p>
                </Link>
                <div className={styles.rating__container}>
                    <div className={styles.rating__container_img}>
                        <StarIcon/>
                        <span>{props.rating}</span>
                    </div>
                    <div className={styles.rating__container_description}>
                        <span>{props.commentCount} отзывов</span>
                    </div>
                </div>
                <div className={styles.price__container}>
                    {pricesRender}
                </div>
                <div className={styles.actions__container}>
                    <Button className={styles.action__cart}
                            onClick={handleCartClick}
                            isActive={isCartActive}
                            icon={"cart"}
                            productId={props.productId}/>
                    <span className={`${styles.action__wishlist} ${isWishlistActive && styles.action__wishlist_active}`} onClick={handleWishlistClick}>
                        <WishlistIcon/>
                    </span>
                    <span className={`${styles.action__compare} ${isCompareActive && styles.action__compare_active}`} onClick={handleCompareClick}>
                        <CompareIcon/>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default React.memo(ProductCard);