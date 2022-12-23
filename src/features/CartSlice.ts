import {
	createSlice,
	createAsyncThunk,
	createSelector,
	PayloadAction
} from '@reduxjs/toolkit';
// import { checkout, CartItems } from '../../app/api';
import type { RootState } from '../store';

type CheckoutState = 'LOADING' | 'READY' | 'ERROR';
export interface CartState {
	items: { [productID: string]: number };
	checkoutState: CheckoutState;
	errorMessage: string;
}

const initialState: CartState = {
	items: {},
	checkoutState: 'READY',
	errorMessage: ''
};

// export const checkoutCart = createAsyncThunk<
// 	{ success: boolean },
// 	undefined,
// 	{ state: RootState }
// >('cart/checkout', async (_, thunkAPI) => {
// 	const state = thunkAPI.getState() as RootState;
// 	console.log('rootState', state);
// 	const items = state.cart.items;
// 	const response = await checkout(items);
// 	return response;
// });

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart(state, action: PayloadAction<string>) {
			if (state.items[action.payload]) {

				state.items[action.payload]++;
			} else {
				state.items[action.payload] = 1;
			}
		},
		removeFromCart(state, action: PayloadAction<string>) {
			delete state.items[action.payload];
		},
		updateQuantity(
			state,
			action: PayloadAction<{ id: string; quantity: number }>
		) {
			const { id, quantity } = action.payload;
			state.items[id] = quantity;
		}
	},
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;

// export function getNumItems(state: RootState) {
// 	console.log('calling numItems');
// 	let numItems = 0;
// 	for (let id in state.cart.items) {
// 		numItems += state.cart.items[id];
// 	}
// 	return numItems;
// }

// export const getMemoizedNumItems = createSelector(
// 	(state: RootState) => state.cart.items,
// 	(items) => {
// 		console.log('calling getMemoizedNumItems');
// 		let numItems = 0;
// 		for (let id in items) {
// 			numItems += items[id];
// 		}
// 		return numItems;
// 	}
// );

// export const getTotalPrice = createSelector<RootState, any, any, string>(
// 	(state: RootState) => state.cart.items,
// 	(state: RootState) => state.products.products,
// 	(items, products) => {
// 		let total = 0;
// 		for (let id in items) {
// 			total += products[id].price * items[id];
// 		}
// 		return total.toFixed(2);
// 	}
// );
