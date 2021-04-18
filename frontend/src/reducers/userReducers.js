import * as types from '../constants';

const initialState = {
	userInfo: localStorage.getItem('userInfo')
		? JSON.parse(localStorage.getItem('userInfo'))
		: null,
};

export const userRegisterReducer = (state = {}, action) => {
	switch (action.type) {
		case types.USER_REGISTER_REQUEST:
			return { loading: true };
		case types.USER_REGISTER_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case types.USER_REGISTER_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const userSigninReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.USER_SIGNIN_REQUEST:
			return { loading: true };
		case types.USER_SIGNIN_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case types.USER_SIGNIN_FAIL:
			return { loading: false, error: action.payload };
		case types.USER_SIGNOUT:
			return {};
		default:
			return state;
	}
};
