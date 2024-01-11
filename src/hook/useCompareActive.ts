import {useCallback, useMemo} from "react";

import {useAppDispatch, useAppSelector} from "../service/hooks";
import {addCompare, ICompare, removeCompare} from "../service/reducers/compare";

export function useCompareActive(product: ICompare) {
    const dispatch = useAppDispatch();
    const compareStore = useAppSelector((store) => store.compare.data);

    const isCompareActive = useMemo(
        () => compareStore.some(i => i.productId === product.productId),
        [compareStore, product.productId]
    );

    const handleCompareClick = useCallback(
        () => {
            if (product) {
                if (isCompareActive) {
                    dispatch(removeCompare(product.productId))
                } else {
                    dispatch(addCompare(product));
                }
            }

        },
        [dispatch, isCompareActive, product]
    );
    
    return {isCompareActive, handleCompareClick};
}