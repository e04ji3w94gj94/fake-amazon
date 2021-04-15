import * as types from '../constants';

export const productListReducer = (
	state = { loading: true, products: [], error: false },
	action
) => {
	switch (action.type) {
		case types.PRODUCT_LIST_REQUEST:
			return { loading: true };
		case types.PRODUCT_LIST_SUCCESS:
			return { loading: false, products: action.payload };
		case types.PRODUCT_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const productDetailsReducer = (
	state = { loading: true, products: {}, error: false },
	action
) => {
	switch (action.type) {
		case types.PRODUCT_DETAILS_REQUEST:
			return { loading: true };
		case types.PRODUCT_DETAILS_SUCCESS:
			return { loading: false, product: action.payload };
		case types.PRODUCT_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
