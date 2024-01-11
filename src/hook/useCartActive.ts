import {useCallback, useMemo} from "react";

import {useAppDispatch, useAppSelector} from "../service/hooks";
import {addCart, ICart, removeCart} from "../service/reducers/cart";

export function useCartActive(product: ICart) {
    const dispatch = useAppDispatch();
    const cartStore = useAppSelector((store) => store.cart.data);

    const isCartActive = useMemo(
        () => cartStore.some(i => i.productId === product.productId),
        [cartStore, product.productId]
    );

    const handleCartClick = useCallback(
        () => {
            if (product) {
                if (isCartActive) {
                    dispatch(removeCart(product.productId))
                } else {
                    dispatch(addCart(product));
                }
            }

        },
        [dispatch, isCartActive, product]
    );
    
    return {isCartActive, handleCartClick};
}