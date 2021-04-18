import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../actions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import history from '../history';

class SigninScreen extends React.Component {
	redirect = this.props.location.search
		? this.props.location.search.split('=')[1]
		: '/';

	state = {
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	};

	componentDidUpdate() {
		if (this.props.userRegister.userInfo) {
			history.push(this.redirect);
		}
	}

	submitHandler = (e) => {
		e.preventDefault();
		if (this.state.password !== this.state.confirmPassword) {
			alert('Password and confirm password are not match');
		} else {
			this.props.register(
				this.state.name,
				this.state.email,
				this.state.password
			);
		}
	};

	render() {
		const { loading, error } = this.props.userRegister;
		return (
			<div>
				<form className='form' onSubmit={this.submitHandler}>
					<div>
						<h1>Create Account</h1>
					</div>
					{loading && <LoadingBox></LoadingBox>}
					{error && <MessageBox variant='danger'>{error}</MessageBox>}
					<div>
						<label htmlFor='name'>Name</label>
						<input
							type='text'
							id='name'
							placeholder='Enter name'
							required
							onChange={(e) => this.setState({ name: e.target.value })}
						></input>
					</div>
					<div>
						<label htmlFor='email'>Email address</label>
						<input
							type='email'
							id='email'
							placeholder='Enter email'
							required
							onChange={(e) => this.setState({ email: e.target.value })}
						></input>
					</div>
					<div>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							id='password'
							placeholder='Enter password'
							required
							onChange={(e) => this.setState({ password: e.target.value })}
						></input>
					</div>
					<div>
						<label htmlFor='confirmPassword'>Confirm Password</label>
						<input
							type='password'
							id='confirmPassword'
							placeholder='Enter confirm password'
							required
							onChange={(e) =>
								this.setState({ confirmPassword: e.target.value })
							}
						></input>
					</div>
					<div>
						<label />
						<button className='primary' type='submit'>
							Register
						</button>
					</div>
					<div>
						<label />
						<div>
							Already have an account?{' '}
							<Link to={`/signin?redirect=${this.redirect}`}>Sign-In</Link>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		userRegister: state.userRegister,
	};
};

export default connect(mapStateToProps, { register })(SigninScreen);
