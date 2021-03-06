import React from 'react';
import { connect } from 'react-redux';
import { savePaymentMethod } from '../actions';
import CheckoutSteps from '../components/CheckoutSteps';
import history from '../history';

class PaymentMethodScreen extends React.Component {
	state = {
		paymentMethod: 'PayPal',
	};

	submitHandler = (e) => {
		e.preventDefault();
		this.props.savePaymentMethod(this.state.paymentMethod);
		history.push('/placeorder');
	};

	render() {
		if (!this.props.cart.shippingAddress.address) {
			history.push('/shipping');
		}

		return (
			<div>
				<CheckoutSteps step1 step2 step3></CheckoutSteps>
				<form className='form' onSubmit={this.submitHandler}>
					<div>
						<h1>Payment Method</h1>
					</div>
					<div>
						<div>
							<input
								type='radio'
								id='paypal'
								value='PayPal'
								name='paymentMethod'
								required
								checked
								onChange={(e) =>
									this.setState({ paymentMethod: e.target.value })
								}
							></input>
							<label htmlFor='paypal'>PayPal</label>
						</div>
					</div>
					<div>
						<div>
							<input
								type='radio'
								id='stripe'
								value='Stripe'
								name='paymentMethod'
								required
								onChange={(e) =>
									this.setState({ paymentMethod: e.target.value })
								}
							></input>
							<label htmlFor='stripe'>Stripe</label>
						</div>
					</div>
					<div>
						<label />
						<button className='primary' type='submit'>
							Continue
						</button>
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		cart: state.cart,
	};
};

export default connect(mapStateToProps, { savePaymentMethod })(
	PaymentMethodScreen
);
