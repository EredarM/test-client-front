import React, {FC} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from 'swiper';

import ProductCard from "../product-card";

import styles from './index.module.css';
import Arrow from "../arrow";


interface IBaseSlider {
    title: string;
    idContainer: 'sales_hits_slider' | 'season_offer';
    element: ReadonlyArray<IProductCardShort>;
}

const BaseSlider: FC<IBaseSlider> = (props) => {
    const {title, element} = props;

    const content = (
        element.map((i, index) => {
            return (
                <SwiperSlide key={index}>
                    <ProductCard
                        productId={i.productId}
                        imageIds={i.imageIds}
                        title={i.title}
                        commentCount={i.commentCount}
                        rating={i.rating}
                        priceNew={i.priceNew}
                        priceOld={i.priceOld}
                        isLicensedProduct={i.isLicensedProduct}
                        categoryId={i.categoryId}
                        attributes={i.attributes}
                        purchasesCount={i.purchasesCount}/>
                </SwiperSlide>
            );
        })
    );

    return (
        <section className={styles.section}>
            <div className={`global_container ${styles.container}`}>
                <h2 className={styles.header}>{title}</h2>
                <div id={props.idContainer} className={`${styles.wrapper}`}>
                    <Swiper
                        slidesPerView={3}
                        breakpoints={{
                            1140: {
                                slidesPerView: 5,
                                spaceBetween: 24,
                            },
                            1440: {
                                slidesPerView: 6,
                                spaceBetween: 24,
                            },
                        }}
                        modules={[Navigation]}>
                        <Arrow type={"left"} idContainer={props.idContainer}/>
                        {content}
                        <Arrow type={"right"} idContainer={props.idContainer}/>
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default BaseSlider;