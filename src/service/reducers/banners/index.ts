import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchBanners} from "../../api/api";

const initialState: ApiResponse<Array<Slider>> = {
    data: [],
    status: "idle",
    error: null,
};

export const getBanners = createAsyncThunk(
    "banners/fetchLeftBanners",
    () => fetchBanners()
);

const banners = createSlice({
    name: "banners",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getBanners.rejected, (state, action) => {
                state.status = "failed";
                state.error = {
                    errorMsq: action.error.message!!,
                    code: action.error.code!!,
                };
            })
            .addCase(getBanners.pending, (state, ) => {
                state.status = "loading";
            })
            .addCase(getBanners.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload
            })
    }
});

export default banners.reducer;
