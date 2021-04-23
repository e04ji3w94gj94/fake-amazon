import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { detailsOrder, payOrder, resetPayOrder } from '../actions';

class OrderScreen extends React.Component {
	state = {
		sdkReady: false,
	};

	componentDidMount() {
		const orderId = this.props.match.params.id;
		const { order } = this.props.orderDetails;
		console.log('componentDidMount:', order);
		if (!order || (order && order._id !== orderId)) {
			this.props.detailsOrder(orderId);
			if (!window.paypal) {
				this.addPayPalScript();
			} else {
				this.setState({ sdkReady: true });
			}
		}
	}

	componentDidUpdate() {
		const orderId = this.props.match.params.id;
		const { order } = this.props.orderDetails;
		console.log('componentDidUpdate:', order);

		const { success: successPay } = this.props.orderPay;

		if (successPay) {
			this.props.resetPayOrder();
			this.props.detailsOrder(orderId);
		}
	}

	addPayPalScript = async () => {
		const { data } = await axios.get('/api/config/paypal');
		const script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
		script.async = true;
		script.onload = () => {
			this.setState({ sdkReady: true });
		};
		document.body.appendChild(script);
	};

	successPaymentHandler = (paymentResult) => {
		const { order } = this.props.orderDetails;
		this.props.payOrder(order, paymentResult);
	};

	render() {
		const { order, loading, error } = this.props.orderDetails;
		const { loading: loadingPay, error: errorPay } = this.props.orderPay;

		return loading ? (
			<LoadingBox></LoadingBox>
		) : error ? (
			<MessageBox variant='danger'>{error}</MessageBox>
		) : (
			<div>
				<h1>Order {order._id}</h1>
				<div className='row top'>
					<div className='col-2'>
						<ul>
							<li>
								<div className='card card-body'>
									<h2>Shipping</h2>
									<p>
										<strong>Name:</strong> {order.shippingAddress.fullName}{' '}
										<br />
										<strong>Address: </strong> {order.shippingAddress.address},
										{order.shippingAddress.city},{' '}
										{order.shippingAddress.postalCode},
										{order.shippingAddress.country}
									</p>
									{order.isDelivered ? (
										<MessageBox variant='success'>
											Delivered at {order.deliveredAt}
										</MessageBox>
									) : (
										<MessageBox variant='danger'>Not Delivered</MessageBox>
									)}
								</div>
							</li>
							<li>
								<div className='card card-body'>
									<h2>Payment</h2>
									<p>
										<strong>Method:</strong> {order.paymentMethod}
									</p>
									{order.isPaid ? (
										<MessageBox variant='success'>
											Paid at {order.paidAt}
										</MessageBox>
									) : (
										<MessageBox variant='danger'>Not Paid</MessageBox>
									)}
								</div>
							</li>
							<li>
								<div className='card card-body'>
									<h2>Order Items</h2>
									<ul>
										{order.orderItems.map((item) => (
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
														<Link to={`/product/${item.product}`}>
															{item.name}
														</Link>
													</div>

													<div>
														{item.qty} x ${item.price} = $
														{item.qty * item.price}
													</div>
												</div>
											</li>
										))}
									</ul>
								</div>
							</li>
						</ul>
					</div>
					<div className='col-1'>
						<div className='card card-body'>
							<ul>
								<li>
									<h2>Order Summary</h2>
								</li>
								<li>
									<div className='row'>
										<div>Items</div>
										<div>${order.itemsPrice.toFixed(2)}</div>
									</div>
								</li>
								<li>
									<div className='row'>
										<div>Shipping</div>
										<div>${order.shippingPrice.toFixed(2)}</div>
									</div>
								</li>
								<li>
									<div className='row'>
										<div>Tax</div>
										<div>${order.taxPrice.toFixed(2)}</div>
									</div>
								</li>
								<li>
									<div className='row'>
										<div>
											<strong> Order Total</strong>
										</div>
										<div>
											<strong>${order.totalPrice.toFixed(2)}</strong>
										</div>
									</div>
								</li>
								{!order.isPaid && (
									<li>
										{!this.state.sdkReady ? (
											<LoadingBox></LoadingBox>
										) : (
											<>
												{errorPay && (
													<MessageBox variant='danger'>{errorPay}</MessageBox>
												)}
												{loadingPay && <LoadingBox></LoadingBox>}

												<PayPalButton
													amount={order.totalPrice}
													onSuccess={this.successPaymentHandler}
												></PayPalButton>
											</>
										)}
									</li>
								)}
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		orderDetails: state.orderDetails,
		orderPay: state.orderPay,
	};
};

export default connect(mapStateToProps, {
	detailsOrder,
	payOrder,
	resetPayOrder,
})(OrderScreen);
