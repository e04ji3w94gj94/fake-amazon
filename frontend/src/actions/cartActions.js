import axios from 'axios';
import * as types from '../constants';

export const addToCart = (productId, qty) => async (dispatch, getState) => {
	const { data } = await axios.get(`/api/products/${productId}`);
	dispatch({
		type: types.CART_ADD_ITEM,
		payload: {
			name: data.name,
			image: data.image,
			price: data.price,
			countInStock: data.countInStock,
			product: data._id,
			qty,
		},
	});
	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (productId) => (dispatch, getState) => {
	dispatch({
		type: types.CART_REMOVE_ITEM,
		payload: productId,
	});
	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
	dispatch({ type: types.CART_SAVE_SHIPPING_ADDRESS, payload: data });
	localStorage.setItem('shippingAddress', JSON.stringify(data));
};
