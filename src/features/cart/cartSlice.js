import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	cart: [],
};

const slice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addItem(state, action) {
			state.cart.push(action.payload);
		},
		deleteItem(state, action) {
			state.cart = state.cart.filter(
				(item) => item.pizzaId !== action.payload,
			);
		},
		increaseItemQuantity(state, action) {
			const item = state.cart.find(
				(item) => (item.pizzaId = action.payload),
			);

			item.quantity++;
			item.totalPrice += item.unitPrice;
		},
		decreaseItemQuantity(state, action) {
			const item = state.cart.find(
				(item) => (item.pizzaId = action.payload),
			);

			item.quantity--;
			item.totalPrice -= item.unitPrice;
		},
		clearCart(state) {
			state.cart = [];
		},
	},
});

export const getCart = (state) => state.cart.cart;

export const getQuantityById = (id) => (state) =>
	state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;

export const getTotalCartQuantity = (state) =>
	state.cart.cart.reduce((total, item) => total + item.quantity, 0);

export const getTotalCartPrice = (state) =>
	state.cart.cart.reduce((total, item) => total + item.totalPrice, 0);

export const {
	addItem,
	deleteItem,
	increaseItemQuantity,
	decreaseItemQuantity,
	clearCart,
} = slice.actions;
export default slice.reducer;
