import React from 'react';
import { connect } from 'react-redux';
import { saveShippingAddress } from '../actions';
import CheckoutSteps from '../components/CheckoutSteps';
import history from '../history';

class ShippingAddressScreen extends React.Component {
	shippingAddress = this.props.cart.shippingAddress;

	redirect = this.props.location.search
		? this.props.location.search.split('=')[1]
		: '/';

	state = {
		fullName: this.shippingAddress.fullName,
		address: this.shippingAddress.address,
		city: this.shippingAddress.city,
		postalCode: this.shippingAddress.postalCode,
		country: this.shippingAddress.country,
	};

	componentDidMount() {
		if (!this.props.userSignin.userInfo) {
			history.push('/signin');
		}
	}

	componentDidUpdate() {
		if (!this.props.userSignin.userInfo) {
			history.push('/signin?redirect=shipping');
		}
	}

	submitHandler = (e) => {
		e.preventDefault();
		this.props.saveShippingAddress({
			fullName: this.state.fullName,
			address: this.state.address,
			city: this.state.city,
			postalCode: this.state.postalCode,
			country: this.state.country,
		});
		history.push('/payment');
	};

	render() {
		return (
			<div>
				<CheckoutSteps step1 step2></CheckoutSteps>
				<form className='form' onSubmit={this.submitHandler}>
					<div>
						<h1>Shipping Address</h1>
					</div>
					<div>
						<label htmlFor='fullName'>Full Name</label>
						<input
							type='text'
							id='fullName'
							placeholder='Enter full name'
							value={this.state.fullName}
							onChange={(e) => this.setState({ fullName: e.target.value })}
							required
						></input>
					</div>
					<div>
						<label htmlFor='address'>Address</label>
						<input
							type='text'
							id='address'
							placeholder='Enter address'
							value={this.state.address}
							onChange={(e) => this.setState({ address: e.target.value })}
							required
						></input>
					</div>
					<div>
						<label htmlFor='city'>City</label>
						<input
							type='text'
							id='city'
							placeholder='Enter city'
							value={this.state.city}
							onChange={(e) => this.setState({ city: e.target.value })}
							required
						></input>
					</div>
					<div>
						<label htmlFor='postalCode'>Postal Code</label>
						<input
							type='text'
							id='postalCode'
							placeholder='Enter postal code'
							value={this.state.postalCode}
							onChange={(e) => this.setState({ postalCode: e.target.value })}
							required
						></input>
					</div>
					<div>
						<label htmlFor='country'>Country</label>
						<input
							type='text'
							id='country'
							placeholder='Enter country'
							value={this.state.country}
							onChange={(e) => this.setState({ country: e.target.value })}
							required
						></input>
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
		userSignin: state.userSignin,
		cart: state.cart,
	};
};

export default connect(mapStateToProps, { saveShippingAddress })(
	ShippingAddressScreen
);
