import React, {useEffect} from "react";
import BaseSlider from "../common/base-slider";
import {useAppDispatch, useAppSelector} from "../../service/hooks";
import {getSeasonalOfferProducts} from "../../service/reducers/product";

const SeasonalOffer = () => {
    const dispatch = useAppDispatch();
    const seasonalOfferProductStore = useAppSelector((store) => store.products.seasonalOfferProductData.data);

    useEffect(() => {
            dispatch(getSeasonalOfferProducts())
        },
        [dispatch]
    );

    return (
        <>
            {
                seasonalOfferProductStore &&
                (
                    <BaseSlider title={"Сезонное предложение"} idContainer={'season_offer'} element={seasonalOfferProductStore}/>
                )
            }
        </>
    );
};

export default SeasonalOffer;