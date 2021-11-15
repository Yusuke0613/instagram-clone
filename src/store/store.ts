import { configureStore } from "@reduxjs/toolkit";
import {
	useSelector as rawUseSelector,
	TypedUseSelectorHook,
} from "react-redux";

import userReducer from "../features/user/userSlice";

export const store = configureStore({
	reducer: {
		user: userReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;
