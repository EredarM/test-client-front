import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    fetchMonthProducts,
    fetchProduct,
    fetchSalesHitsProducts,
    fetchSearchProducts,
    fetchSeasonalOfferProducts
} from "../../api/api";


interface IInitialStateProduct {
    fullProductData: ApiResponse<IProductCard>;
    monthProductData: ApiResponse<Array<IProductCardShort>>;
    salesHitsProductData: ApiResponse<Array<IProductCardShort>>;
    seasonalOfferProductData: ApiResponse<Array<IProductCardShort>>;
    searchProductData: ApiResponse<Array<IProductCardShort>>;
}

const initialState: IInitialStateProduct = {
    fullProductData: {
        data: null,
        status: 'idle',
        error: null,
    },
    monthProductData: {
        data: [],
        status: 'idle',
        error: null,
    },
    salesHitsProductData: {
        data: [],
        status: 'idle',
        error: null,
    },
    seasonalOfferProductData: {
        data: [],
        status: 'idle',
        error: null,
    },
    searchProductData: {
        data: [],
        status: 'idle',
        error: null,
    }
};


export const getProduct = createAsyncThunk(
    "product/fetchProduct",
    (productId: string) => fetchProduct(productId)
);

export const getMonthProducts = createAsyncThunk(
    "product/fetchMonthProduct",
    () => fetchMonthProducts()
);

export const getSalesHitsProducts = createAsyncThunk(
    "product/fetchSalesHitsProducts",
    () => fetchSalesHitsProducts()
);

export const getSeasonalOfferProducts = createAsyncThunk(
    "product/fetchSeasonalOfferProducts",
    () => fetchSeasonalOfferProducts()
);

export const getSearchProducts = createAsyncThunk(
    "product/fetchSearchProducts",
    (params: {params: URLSearchParams, catalogId?: string, text?: string}) => fetchSearchProducts(params)
);

const products = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getProduct.pending, (state,) => {
                state.fullProductData.status = "loading";
            })
            .addCase(getProduct.fulfilled, (state, action) => {
                state.fullProductData.status = "succeeded";
                state.fullProductData.data = action.payload;
            })
            .addCase(getProduct.rejected, (state, action) => {
                state.fullProductData.status = "failed";
                state.fullProductData.error = {
                     errorMsq: action.error.message!!,
                   code: action.error.code!!,
                };
            })
            .addCase(getMonthProducts.pending, (state,) => {
                state.monthProductData.status = "loading";
            })
            .addCase(getMonthProducts.fulfilled, (state, action) => {
                state.monthProductData.status = "succeeded";
                state.monthProductData.data = action.payload;
            })
            .addCase(getMonthProducts.rejected, (state, action) => {
                state.monthProductData.status = "failed";
                state.monthProductData.error = {
                    errorMsq: action.error.message!!,
                    code: action.error.code!!,
                };
            })
            .addCase(getSalesHitsProducts.pending, (state,) => {
                state.salesHitsProductData.status = "loading";
            })
            .addCase(getSalesHitsProducts.fulfilled, (state, action) => {
                state.salesHitsProductData.status = "succeeded";
                state.salesHitsProductData.data = action.payload;
            })
            .addCase(getSalesHitsProducts.rejected, (state, action) => {
                state.salesHitsProductData.status = "failed";
                state.salesHitsProductData.error = {
                    errorMsq: action.error.message!!,
                    code: action.error.code!!,
                };
            })
            .addCase(getSeasonalOfferProducts.pending, (state,) => {
                state.seasonalOfferProductData.status = "loading";
            })
            .addCase(getSeasonalOfferProducts.fulfilled, (state, action) => {
                state.seasonalOfferProductData.status = "succeeded";
                state.seasonalOfferProductData.data = action.payload;
            })
            .addCase(getSeasonalOfferProducts.rejected, (state, action) => {
                state.seasonalOfferProductData.status = "failed";
                state.seasonalOfferProductData.error = {
                    errorMsq: action.error.message!!,
                    code: action.error.code!!,
                };
            })
            .addCase(getSearchProducts.pending, (state,) => {
                state.searchProductData.status = "loading";
            })
            .addCase(getSearchProducts.fulfilled, (state, action) => {
                state.searchProductData.status = "succeeded";
                state.searchProductData.data = action.payload;
            })
            .addCase(getSearchProducts.rejected, (state, action) => {
                state.searchProductData.status = "failed";
                state.searchProductData.error = {
                    errorMsq: action.error.message!!,
                    code: action.error.code!!,
                };
            })
    }
});

export default products.reducer;