import {Swiper, SwiperSlide} from "swiper/react";
import {FreeMode, Navigation} from "swiper";
import React, {FC, useState} from "react";

import Button from "../common/button";
import Arrow from "./components/arrow";
import {API_IMG_PATH} from "../../service/api/api-paths";
import {priceFormat} from "../../utils/formatter";

import {ReactComponent as StarIcon} from '../../assets/common/star.svg';
import {ReactComponent as LikeIcon} from '../../assets/common/like.svg';
import {ReactComponent as DislikeIcon} from '../../assets/common/dislike.svg';
import {ReactComponent as Warning} from "../../assets/common/warning.svg";
import {ReactComponent as Wishlist} from "../../assets/common/wishlist.svg";
import {ReactComponent as Compare} from "../../assets/common/compare.svg";

import FeedbackModal from "../modal/feedback";
import Modal from "../modal";
import {useWishlistActive} from "../../hook/useWishlistActive";
import {useCartActive} from "../../hook/useCartActive";
import {useCompareActive} from "../../hook/useCompareActive";
import {useFeedbackModal} from "../../hook/useFeedbackModal";

import styles from './index.module.css';

const ProductCardInfo: FC<IProductCard> = (props) => {
    const [isOpen, setOpen] = useState(false);
    const [mainImg, setMainImg] = useState<string>(props.imageIds[0]);
    const {isFeedbackModalOpen, handleClickOpenFeedback, handleClickCloseFeedback} = useFeedbackModal();
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

    const handleClickImg = (e: React.SyntheticEvent<HTMLImageElement>) => {
        setMainImg(e.currentTarget.src.substring(API_IMG_PATH.length));
    };

    return (
        <>
            <div className={styles.content__container}>
                <div id={`card__slider`} className={styles.card__slider_img}>
                    <Swiper
                        navigation={true}
                        modules={[Navigation]}
                        direction={'vertical'}
                        slidesPerView={6}
                        spaceBetween={8}
                        className={styles.card__swiper}>
                        <Arrow type={'top'}/>
                        {
                            props.imageIds.map((i, index) => {
                                return (
                                    <SwiperSlide key={index}
                                                 className={`${i === mainImg ? styles.swiper__item_active : styles.swiper__item}`}>
                                        <img onClick={handleClickImg} src={i} alt="" loading="lazy" width="100%"
                                             height="100%"/>
                                    </SwiperSlide>
                                );
                            })
                        }
                        <Arrow type={'bottom'}/>
                    </Swiper>
                </div>
                <div className={styles.card__main_img_wrapper}>
                    <img src={`${API_IMG_PATH}${mainImg}`} alt={props.title} loading="lazy" width="100%" height="100%"/>
                </div>
                <div className={styles.card__control}>
                    <h2 className={styles.header}>{props.title}</h2>
                    {
                        props.isLicensedProduct &&
                        <div className={styles.card__warning}>
                            <Warning/>
                            <span>Лицензионный товар</span>
                        </div>
                    }
                    <div className={styles.card__article_count}>
                        <span>Код товара: {props.article}</span>
                        <span>Купили {props.purchasesCount} раз(а)</span>
                    </div>
                    <div className={styles.card__price}>
                        {
                            props.priceNew ? (
                                <>
                                    <span className={styles.card__price_new}>{priceFormat(props.priceNew)}</span>
                                    <span className={styles.card__price_old}>{priceFormat(props.priceOld)}</span>
                                </>
                            ) : (
                                <span className={styles.card__price_new}>{priceFormat(props.priceOld)}</span>
                            )
                        }
                    </div>
                    <div className={styles.card__btn_container}>
                        <Button
                            className={styles.card__btn}
                            onClick={handleCartClick}
                            isActive={isCartActive}
                            icon={'cart'}
                            text={'В корзину'}
                            productId={props.productId}/>
                        <Wishlist
                            className={`${styles.btn_container__icon} ${isWishlistActive && styles.btn_container__icon_active}`}
                            onClick={handleWishlistClick}/>
                        <Compare
                            className={`${styles.btn_container__icon} ${isCompareActive && styles.btn_container__icon_active}`}
                            onClick={handleCompareClick}/>
                    </div>
                </div>
            </div>
            <div className={styles.description__container}>
                <span className={styles.description__title}>Описание и характеристики</span>
                <div className={styles.description__top}>
                    <p className={`${styles.description__top_content} ${isOpen ? styles.description__top_content_open : styles.description__top_content_close}`}>{props.description}</p>
                    <span onClick={() => setOpen(!isOpen)} className={styles.description__top_btn}>
                        {
                            isOpen ? 'Скрыть' : 'Показать ещё'
                        }
                    </span>
                </div>
                <div className={styles.description__bottom}>
                    <ul className={styles.description__bottom_list}>
                        {
                            props.attributes.map((i, index) => {
                                return (
                                    <li key={index} className={styles.description__bottom_item}>
                                        <span className={styles.description_item_name}>{i.name}</span>
                                        <span className={styles.description_item_dotted}></span>
                                        <span className={styles.description_item_value}>{i.value}</span>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
            </div>
            <div className={styles.feedback__container}>
                <div className={styles.feedback__titles__container}>
                    <span className={styles.feedback__title}>Отзывы</span>
                    <span className={styles.feedback__count}>{props.commentCount}</span>
                </div>
                <div className={styles.feedback__rating__container}>
                    <div className={styles.rating__icon}>
                        {
                            Array.from({length: 5}, (_, index) => (
                                <StarIcon key={index}
                                          className={index < (props!.rating - 1) ? styles.feedback_item_star_active : styles.feedback_item_star}/>
                            ))
                        }
                    </div>
                    <span className={styles.rating__title}>{props.rating}</span>
                </div>
                <div className={styles.feedback_swiper}>
                    <Swiper
                        slidesPerView={1}
                        freeMode={true}
                        modules={[FreeMode]}
                        breakpoints={{
                            1140: {
                                slidesPerView: 3,
                                spaceBetween: 24,
                            },
                            1440: {
                                slidesPerView: 3,
                                spaceBetween: 24,
                            },
                        }}>
                        {
                            props.feedbacks.map((i, index) => {
                                return (
                                    <SwiperSlide key={index} onClick={() => handleClickOpenFeedback(i)}
                                                 className={styles.feedback_swiper_item}>
                                        <div className={styles.feedback_item_info}>
                                            <span className={styles.item_info_name}>{i.name}</span>
                                            <span className={styles.item_info_time}>{i.time}</span>
                                        </div>
                                        <div className={styles.feedback_item_rating}>
                                            <div className={styles.item_rating__icon}>
                                                {
                                                    Array.from({length: 5}, (_, index) => (
                                                        <StarIcon key={index}
                                                                  className={index < (i.rating - 1) ? styles.feedback_item_star_active : styles.feedback_item_star}/>
                                                    ))
                                                }
                                            </div>
                                            <span className={styles.item_rating__title}>{i.rating}</span>
                                        </div>
                                        <div className={styles.feedback_item_desc}>
                                            <span className={styles.feedback_item_title}>Достоинства:</span>
                                            <p className={styles.feedback_item_content}>{i.advantages}</p>
                                        </div>
                                        <div className={styles.feedback_item_desc}>
                                            <span className={styles.feedback_item_title}>Недостатки:</span>
                                            <p className={styles.feedback_item_content}>{i.disadvantages}</p>
                                        </div>
                                        <div className={styles.feedback_item_desc}>
                                            <span className={styles.feedback_item_title}>Коментарий:</span>
                                            <p className={styles.feedback_item_content}>{i.comment}</p>
                                        </div>
                                        <div className={styles.feedback_item_likes}>
                                            <div className={styles.item_like}>
                                                <LikeIcon className={styles.item_like_icon}/>
                                                <span className={styles.item_like_title}>{i.likeCount}</span>
                                            </div>
                                            <div className={styles.item_dislike}>
                                                <DislikeIcon className={styles.item_dislike_icon}/>
                                                <span className={styles.item_dislike_title}>{i.dislikeCount}</span>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                </div>
            </div>
            {
                isFeedbackModalOpen && (
                    <Modal onClose={handleClickCloseFeedback}>
                        <FeedbackModal/>
                    </Modal>
                )
            }
        </>
    );
};

export default ProductCardInfo;