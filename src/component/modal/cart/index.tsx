// Компонент CartModal.tsx

import {Link} from "react-router-dom";
import React, {FC, useEffect, useState} from "react";
import {priceFormat} from "../../../utils/formatter";
import {ReactComponent as TrashIcon} from "../../../assets/button/trash.svg";
import {cartRoutePath, product} from "../../../utils/route-paths";
import {useAppDispatch, useAppSelector} from "../../../service/hooks";
import {API_IMG_PATH} from "../../../service/api/api-paths";
import {removeCart, removeCartAll} from "../../../service/reducers/cart";
import styles from './index.module.css';
import {IModalInternal} from "../index";

const CartModal: FC<IModalInternal> = (props) => {
    const dispatch = useAppDispatch();
    const [isShowBox, setIsShowBox] = useState(false);
    const items = useAppSelector((state) => state.cart.data);

    useEffect(() => {
        setIsShowBox(items.length > 0);
    }, [items]);

    const handleRemove = (article: string) => {
        if (items.length === 1) {
            setIsShowBox(false);
            props.handleMouseLeave();
        }
        dispatch(removeCart(article));
    };

    const handleRemoveAll = () => {
        dispatch(removeCartAll());
        setIsShowBox(false);
        props.handleMouseLeave();
    };

    return (
        <div className={`${styles.modal} ${isShowBox ? styles.modal_show : ""}`} onMouseEnter={props.handleMouseEnter}
             onMouseLeave={props.handleMouseLeave}>
            <div className={styles.header__wrapper}>
                <span className={styles.header_title}>Корзина</span>
                <button className={styles.header__btn_remove} onClick={handleRemoveAll}>Очистить всё</button>
            </div>
            <div className={styles.content__wrapper}>
                {
                    items.map((i, index) => {
                        return (
                            <div key={index} className={styles.content}>
                                <Link className={styles.content__img_title} to={`${product}/${i.productId}`}>
                                    <img src={`${API_IMG_PATH}${i.imgId}`} alt={i.title} loading="lazy" width="100%"
                                         height="100%"/>
                                    <div className={styles.content__text}>
                                        <span>{i.title}</span>
                                    </div>
                                </Link>
                                <div className={styles.content__price_remove}>
                                    <div className={styles.content__price_container}>
                                        {
                                            i.priceNew ? (
                                                <>
                                                    <span
                                                        className={styles.content__price_new}>{priceFormat(i.priceNew)}</span>
                                                    <span
                                                        className={styles.content__price_old}>{priceFormat(i.priceOld)}</span>
                                                </>
                                            ) : (
                                                <span
                                                    className={styles.content__price_new}>{priceFormat(i.priceOld)}</span>
                                            )
                                        }
                                    </div>
                                    <TrashIcon className={styles.icon} onClick={() => handleRemove(i.productId)}/>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
            <div className={styles.footer__wrapper}>
                <div className={styles.footer__price_wrapper}>
                    <span className={styles.footer__price_header}>Итого</span>
                    <span className={styles.footer__price_total}>
            {
                priceFormat(
                    items.reduce((x, y) => x + (y.priceNew ? y.priceNew : y.priceOld), 0)
                )
            }
          </span>
                </div>
                <Link to={cartRoutePath} className={styles.footer__btn} onClick={props.handleMouseLeave}>В корзину</Link>
            </div>
        </div>
    );
};

export default CartModal;

// ... (остальной код)
