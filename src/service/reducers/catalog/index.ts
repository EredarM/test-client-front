import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchCategories} from "../../api/api";

export interface ICatalog {
    readonly isRoot: boolean;
    readonly categoryId: string;
    readonly childCategories: Array<ICatalog>;
    readonly imageId: string;
    readonly title: string;
    readonly productCount: number;
}

const initialState: ApiResponse<Array<ICatalog>> = {
    data: [],
    status: 'idle',
    error: null,
};

export const getCatalog = createAsyncThunk(
    "categories/fetchCategories",
    () => fetchCategories()
);

const catalog = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getCatalog.rejected, (state, action) => {
                state.status = "failed";
                state.error = {
                    errorMsq: action.error.message!!,
                    code: action.error.code!!,
                };
            })
            .addCase(getCatalog.pending, (state,) => {
                state.status = "loading";

            })
            .addCase(getCatalog.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = convert(action.payload)
            })
    }
});

const convert = (data: ICategoryV2[]): ICatalog[] => {
    const result: Array<ICatalog> = [...data.map(item => {
        return {
            isRoot: item.parentCategoryId === null,
            categoryId: item.categoryId,
            childCategories: [],
            imageId: item.imageId,
            title: item.title,
            productCount: item.productCount
        }
    })];

    data.forEach((item) => {
        const parentItem = result.find((i) => i.categoryId === item.parentCategoryId);
        if (parentItem) {
            parentItem.childCategories.push(result.find((i) => i.categoryId === item.categoryId)!);
        }
    });

    return result;
}

export default catalog.reducer;