import {combineReducers} from "@reduxjs/toolkit";
import banners from "./banners";
import products from "./product";
import cart from "./cart";
import catalog from "./catalog";
import feedbackModal from "./modal/feedback";
import wishlist from "./wishlist";
import compare from "./compare";

const rootReducer = combineReducers({
    banners: banners,
    catalog: catalog,
    cart: cart,
    compare: compare,
    products: products,
    feedbackModal: feedbackModal,
    wishlist: wishlist,
});

export default rootReducer;
