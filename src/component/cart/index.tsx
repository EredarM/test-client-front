import React, {ChangeEvent, FC, useCallback, useMemo, useState} from "react";
import {Link} from "react-router-dom";

import {ReactComponent as Warning} from "../../assets/common/warning.svg";

import styles from './index.module.css';
import {useAppDispatch, useAppSelector} from "../../service/hooks";
import {decreaseCount, ICart, increaseCount, updateCount} from "../../service/reducers/cart";
import {API_IMG_PATH} from "../../service/api/api-paths";
import {priceFormat} from "../../utils/formatter";
import {infoLicensedProductRoutePath, product, rootRoutePath} from "../../utils/route-paths";

interface ICartItem extends ICart {
    count: number;
    checked: boolean;
    handleCheckboxChange: () => void;
}

interface CheckedItemsState {
    productId: string;
    isChecked: boolean;
}

const CartItem: FC<ICartItem> = (props): React.JSX.Element => {
    const {
        productId,
        count,
        checked,
        handleCheckboxChange,
        imgId,
        title,
        priceNew,
        priceOld,
        isLicensedProduct
    } = props;
    const [localCount, setLocalCount] = useState<number>(count);
    const dispatch = useAppDispatch();

    const handleInputBlur = useCallback(() => {
        if (!localCount) {
            setLocalCount(1);
        }
        if (localCount) {
            dispatch(updateCount({productId, count: localCount}));
        }
    }, [localCount, productId, dispatch]);

    const handleIncreaseChange = useCallback(() => {
        if (localCount) {
            setLocalCount(localCount + 1);
        }
        dispatch(increaseCount(productId));
    }, [localCount, productId, dispatch]);

    const handleDecreaseChange = useCallback(() => {
        if (localCount && localCount > 1) {
            setLocalCount(localCount - 1);
        }
        dispatch(decreaseCount(productId));
    }, [localCount, productId, dispatch]);

    return (
        <>
            <div className={styles.left_container_info}>
                <label className={`${styles.label__container} ${styles.container_info_label}`}>
                    <input className={styles.label__input} checked={checked} onChange={handleCheckboxChange}
                           type="checkbox"/>
                    <span className={styles.label__checkmark}></span>
                </label>
                <div className={styles.left_container_img}>
                    <Link to={`${product}/${productId}`}>
                        <img src={`${API_IMG_PATH}${imgId}`} alt={title} loading="lazy" width="100%" height="100%"/>
                    </Link>
                </div>
                <div className={styles.left_container_title_wrapper}>
                    <Link to={`${product}/${productId}`}>
                        <span className={styles.left_container_title}>{title}</span>
                    </Link>
                    {isLicensedProduct && (
                        <div className={styles.warning_wrapper}>
                            <Warning className={styles.warning}/>
                            <span className={styles.warning_label}>
                                Для приобритения товара необходима лицензия.
                                <Link to={infoLicensedProductRoutePath}>Подробнее</Link></span>
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.left_container_btns}>
                <button className={styles.container_btn_minus} onClick={handleDecreaseChange} type="button">
                    <span className={styles.btn_line_horizontal}></span>
                </button>
                <input
                    className={styles.container_btn_header}
                    min={1}
                    maxLength={3}
                    type="number"
                    value={localCount || ""}
                    onKeyDown={(e) => e.key === "Enter" && handleInputBlur()}
                    onBlur={handleInputBlur}
                    onChange={(e) => setLocalCount(Number(e.target.value))}
                />
                <button className={styles.container_btn_plus} onClick={handleIncreaseChange} type="button">
                    <span className={styles.btn_line_horizontal}></span>
                    <span className={styles.btn_line_vertical}></span>
                </button>
            </div>
            <div className={styles.left_container_prices}>
                {priceNew ? (
                    <>
                        <span className={styles.price_new}>{priceFormat(priceNew)}</span>
                        <span className={styles.price_old}>{priceFormat(priceOld)}</span>
                    </>
                ) : (
                    <span className={styles.price_new}>{priceFormat(priceOld)}</span>
                )}
            </div>
        </>
    );
};

const Cart = () => {
    const items = useAppSelector((state) => state.cart.data);
    const [checkedSelectAll, setCheckedSelectAll] = useState(false);
    const [checkedItems, setCheckedItems] = useState<CheckedItemsState[]>(() => {
        const initialState: CheckedItemsState[] = items.map((item) => ({
            productId: item.productId,
            isChecked: false,
        }));
        return initialState;
    });

    const handleCheckboxChange = useCallback(
        (productId: string) => {
            const newCheckedItems = checkedItems.map((item) =>
                item.productId === productId ? {...item, isChecked: !item.isChecked} : item
            )
            setCheckedItems(newCheckedItems);
            setCheckedSelectAll(newCheckedItems.filter(i => i.isChecked).length === checkedItems.length)
        },
        [checkedItems]
    );

    const handleSelectAllCheckboxChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const {checked} = e.target;
            setCheckedItems((prevCheckedItems) =>
                prevCheckedItems.map((item) => ({...item, isChecked: checked}))
            );
            setCheckedSelectAll(checked);
        },
        []
    );

    const filteredItems = useMemo(() => items.filter(
            (item) => checkedItems.find((i) => i.productId === item.productId)?.isChecked
        ),
        [items, checkedItems]
    );
    const totalItems = useMemo(() => filteredItems.reduce((acc, item) => acc + item.count, 0),
        [filteredItems]
    );
    const salePrice = useMemo(
        // eslint-disable-next-line
        () => filteredItems.reduce((acc, item) => acc + (item.priceNew ?? 0 > 0 ? (item.priceOld * item.count) - (item.priceNew ? (item.priceNew * item.count) : 0) : 0), 0),
        [filteredItems]
    );
    const totalPrice = useMemo(() => filteredItems.reduce((acc, item) => acc + (item.priceOld * item.count), 0), [filteredItems]);
    const resultPrice = useMemo(() => totalPrice - salePrice, [totalPrice, salePrice]);


    return (
        <div className={styles.content}>
            {
                items.length > 0 ? (
                    <>
                        <div className={styles.content_left}>
                            <label className={`${styles.label__container} ${styles.content_left_label}`}>
                                Выбрать все
                                <input className={styles.label__input}
                                       onChange={handleSelectAllCheckboxChange}
                                       checked={checkedSelectAll}
                                       type="checkbox"/>
                                <span className={styles.label__checkmark}></span>
                            </label>
                            <div className={styles.content_left_container}>
                                <ul className={styles.content_left_container_list}>
                                    {
                                        items.map((i, index) => {
                                            return (
                                                <li key={index} className={styles.content_left_container_item}>
                                                    <CartItem
                                                        productId={i.productId}
                                                        title={i.title}
                                                        imgId={i.imgId}
                                                        priceNew={i.priceNew}
                                                        priceOld={i.priceOld}
                                                        count={i.count}
                                                        isLicensedProduct={i.isLicensedProduct}
                                                        checked={checkedItems.find((x) => x.productId === i.productId)!!.isChecked}
                                                        handleCheckboxChange={() => handleCheckboxChange(i.productId)}/>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>

                        </div>
                        <div className={styles.content_right}>
                            <div className={styles.right_container}>
                                <div className={styles.text_container}>
                                    <div className={styles.text_container_top}>
                                        <span>Итого</span>
                                        <span className={styles.price_transition}>
                                {priceFormat(resultPrice)}
                            </span>
                                    </div>
                                    <div className={styles.text_container_middle}>
                                        <span>Товары, {totalItems} шт.</span>
                                        <span className={styles.price_transition}>
                                {priceFormat(totalPrice)}
                            </span>
                                    </div>
                                    <div className={styles.text_container_bottom}>
                                        <span>Скидка</span>
                                        <span className={styles.price_transition}>
                                            {
                                                salePrice > 0 ? `-${priceFormat(salePrice)}` : priceFormat(salePrice)
                                            }
                                        </span>
                                    </div>
                                </div>
                                <div className={styles.btn_wrapper}>
                                    <button className={styles.btn} disabled={true}>
                                        Оформить заказ
                                    </button>
                                    <span className={styles.btn_label}>
                                        На данный момент оформление заказа через интрнет-магазин <strong>недоступно</strong>.
                                        <br/>
                                        Приносим извинения за неудобства.
                                        <br/><br/>
                                        Мы будем рады ответить на все ваши вопросы по телефону, показать товары в наличии в нашем магазине в Екатеринбурге.
                                        <br/><br/>
                                        Спасибо!
                                    </span>
                                </div>
                                <label className={styles.label__container}>
                        <span className={styles.label__container_text}>
                            Согласен с условиями&ensp;
                            <Link to={`/`}>Правил пользования торговой площадкой и правилами возврата</Link>
                        </span>
                                    <input className={styles.label__input}
                                           type="checkbox"/>
                                    <span className={styles.label__checkmark}></span>
                                </label>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className={styles.container_empty}>
                        <span className={styles.container_empty_text}>В корзине пока нет ни одного товаров</span>
                        <Link to={rootRoutePath} className={styles.container_empty_link}>Вернуться к покупкам</Link>
                    </div>
                )
            }
        </div>
    );
};

export default Cart;