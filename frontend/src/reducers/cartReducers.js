import * as types from '../constants';

const initialState = {
	cartItems: localStorage.getItem('cartItems')
		? JSON.parse(localStorage.getItem('cartItems'))
		: [],
	shippingAddress: localStorage.getItem('shippingAddress')
		? JSON.parse(localStorage.getItem('shippingAddress'))
		: {},
};

export const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.CART_ADD_ITEM:
			const item = action.payload;
			const existItem = state.cartItems.find((x) => x.product === item.product);
			if (existItem) {
				return {
					...state,
					cartItems: state.cartItems.map((x) =>
						x.product === existItem.product ? item : x
					),
				};
			} else {
				return { ...state, cartItems: [...state.cartItems, item] };
			}
		case types.CART_REMOVE_ITEM:
			return {
				...state,
				cartItems: state.cartItems.filter((x) => x.product !== action.payload),
			};
		case types.CART_SAVE_SHIPPING_ADDRESS:
			return { ...state, shippingAddress: action.payload };
		default:
			return state;
	}
};
