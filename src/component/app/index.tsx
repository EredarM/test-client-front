import React, {FC, lazy, Suspense, useLayoutEffect} from "react";
import {Route, Routes, useLocation} from 'react-router-dom';
import Header from "../header";
import Footer from "../footer";
import {
    cartRoutePath,
    catalogRoutePath, compareRoutePath,
    infoAboutCompanyRoute,
    infoCertificateRoute,
    infoDeliveryRoute,
    infoLicensedProductRoute,
    infoPaymentRoute,
    infoRoutePath,
    order,
    productByCatalogRoutePath,
    productRoutePath,
    rootRoutePath,
    searchRoutePath,
    wishlistRoutePath
} from "../../utils/route-paths";

import AboutCompany from "../info/components/about-company";
import Certificate from "../info/components/certificate";
import Delivery from "../info/components/delivery";
import Payment from "../info/components/payment";
import LicensedProduct from "../info/components/licensed-product";
import WishlistPage from "../../page/wishlist";
import ComparePage from "../../page/compare";
import Loading from "../common/loading";
import NotFoundErrorPage from "../../page/not-found-error-page";

import styles from './index.module.css';
import ServerErrorPage from "../../page/server-error-page";

const MainPage = lazy(() => import("../../page/main/index"));
const CatalogPage = lazy(() => import("../../page/catalog/index"));
const SearchPage = lazy(() => import("../../page/search"));
const ProductCardPage = lazy(() => import("../../page/product-card"));
const OrderPage = lazy(() => import("../../page/order"));
const CartPage = lazy(() => import("../../page/cart"));
const InfoPage = lazy(() => import("../../page/info"));

const Router = () => {
    return (
        <Suspense fallback={
            <Loading/>
        }>
            <Routes>
                <Route path={rootRoutePath} element={
                    <PageWrapper><MainPage/></PageWrapper>
                }/>
                <Route path={catalogRoutePath} element={
                    <PageWrapper><CatalogPage/></PageWrapper>
                }/>
                <Route path={searchRoutePath} element={
                    <PageWrapper><SearchPage/></PageWrapper>
                }/>
                <Route path={productByCatalogRoutePath} element={
                    <PageWrapper><SearchPage/></PageWrapper>
                }/>
                <Route path={productRoutePath} element={
                    <PageWrapper><ProductCardPage/></PageWrapper>
                }/>
                <Route path={order} element={
                    <PageWrapper><OrderPage/></PageWrapper>
                }/>
                <Route path={wishlistRoutePath} element={
                    <PageWrapper><WishlistPage/></PageWrapper>
                }/>
                <Route path={compareRoutePath} element={
                    <PageWrapper><ComparePage/></PageWrapper>
                }/>
                <Route path={cartRoutePath} element={
                    <PageWrapper><CartPage/></PageWrapper>
                }/>
                <Route path={infoRoutePath} element={
                    <PageWrapper><InfoPage/></PageWrapper>
                }>
                    <Route path={infoAboutCompanyRoute} element={
                        <AboutCompany/>
                    }/>
                    <Route path={infoCertificateRoute} element={
                        <Certificate/>
                    }/>
                    <Route path={infoDeliveryRoute} element={
                        <Delivery/>
                    }/>
                    <Route path={infoPaymentRoute} element={
                        <Payment/>
                    }/>
                    <Route path={infoLicensedProductRoute} element={
                        <LicensedProduct/>
                    }/>
                </Route>
                <Route path={"/500"} element={
                    <ServerErrorPage/>
                }/>
                <Route path={"*"} element={
                    <NotFoundErrorPage/>
                }/>
            </Routes>
        </Suspense>
    );
};

const PageWrapper: FC<{ children: React.ReactNode }> = (props) => {
    const location = useLocation();
    useLayoutEffect(() => {
        document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <>
            {props.children}
        </>
    );
}

const App: FC = () => {
    return (
        <>
            <Header/>
            <main className={styles.main}>
                <Router/>
            </main>
            <Footer/>
        </>
    );
};

export default App;
