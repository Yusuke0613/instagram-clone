import {
	createAsyncThunk,
	createSelector,
	createSlice,
	SerializedError,
} from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { auth, provider } from "../../firebase";

export interface AuthState {
	displayName?: string | null;
	email?: string | null;
	authenticated?: boolean;
	error?: SerializedError;
}

const initialState: AuthState = {
	displayName: undefined,
	email: undefined,
	authenticated: undefined,
	error: undefined,
};

interface PayLoad {
	displayName?: string | null;
	email?: string | null;
}

export const login = createAsyncThunk<AuthState, PayLoad>(
	"login",
	async (req, thunkAPI) => {
		try {
			if (req.displayName === null) {
				const response = await auth.signInWithPopup(provider);
				const displayName = response.user?.displayName;
				const email = response.user?.email;
				return { displayName, email } as PayLoad;
			} else {
				const displayName = req.displayName;
				const email = req.email;
				return { displayName, email } as PayLoad;
			}
		} catch (error) {
			return thunkAPI.rejectWithValue({ error: error.message });
		}
	}
);

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(login.fulfilled, (state, action) => {
			state.displayName = action.payload.displayName;
			state.email = action.payload.email;
			state.authenticated = true;
		});
		builder.addCase(login.rejected, (state, action) => {
			state.error = action.error;
		});
	},
});

export const authSelector: (state: RootState) => AuthState = (
	state: RootState
) => state.user;

export const displayNameSelector = createSelector(authSelector, (auth) => {
	return auth.displayName;
});

export const emailSelector = createSelector(authSelector, (auth) => {
	return auth.email;
});

export const isUserAuthenticatedSelector = createSelector(
	authSelector,
	(auth) => {
		return auth.authenticated;
	}
);

export const errorSelector = createSelector(authSelector, (auth) => {
	return auth.error;
});

export default userSlice.reducer;
