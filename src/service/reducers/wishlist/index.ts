import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export interface IWishlist {
    productId: string;
    imgId: string;
    title: string;
    priceNew: number | null;
    priceOld: number;
    commentCount: number;
    rating: number;
    isLicensedProduct: boolean;
    categoryId: string;
    purchasesCount: number;
    attributes: Array<IProductCardAttribute>;
}

export interface IInitialStateWishlist {
    data: Array<IWishlist>
}

const initialState: IInitialStateWishlist = {
    data: []
};

const wishlist = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        addWishlist: (
            state: IInitialStateWishlist,
            action: PayloadAction<IWishlist>
        ) => {
            return {
                ...state,
                data: [...state.data, {...action.payload}]
            };
        },
        removeWishlist: (
            state: IInitialStateWishlist,
            action: PayloadAction<string>
        ) => {
            return {
                ...state,
                data: state.data.filter(i => i.productId !== action.payload)
            };
        },
    }
});

export const {addWishlist, removeWishlist} = wishlist.actions;
export default wishlist.reducer;