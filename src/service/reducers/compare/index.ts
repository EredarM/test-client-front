import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export interface ICompare {
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

export interface IInitialStateCompare {
    data: Array<ICompare>
}

const initialState: IInitialStateCompare = {
    data: []
};

const compare = createSlice({
    name: "compare",
    initialState,
    reducers: {
        addCompare: (
            state: IInitialStateCompare,
            action: PayloadAction<ICompare>
        ) => {
            return {
                ...state,
                data: [...state.data, {...action.payload}]
            };
        },
        removeCompare: (
            state: IInitialStateCompare,
            action: PayloadAction<string>
        ) => {
            return {
                ...state,
                data: state.data.filter(i => i.productId !== action.payload)
            };
        },
    }
});

export const {addCompare, removeCompare} = compare.actions;
export default compare.reducer;