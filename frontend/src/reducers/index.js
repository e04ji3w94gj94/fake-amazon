import { combineReducers } from 'redux';
import { productListReducer, productDetailsReducer } from './productReducers';
import { cartReducer } from './cartReducers';
import {
	userSigninReducer,
	userRegisterReducer,
	userDetailsReducer,
	userUpdateProfileReducer,
} from './userReducers';
import {
	orderCreateReducer,
	orderDetailsReducer,
	orderPayReducer,
	orderMineListReducer,
} from './orderReducers';

const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	cart: cartReducer,
	userSignin: userSigninReducer,
	userRegister: userRegisterReducer,
	orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducer,
	orderPay: orderPayReducer,
	orderMineList: orderMineListReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
});

export default reducer;
