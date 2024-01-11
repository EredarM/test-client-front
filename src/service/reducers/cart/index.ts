import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export interface ICart {
    productId: string;
    imgId: string;
    title: string;
    priceNew: number | null;
    priceOld: number;
    isLicensedProduct: boolean
}

export interface IInitialStateCart {
    data: Array<ICart & {count: number}>
}

const initialState: IInitialStateCart = {
    data: []
};

const cart = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addCart: (
            state: IInitialStateCart,
            action: PayloadAction<ICart>
        ) => {
            return {
                ...state,
                data: [...state.data, {...action.payload, count: 1}]
            };
        },
        removeCart: (
            state: IInitialStateCart,
            action: PayloadAction<string>
        ) => {
            return {
                ...state,
                data: state.data.filter(i => i.productId !== action.payload)
            };
        },
        removeCartAll: (
            state: IInitialStateCart
        ) => {
            return {
                ...state,
                data: []
            };
        },
        increaseCount: (state: IInitialStateCart, action: PayloadAction<string>) => {
            const item = state.data.find((item) => item.productId === action.payload);
            if (item) {
                item.count += 1;
            }
        },
        decreaseCount: (state: IInitialStateCart, action: PayloadAction<string>) => {
            const item = state.data.find((item) => item.productId === action.payload);
            if (item && item.count > 1) {
                item.count -= 1;
            }
        },
        updateCount: (state: IInitialStateCart, action: PayloadAction<{productId: string, count: number}>) => {
            const item = state.data.find((item) => item.productId === action.payload.productId);
            if (item) {
                item.count = action.payload.count;
            }
        },
    }
});

export const {addCart, removeCart, removeCartAll, increaseCount, decreaseCount, updateCount} = cart.actions;
export default cart.reducer;