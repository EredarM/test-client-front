import React, {useEffect, useMemo} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination} from 'swiper';

import Arrow from "../../../common/arrow";
import {API_IMG_PATH} from "../../../../service/api/api-paths";
import {useAppDispatch, useAppSelector} from "../../../../service/hooks";
import {getBanners} from "../../../../service/reducers/banners";

import styles from './index.module.css';


const LeftSlider = (): React.JSX.Element => {
    const dispatch = useAppDispatch();
    const leftSliderStore = useAppSelector((store) => store.banners);

    useEffect(() => {
            dispatch(getBanners())
        },
        [dispatch]
    );

    const itemsView = useMemo(
        () => {
            if (leftSliderStore.data) {
                return [...leftSliderStore.data].sort((x, y) => x.sort - y.sort)
            }
        },
        [leftSliderStore]
    );

    const content = (
        <>
            {
                itemsView?.map((i, index) => {
                    return (
                        <SwiperSlide key={index} className={styles.content__wrapper}>
                            <picture>
                                <source srcSet={`${API_IMG_PATH}${i.imgId}`} media='(min-width: 560px)'/>
                                <img src={`${API_IMG_PATH}${i.imgId}`} alt={i.title} loading='lazy' width='100%'
                                     height='100%'/>
                            </picture>
                        </SwiperSlide>
                    );
                })
            }
        </>
    );


    return (
        <div className={`${styles.wrapper}`}>
            <div id={'left_main_slider'} className={`${styles.wrapper__container}`}>
                {
                    content && (
                        <>
                            <Swiper
                                autoplay={{delay: 200}}
                                loop={true}
                                navigation={{
                                    enabled: true,
                                }}
                                pagination={{
                                    dynamicBullets: true,
                                    clickable: true,
                                    el: '.swiper_pagination_container-left'
                                }}
                                modules={[Pagination, Navigation]}
                            >
                                <Arrow type={"left"} idContainer={'left_main_slider'}/>
                                {content}
                                <Arrow type={"right"} idContainer={'left_main_slider'}/>
                            </Swiper>
                        </>
                    )
                }
            </div>
            <div className={'swiper_pagination_container-left'}></div>
        </div>
    );
};

export default LeftSlider;
