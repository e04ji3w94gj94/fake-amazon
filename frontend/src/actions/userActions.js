import axios from 'axios';
import * as types from '../constants';

export const register = (name, email, password) => async (dispatch) => {
	dispatch({
		type: types.USER_REGISTER_REQUEST,
		payload: { name, email, password },
	});
	try {
		const { data } = await axios.post('/api/users/register', {
			name,
			email,
			password,
		});
		dispatch({ type: types.USER_REGISTER_SUCCESS, payload: data });
		dispatch({ type: types.USER_SIGNIN_SUCCESS, payload: data });
		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: types.USER_REGISTER_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const signin = (email, password) => async (dispatch) => {
	dispatch({ type: types.USER_SIGNIN_REQUEST, payload: { email, password } });
	try {
		const { data } = await axios.post('/api/users/signin', { email, password });
		dispatch({ type: types.USER_SIGNIN_SUCCESS, payload: data });
		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: types.USER_SIGNIN_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const signout = () => (dispatch) => {
	localStorage.removeItem('userInfo');
	localStorage.removeItem('cartItems');
	localStorage.removeItem('shippingAddress');
	dispatch({ type: types.USER_SIGNOUT });
};

export const detailsUser = (userId) => async (dispatch, getState) => {
	dispatch({ type: types.USER_DETAILS_REQUEST, payload: userId });
	const {
		userSignin: { userInfo },
	} = getState();
	try {
		const { data } = await axios.get(`/api/users/${userId}`, {
			headers: { Authorization: `Bearer ${userInfo.token}` },
		});
		dispatch({ type: types.USER_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		dispatch({ type: types.USER_DETAILS_FAIL, payload: message });
	}
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
	dispatch({ type: types.USER_UPDATE_PROFILE_REQUEST, payload: user });
	const {
		userSignin: { userInfo },
	} = getState();
	try {
		const { data } = await axios.put(`/api/users/profile`, user, {
			headers: { Authorization: `Bearer ${userInfo.token}` },
		});
		dispatch({ type: types.USER_UPDATE_PROFILE_SUCCESS, payload: data });
		dispatch({ type: types.USER_SIGNIN_SUCCESS, payload: data });
		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		dispatch({ type: types.USER_UPDATE_PROFILE_FAIL, payload: message });
	}
};

export const resetUserProfile = () => {
	return {
		type: types.USER_UPDATE_PROFILE_RESET,
	};
};
