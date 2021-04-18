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
	dispatch({ type: types.USER_SIGNOUT });
};
