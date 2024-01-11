import React, {useEffect} from "react";
import BaseSlider from "../common/base-slider";
import {useAppDispatch, useAppSelector} from "../../service/hooks";
import {getSalesHitsProducts} from "../../service/reducers/product";

const SalesHitsSlider = () => {
    const dispatch = useAppDispatch();
    const salesHitsProductStore = useAppSelector((store) => store.products.salesHitsProductData);

    useEffect(() => {
            dispatch(getSalesHitsProducts())
        },
        [dispatch]
    );

    return (
        <>
            {
                salesHitsProductStore.data &&
                (
                    <BaseSlider title={"Хиты продаж"} idContainer={'sales_hits_slider'} element={salesHitsProductStore.data}/>
                )
            }
        </>
    );
};

export default SalesHitsSlider;