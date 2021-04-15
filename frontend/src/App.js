import React from 'react';
import { Router, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import history from './history';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';

class App extends React.Component {
	render() {
		const { cartItems } = this.props;
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
							<Link to='/signin'>Sign In</Link>
						</div>
					</header>
					<main>
						<Route path='/cart/:id?' component={CartScreen}></Route>
						<Route path='/product/:id' component={ProductScreen}></Route>
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
	};
};

export default connect(mapStateToProps)(App);
