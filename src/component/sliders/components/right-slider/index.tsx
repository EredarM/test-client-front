import React, {useCallback, useEffect} from "react";
import {Link} from "react-router-dom";
import {Navigation, Pagination} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";

import Button from "../../../common/button";
import {priceFormat} from "../../../../utils/formatter";
import Arrow from "../../../common/arrow";
import {useAppDispatch, useAppSelector} from "../../../../service/hooks";
import {getMonthProducts} from "../../../../service/reducers/product";
import {API_IMG_PATH} from "../../../../service/api/api-paths";
import {product} from "../../../../utils/route-paths";

import styles from './index.module.css';
import {addCart, removeCart} from "../../../../service/reducers/cart";
import {useCartActive} from "../../../../hook/useCartActive";

const RightSlider = (): React.JSX.Element => {
    const dispatch = useAppDispatch();
    const rightSliderStore = useAppSelector((store) => store.products.monthProductData);
    const cartStore = useAppSelector((store) => store.cart.data);

    // TODO const commonProductProps = {
    //     productId: props.productId,
    //     imgId: props.imageIds[0],
    //     title: props.title,
    //     priceNew: props.priceNew,
    //     priceOld: props.priceOld,
    //     isLicensedProduct: props.isLicensedProduct,
    // };
    // const {isCartActive, handleCartClick} = useCartActive(commonProductProps);

    useEffect(() => {
        dispatch(getMonthProducts());
    }, [dispatch]);

    const handleClick = useCallback(
        (isActive: boolean, product: IProductCardShort) => {
            if (isActive) {
                dispatch(removeCart(product.productId))
            } else {
                dispatch(addCart({
                    productId: product.productId,
                    imgId: product.imageIds[0],
                    title: product.title,
                    priceNew: product.priceNew,
                    priceOld: product.priceOld,
                    isLicensedProduct: product.isLicensedProduct
                }));
            }
        },
        [dispatch]
    );

    const content = (
        <>
            {
                rightSliderStore.data?.map((i, index) => {
                    const isActive = cartStore.some(cart => cart.productId === i.productId)
                    const priceOld = priceFormat(i.priceOld);
                    const priceNew = priceFormat(i.priceNew!);
                    const discount = `-${2 * Math.round((100 - i.priceNew! * 100 / i.priceOld) / 2)} %`;
                    return (
                        <SwiperSlide className={`${styles.content}`} key={index}>
                            <Link className={`${styles.content_img}`} to={`${product}/${i.productId}`}>
                                <img src={`${API_IMG_PATH}${i.imageIds[0]}`} alt={i.title} loading="lazy" width="100%"
                                     height="100%"/>
                            </Link>
                            <div className={`${styles.discount}`}>
                                <span className={`${styles.discount_title}`}>Скидка</span>
                                <span className={`${styles.discount_value}`}>{discount}</span>
                            </div>
                            <div className={`${styles.info__price}`}>
                                <span className={`${styles.price_new}`}>{priceNew}</span>
                                <span className={`${styles.price_old}`}>{priceOld}</span>
                            </div>
                            <div className={`${styles.info__title__wrapper}`}>
                                <Link to={`${product}/${i.productId}`} className={`${styles.info__title}`}>
                                    {i.title}
                                </Link>
                            </div>
                            <Button className={styles.btn}
                                    onClick={() => handleClick(isActive, i)}
                                    isActive={isActive}
                                    icon={"cart"}
                                    text={"В корзину"}
                                    productId={i.productId}
                            />
                        </SwiperSlide>
                    );
                })
            }
        </>
    );

    return (
        <div className={`${styles.wrapper}`}>
            <div id={'right_main_slider'} className={`${styles.content__wrapper}`}>
                <div className={`${styles.container__wrapper}`}>
                    <h3 className={`${styles.header} ${styles.bg_wrapper}`}>Товар месяца</h3>
                    <Swiper
                        autoplay={{delay: 5000}}
                        loop={true}
                        pagination={{
                            dynamicBullets: true,
                            clickable: true,
                            el: '.swiper_pagination_container-right'
                        }}
                        navigation={{
                            enabled: true,
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev'
                        }}
                        modules={[Pagination, Navigation]}
                        spaceBetween={1}
                    >
                        <Arrow type={"left"} idContainer={'right_main_slider'}/>
                        {content}
                        <Arrow type={"right"} idContainer={'right_main_slider'}/>
                    </Swiper>
                </div>
            </div>
            <div className={'swiper_pagination_container-right'}></div>
        </div>
    );
};

export default RightSlider;