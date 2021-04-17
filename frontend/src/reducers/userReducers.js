import * as types from '../constants';

const initialState = {
	userInfo: localStorage.getItem('userInfo')
		? JSON.parse(localStorage.getItem('userInfo'))
		: null,
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
