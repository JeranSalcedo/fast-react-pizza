import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getAddress } from "../../services/apiGeocoding";

const initialState = {
	userName: "",
	status: "idle",
	position: {},
	address: "",
	error: "",
};

const slice = createSlice({
	name: "user",
	initialState,
	reducers: {
		updateName(state, action) {
			state.userName = action.payload;
		},
	},
	extraReducers: (builder) =>
		builder
			.addCase(fetchAddress.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchAddress.fulfilled, (state, action) => {
				state.position = action.payload.position;
				state.address = action.payload.address;

				state.status = "idle";
			})
			.addCase(fetchAddress.rejected, (state, action) => {
				state.error = action.error.message;

				state.status = "error";
			}),
});

const getPosition = () => {
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject);
	});
};

const fetchAddress = createAsyncThunk("user/fetchAddress", async () => {
	const positionObj = await getPosition();
	const position = {
		latitude: positionObj.coords.latitude,
		longitude: positionObj.coords.longitude,
	};

	const addressObj = await getAddress(position);
	const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

	return { position, address };
});

const getUser = (state) => state.user;

const getUserName = (state) => state.user.userName;

export { getUser, getUserName, fetchAddress };
export const { updateName } = slice.actions;
export default slice.reducer;
