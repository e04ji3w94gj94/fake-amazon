import React from 'react';
import { connect } from 'react-redux';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { listProducts } from '../actions/productActions';

class HomeScreen extends React.Component {
	componentDidMount() {
		this.props.listProducts();
	}

	render() {
		const { products, loading, error } = this.props.productList;
		return (
			<div>
				{loading ? (
					<LoadingBox></LoadingBox>
				) : error ? (
					<MessageBox variant='danger'>{error}</MessageBox>
				) : (
					<div className='row center'>
						{products.map((product) => (
							<Product key={product._id} product={product}></Product>
						))}
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		productList: state.productList,
	};
};

export default connect(mapStateToProps, { listProducts })(HomeScreen);
