import React from 'react';
import { Router, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import history from './history';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';
import { signout } from './actions/userActions';

class App extends React.Component {
	signoutHandler = () => {
		this.props.signout();
	};

	render() {
		const { cartItems, userSignin } = this.props;
		return (
			<Router history={history}>
				<div className='grid-container'>
					<header className='row'>
						<div>
							<Link className='brand' to='/'>
								amazona
							</Link>
						</div>
						<div>
							<Link to='/cart'>
								Cart
								{cartItems.length > 0 && (
									<span className='badge'>{cartItems.length}</span>
								)}
							</Link>
							{userSignin.userInfo ? (
								<div className='dropdown'>
									<Link to='#'>
										{userSignin.userInfo.name}{' '}
										<i className='fa fa-caret-down'></i>{' '}
									</Link>
									<ul className='dropdown-content'>
										<li>
											<Link to='/profile'>User Profile</Link>
										</li>
										<li>
											<Link to='/orderhistory'>Order History</Link>
										</li>
										<li>
											<Link to='#signout' onClick={this.signoutHandler}>
												Sign Out
											</Link>
										</li>
									</ul>
								</div>
							) : (
								<Link to='/signin'>Sign In</Link>
							)}
						</div>
					</header>
					<main>
						<Route path='/cart/:id?' component={CartScreen}></Route>
						<Route path='/product/:id' component={ProductScreen}></Route>
						<Route path='/signin' component={SigninScreen}></Route>
						<Route path='/register' component={RegisterScreen}></Route>
						<Route path='/shipping' component={ShippingAddressScreen}></Route>
						<Route path='/payment' component={PaymentMethodScreen}></Route>
						<Route path='/placeorder' component={PlaceOrderScreen}></Route>
						<Route path='/order/:id' component={OrderScreen}></Route>
						<Route path='/orderhistory' component={OrderHistoryScreen}></Route>
						<PrivateRoute
							path='/profile'
							component={ProfileScreen}
						></PrivateRoute>
						<Route path='/' component={HomeScreen} exact></Route>
					</main>
					<footer className='row center'>All right reserved</footer>
				</div>
			</Router>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		cartItems: state.cart.cartItems,
		userSignin: state.userSignin,
	};
};

export default connect(mapStateToProps, { signout })(App);
