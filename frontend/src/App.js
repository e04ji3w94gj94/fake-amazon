import React from 'react';
import { Router, Route, Link } from 'react-router-dom';
import history from './history';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';

const App = () => {
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
						<a href='/cart'>Cart</a>
						<a href='/signin'>Sign In</a>
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
};

export default App;
