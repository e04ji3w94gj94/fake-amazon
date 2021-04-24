import { combineReducers } from 'redux';
import { productListReducer, productDetailsReducer } from './productReducers';
import { cartReducer } from './cartReducers';
import { userSigninReducer, userRegisterReducer } from './userReducers';
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
});

export default reducer;
