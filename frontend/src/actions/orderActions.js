import axios from 'axios';
import * as types from '../constants';

export const createOrder = (order) => async (dispatch, getState) => {
	dispatch({ type: types.ORDER_CREATE_REQUEST, payload: order });
	try {
		const {
			userSignin: { userInfo },
		} = getState();
		const { data } = await axios.post('/api/orders', order, {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		});
		dispatch({ type: types.ORDER_CREATE_SUCCESS, payload: data.order });
		dispatch({ type: types.CART_EMPTY });
		localStorage.removeItem('cartItems');
	} catch (error) {
		dispatch({
			type: types.ORDER_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const resetOrder = () => {
	return {
		type: types.ORDER_CREATE_RESET,
	};
};

export const detailsOrder = (orderId) => async (dispatch, getState) => {
	dispatch({ type: types.ORDER_DETAILS_REQUEST, payload: orderId });
	const {
		userSignin: { userInfo },
	} = getState();
	try {
		const { data } = await axios.get(`/api/orders/${orderId}`, {
			headers: { Authorization: `Bearer ${userInfo.token}` },
		});
		dispatch({ type: types.ORDER_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		dispatch({ type: types.ORDER_DETAILS_FAIL, payload: message });
	}
};

export const payOrder = (order, paymentResult) => async (
	dispatch,
	getState
) => {
	dispatch({
		type: types.ORDER_PAY_REQUEST,
		payload: { order, paymentResult },
	});
	const {
		userSignin: { userInfo },
	} = getState();
	try {
		const { data } = await axios.put(
			`/api/orders/${order._id}/pay`,
			paymentResult,
			{
				headers: { Authorization: `Bearer ${userInfo.token}` },
			}
		);
		dispatch({ type: types.ORDER_PAY_SUCCESS, payload: data });
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		dispatch({ type: types.ORDER_PAY_FAIL, payload: message });
	}
};

export const resetPayOrder = () => {
	return {
		type: types.ORDER_PAY_RESET,
	};
};

export const listOrderMine = () => async (dispatch, getState) => {
	dispatch({ type: types.ORDER_MINE_LIST_REQUEST });
	const {
		userSignin: { userInfo },
	} = getState();
	try {
		const { data } = await axios.get('/api/orders/mine', {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		});
		dispatch({ type: types.ORDER_MINE_LIST_SUCCESS, payload: data });
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		dispatch({ type: types.ORDER_MINE_LIST_FAIL, payload: message });
	}
};
