import React from 'react';
import { connect } from 'react-redux';
import { listOrderMine } from '../actions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import history from '../history';

class OrderHistoryScreen extends React.Component {
	componentDidMount() {
		this.props.listOrderMine();
	}

	render() {
		const { loading, error, orders } = this.props.orderMineList;

		return (
			<div>
				<h1>Order History</h1>
				{loading ? (
					<LoadingBox></LoadingBox>
				) : error ? (
					<MessageBox variant='danger'>{error}</MessageBox>
				) : (
					<table className='table'>
						<thead>
							<tr>
								<th>ID</th>
								<th>DATE</th>
								<th>TOTAL</th>
								<th>PAID</th>
								<th>DELIVERED</th>
								<th>ACTIONS</th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order) => (
								<tr key={order._id}>
									<td>{order._id}</td>
									<td>{order.createdAt.substring(0, 10)}</td>
									<td>{order.totalPrice.toFixed(2)}</td>
									<td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
									<td>
										{order.isDelivered
											? order.deliveredAt.substring(0, 10)
											: 'No'}
									</td>
									<td>
										<button
											type='button'
											className='small'
											onClick={() => {
												history.push(`/order/${order._id}`);
											}}
										>
											Details
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		orderMineList: state.orderMineList,
	};
};

export default connect(mapStateToProps, { listOrderMine })(OrderHistoryScreen);
