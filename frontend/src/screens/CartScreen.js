import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import history from '../history';
import { addToCart, removeFromCart } from '../actions';
import MessageBox from '../components/MessageBox';

class CartScreen extends React.Component {
	componentDidMount() {
		const productId = this.props.match.params.id;
		const qty = this.props.location.search
			? Number(this.props.location.search.split('=')[1])
			: 1;
		if (productId) {
			this.props.addToCart(productId, qty);
		}
	}
	removeFromCartHandler = (id) => {
		this.props.removeFromCart(id);
	};
	checkoutHandler = () => {
		history.push('/signin?redirect=shipping');
	};
	render() {
		const { cartItems, addToCart } = this.props;

		return (
			<div className='row top'>
				<div className='col-2'>
					<h1>Shopping Cart</h1>
					{cartItems.length === 0 ? (
						<MessageBox>
							Cart is empty. <Link to='/'>Go Shopping</Link>
						</MessageBox>
					) : (
						<ul>
							{cartItems.map((item) => (
								<li key={item.product}>
									<div className='row'>
										<div>
											<img
												src={item.image}
												alt={item.name}
												className='small'
											></img>
										</div>
										<div className='min-30'>
											<Link to={`/product/${item.product}`}>{item.name}</Link>
										</div>
										<div>
											<select
												value={item.qty}
												onChange={(e) =>
													addToCart(item.product, Number(e.target.value))
												}
											>
												{[...Array(item.countInStock).keys()].map((x) => (
													<option key={x + 1} value={x + 1}>
														{x + 1}
													</option>
												))}
											</select>
										</div>
										<div>${item.price * item.qty}</div>
										<div>
											<button
												type='button'
												onClick={() => this.removeFromCartHandler(item.product)}
											>
												Delete
											</button>
										</div>
									</div>
								</li>
							))}
						</ul>
					)}
				</div>
				<div className='col-1'>
					<div className='card card-body'>
						<ul>
							<li>
								<h2>
									Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) :
									${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
								</h2>
							</li>
							<li>
								<button
									type='button'
									onClick={this.checkoutHandler}
									className='primary block'
									disabled={cartItems.length === 0}
								>
									Proceed to Checkout
								</button>
							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		cartItems: state.cart.cartItems,
	};
};

export default connect(mapStateToProps, { addToCart, removeFromCart })(
	CartScreen
);
