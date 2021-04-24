import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

class PrivateRoute extends React.Component {
	render() {
		const { component: Component, ...rest } = this.props;
		const { userInfo } = this.props.userSignin;
		return (
			<Route
				{...rest}
				render={(props) =>
					userInfo ? (
						<Component {...props}></Component>
					) : (
						<Redirect to='/signin' />
					)
				}
			></Route>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		userSignin: state.userSignin,
	};
};

export default connect(mapStateToProps)(PrivateRoute);
