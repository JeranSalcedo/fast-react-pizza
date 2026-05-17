import { createSlice } from "@reduxjs/toolkit";

// const getPosition = () => {
// 	return new Promise(function (resolve, reject) {
// 		navigator.geolocation.getCurrentPosition(resolve, reject);
// 	});
// };

// const fetchAddress = async () => {
// 	const positionObj = await getPosition();
// 	const position = {
// 		latitude: positionObj.coords.latitude,
// 		longitude: positionObj.coords.longitude,
// 	};

// 	const addressObj = await getAddress(position);
// 	const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

// 	return { position, address };
// };

const initialState = {
	userName: "",
};

const slice = createSlice({
	name: "user",
	initialState,
	reducers: {
		updateName(state, action) {
			state.userName = action.payload;
		},
	},
});

export const { updateName } = slice.actions;
export default slice;
