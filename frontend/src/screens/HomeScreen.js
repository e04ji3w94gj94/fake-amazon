import React from 'react';
import Product from '../components/Product';
import axios from 'axios';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

class HomeScreen extends React.Component {
	state = {
		products: [],
		loading: false,
		error: false,
	};

	componentDidMount() {
		const fecthData = async () => {
			try {
				this.setState({ loading: true });
				const { data } = await axios.get('/api/products');
				this.setState({ loading: false });
				this.setState({ products: data });
			} catch (err) {
				this.setState({ error: err.message });
				this.setState({ loading: false });
			}
		};
		fecthData();
	}

	render() {
		const { products, loading, error } = this.state;
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
export default HomeScreen;
