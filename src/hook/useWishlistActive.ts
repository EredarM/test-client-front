import {useCallback, useMemo} from "react";

import {useAppDispatch, useAppSelector} from "../service/hooks";
import {addWishlist, IWishlist, removeWishlist} from "../service/reducers/wishlist";

export function useWishlistActive(product: IWishlist) {
    const dispatch = useAppDispatch();
    const wishlistStore = useAppSelector((store) => store.wishlist.data);

    const isWishlistActive = useMemo(
        () => wishlistStore.some(i => i.productId === product.productId),
        [wishlistStore, product.productId]
    );

    const handleWishlistClick = useCallback(
        () => {
            if (product) {
                if (isWishlistActive) {
                    dispatch(removeWishlist(product.productId))
                } else {
                    dispatch(addWishlist(product));
                }
            }

        },
        [dispatch, isWishlistActive, product]
    );
    
    return {isWishlistActive, handleWishlistClick};
}