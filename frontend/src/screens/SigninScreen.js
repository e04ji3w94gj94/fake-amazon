import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signin } from '../actions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import history from '../history';

class SigninScreen extends React.Component {
	redirect = this.props.location.search
		? this.props.location.search.split('=')[1]
		: '/';

	state = {
		email: '',
		password: '',
	};

	componentDidMount() {
		if (this.props.userSignin.userInfo) {
			history.push(this.redirect);
		}
	}

	componentDidUpdate() {
		if (this.props.userSignin.userInfo) {
			history.push(this.redirect);
		}
	}

	submitHandler = (e) => {
		e.preventDefault();
		this.props.signin(this.state.email, this.state.password);
	};

	render() {
		const { loading, error } = this.props.userSignin;
		return (
			<div>
				<form className='form' onSubmit={this.submitHandler}>
					<div>
						<h1>Sign In</h1>
					</div>
					{loading && <LoadingBox></LoadingBox>}
					{error && <MessageBox variant='danger'>{error}</MessageBox>}
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
						<label />
						<button className='primary' type='submit'>
							Sign In
						</button>
					</div>
					<div>
						<label />
						<div>
							New customer?{' '}
							<Link to={`/register?redirect=${this.redirect}`}>
								Create your account
							</Link>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		userSignin: state.userSignin,
	};
};

export default connect(mapStateToProps, { signin })(SigninScreen);
