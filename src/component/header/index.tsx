import React, { KeyboardEvent, useCallback, useEffect, useRef, useState, useMemo } from "react";
import {createSearchParams, Link, useNavigate, useSearchParams} from "react-router-dom";

import { ReactComponent as BurgerMenuIcon } from '../../assets/header/burger_button.svg';
import { ReactComponent as LogoIcon } from '../../assets/header/logo.svg';
import { ReactComponent as SearchIcon } from '../../assets/header/search.svg';
import { ReactComponent as ProfileIcon } from '../../assets/header/profile.svg';
import { ReactComponent as WishlistIcon } from '../../assets/common/wishlist.svg';
import { ReactComponent as CompareIcon } from '../../assets/common/compare.svg';
import { ReactComponent as CartIcon } from '../../assets/common/cart.svg';
import {
    cartRoutePath,
    compareRoutePath,
    profilePath,
    searchRoutePath,
    wishlistRoutePath
} from "../../utils/route-paths";
import CartModal from "../modal/cart";
import { useAppDispatch, useAppSelector } from "../../service/hooks";
import CatalogModal from "../modal/catalog";
import { getCatalog } from "../../service/reducers/catalog";

import styles from './index.module.css';

const Header: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [isCartHover, setCartHover] = useState<boolean>(false);
    const [isCategoryHover, setCategoryHover] = useState<boolean>(false);
    const productItems = useAppSelector((state) => state.cart.data);
    const compareItems = useAppSelector(state => state.compare.data);
    const wishlistItems = useAppSelector(state => state.wishlist.data);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const productCount: number = useMemo(() => productItems.length, [productItems]);
    const compareCount: number = useMemo(() => compareItems.length, [compareItems]);
    const wishlistCount: number = useMemo(() => wishlistItems.length, [wishlistItems]);

    useEffect(() => {
        dispatch(getCatalog());
        // TODO: getCart from local storage
    }, [dispatch]);

    useEffect(() => {
        const value = searchParams.get("text");
        if (searchInputRef.current) {
            searchInputRef.current.value = value ? value : "";
        }
    }, [searchInputRef, searchParams]);

    const handleCartModalMouseEnter = useCallback(() => setCartHover(true), []);
    const handleCartModalMouseLeave = useCallback(() => setCartHover(false), []);
    const handleCategoryModalMouseEnter = useCallback(() => setCategoryHover(true), []);
    const handleCategoryModalMouseLeave = useCallback(() => setCategoryHover(false), []);

    const handleSearchChange = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && searchInputRef.current && searchInputRef.current.value.trim().length !== 0) {
            navigate({
                pathname: searchRoutePath,
                search: createSearchParams({
                    text: searchInputRef.current.value.trim()
                }).toString()
            });
        }
        // TODO: Add elastic search for prefill
    }, [navigate, searchInputRef]);

    const handleSearchClick = useCallback(() => {
        if (searchInputRef.current && searchInputRef.current.value.trim().length !== 0) {
            navigate({
                pathname: searchRoutePath,
                search: createSearchParams({
                    text: searchInputRef.current.value.trim()
                }).toString()
            });
        }
    }, [searchInputRef, navigate]);

    return (
        <header className={`${styles.header}`}>
            <div className={`${styles.content} global_container`}>
                <div className={`${styles.top}`}>
                    <div className={`${styles.top_left}`}>
                        <p>Пн-Пт 10:00-19:00</p>
                        <p>Вс-Сб 10:00-17:00</p>
                    </div>
                    <div className={`${styles.top_right}`}>
                        <a href="tel:+73433604786">+7 (343) 360-47-86</a>
                        <a href="tel:+79538236826">+7 (953) 823-68-26</a>
                    </div>
                </div>
                <div className={`${styles.bottom}`}>
                    <div className={`${styles.bottom_left}`}>
                        <BurgerMenuIcon
                            className={`${styles.burger__wrapper_icon}`}
                            onMouseEnter={handleCategoryModalMouseEnter}
                            onMouseLeave={handleCategoryModalMouseLeave}
                        />
                        <Link to={'/'} className={styles.logo__wrapper}>
                            <LogoIcon />
                        </Link>
                    </div>
                    <div className={`${styles.bottom_middle}`}>
                        <input
                            ref={searchInputRef}
                            className={`${styles.middle__input}`}
                            onKeyDown={handleSearchChange}
                            type="text"
                            placeholder="Я ищу..."
                        />
                        <SearchIcon
                            className={`${styles.middle__icon}`}
                            onClick={handleSearchClick}
                        />
                    </div>
                    <ul className={`${styles.right__list}`}>
                        <li className={`${styles.right__list_item}`}>
                            <Link to={profilePath} className={`${styles.item__link}`}>
                                <ProfileIcon className={styles.icon} />
                                <p className={styles.icon_text}>Профиль</p>
                            </Link>
                        </li>
                        <li className={`${styles.right__list_item}`}>
                            <Link to={wishlistRoutePath} className={`${styles.item__link}`}>
                                <WishlistIcon className={styles.icon} />
                                <p className={styles.icon_text}>Избранное</p>
                            </Link>
                            {wishlistCount > 0 && <span className={styles.wishlist_count}>{wishlistCount}</span>}
                        </li>
                        <li className={`${styles.right__list_item}`}>
                            <Link to={compareRoutePath} className={`${styles.item__link}`}>
                                <CompareIcon className={styles.icon} />
                                <p className={styles.icon_text}>Сравнение</p>
                            </Link>
                            {compareCount > 0 && <span className={styles.compare_count}>{compareCount}</span>}
                        </li>
                        <li
                            onMouseEnter={handleCartModalMouseEnter}
                            onMouseLeave={handleCartModalMouseLeave}
                            onClick={handleCartModalMouseLeave}
                            className={`${styles.right__list_item}`}
                        >
                            <Link to={cartRoutePath} className={`${styles.item__link}`}>
                                <CartIcon className={styles.icon} />
                                <p className={styles.icon_text}>Корзина</p>
                            </Link>
                            {productCount > 0 && <span className={styles.cart_count}>{productCount}</span>}
                        </li>
                    </ul>
                    {isCartHover && productCount > 0 && <CartModal handleMouseEnter={handleCartModalMouseEnter} handleMouseLeave={handleCartModalMouseLeave} />}
                    {isCategoryHover && <CatalogModal handleMouseEnter={handleCategoryModalMouseEnter} handleMouseLeave={handleCategoryModalMouseLeave} />}
                </div>
            </div>
        </header>
    );
};

export default Header;
