import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import rootReducer from "../reducers";
import {configureStore} from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
});

type RootState = ReturnType<typeof rootReducer>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
