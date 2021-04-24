import React from 'react';
import { connect } from 'react-redux';
import { detailsUser, updateUserProfile, resetUserProfile } from '../actions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

class ProfileScreen extends React.Component {
	state = {
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	};

	componentDidMount() {
		const { user } = this.props.userDetails;
		const { userInfo } = this.props.userSignin;

		if (!user) {
			this.props.detailsUser(userInfo._id);
		} else {
			this.props.resetUserProfile();
		}
	}
	componentDidUpdate(prevProps) {
		const { user } = this.props.userDetails;

		if (user !== prevProps.userDetails.user) {
			this.setState({ name: user.name, email: user.email });
		}
	}

	submitHandler = (e) => {
		e.preventDefault();
		const { name, email, password } = this.state;
		const { user } = this.props.userDetails;

		if (this.state.password !== this.state.confirmPassword) {
			alert('Password and Confirm Password Are Not Matched');
		} else {
			this.props.updateUserProfile({ userId: user._id, name, email, password });
		}
	};

	render() {
		const { loading, error } = this.props.userDetails;
		const {
			success: successUpdate,
			error: errorUpdate,
			loading: loadingUpdate,
		} = this.props.userUpdateProfile;
		return (
			<div>
				<form className='form' onSubmit={this.submitHandler}>
					<div>
						<h1>User Profile</h1>
					</div>
					{loading ? (
						<LoadingBox></LoadingBox>
					) : error ? (
						<MessageBox variant='danger'>{error}</MessageBox>
					) : (
						<>
							{loadingUpdate && <LoadingBox></LoadingBox>}
							{errorUpdate && (
								<MessageBox variant='danger'>{errorUpdate}</MessageBox>
							)}
							{successUpdate && (
								<MessageBox variant='success'>
									Profile Updated Successfully
								</MessageBox>
							)}
							<div>
								<label htmlFor='name'>Name</label>
								<input
									id='name'
									type='text'
									placeholder='Enter name'
									value={this.state.name}
									onChange={(e) => {
										this.setState({ name: e.target.value });
									}}
								></input>
							</div>
							<div>
								<label htmlFor='email'>Email</label>
								<input
									id='email'
									type='email'
									placeholder='Enter email'
									value={this.state.email}
									onChange={(e) => {
										this.setState({ email: e.target.value });
									}}
								></input>
							</div>
							<div>
								<label htmlFor='password'>Password</label>
								<input
									id='password'
									type='password'
									placeholder='Enter password'
									onChange={(e) => {
										this.setState({ password: e.target.value });
									}}
								></input>
							</div>
							<div>
								<label htmlFor='confirmPassword'>confirm Password</label>
								<input
									id='confirmPassword'
									type='password'
									placeholder='Enter confirm password'
									onChange={(e) => {
										this.setState({ confirmPassword: e.target.value });
									}}
								></input>
							</div>
							<div>
								<label />
								<button className='primary' type='submit'>
									Update
								</button>
							</div>
						</>
					)}
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		userSignin: state.userSignin,
		userDetails: state.userDetails,
		userUpdateProfile: state.userUpdateProfile,
	};
};

export default connect(mapStateToProps, {
	detailsUser,
	updateUserProfile,
	resetUserProfile,
})(ProfileScreen);
