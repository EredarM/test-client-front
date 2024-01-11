import Sliders from "../../component/sliders";
import Banners from "../../component/banner/index";
import SalesHitsSlider from "../../component/sales-hits-slider/index";
import SeasonalOffer from "../../component/seasonal-offer-slider";
import {useAppSelector} from "../../service/hooks";
import Loading from "../../component/common/loading";

const MainPage = () => {
    const leftSliderStore = useAppSelector((store) => store.banners);
    const rightSliderStore = useAppSelector((store) => store.products.monthProductData);
    const cartStore = useAppSelector((store) => store.cart);
    const catalogStore = useAppSelector((state) => state.catalog);
    const salesHitsProductStore = useAppSelector((store) => store.products.salesHitsProductData);
    const seasonalOfferProductStore = useAppSelector((store) => store.products.seasonalOfferProductData);

    const isLoading = leftSliderStore.status === "loading" ||
        rightSliderStore.status === "loading" ||
        catalogStore.status === "loading" ||
        salesHitsProductStore.status === "loading" ||
        seasonalOfferProductStore.status === "loading";
    console.log(isLoading)

    return (
        <>
            {
                isLoading && <Loading/>
            }
            <Sliders/>
            <Banners/>
            <SalesHitsSlider/>
            <SeasonalOffer/>
        </>
    )
};

export default MainPage;