import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Rating from '../components/Rating';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { detailsProduct } from '../actions';
import history from '../history';

class ProductScreen extends React.Component {
	productId = this.props.match.params.id;

	state = {
		qty: 1,
	};

	componentDidMount() {
		this.props.detailsProduct(this.productId);
	}

	addToCartHandler = () => {
		history.push(`/cart/${this.productId}?qty=${this.state.qty}`);
	};

	render() {
		const { loading, error, product } = this.props.productDetails;
		return (
			<div>
				{loading ? (
					<LoadingBox></LoadingBox>
				) : error ? (
					<MessageBox variant='danger'>{error}</MessageBox>
				) : (
					<div>
						<Link to='/'>Back to result</Link>
						<div className='row top'>
							<div className='col-2'>
								<img
									className='large'
									src={product.image}
									alt={product.name}
								></img>
							</div>
							<div className='col-1'>
								<ul>
									<li>
										<h1>{product.name}</h1>
									</li>
									<li>
										<Rating
											rating={product.rating}
											numReviews={product.numReviews}
										></Rating>
									</li>
									<li>Pirce : ${product.price}</li>
									<li>
										Description:
										<p>{product.description}</p>
									</li>
								</ul>
							</div>
							<div className='col-1'>
								<div className='card card-body'>
									<ul>
										<li>
											<div className='row'>
												<div>Price</div>
												<div className='price'>${product.price}</div>
											</div>
										</li>
										<li>
											<div className='row'>
												<div>Status</div>
												<div>
													{product.countInStock > 0 ? (
														<span className='success'>In Stock</span>
													) : (
														<span className='danger'>Unavailable</span>
													)}
												</div>
											</div>
										</li>
										{product.countInStock > 0 && (
											<>
												<li>
													<div className='row'>
														<div>Qty</div>
														<div>
															<select
																value={this.state.qty}
																onChange={(e) =>
																	this.setState({ qty: e.target.value })
																}
															>
																{[...Array(product.countInStock).keys()].map(
																	(x) => (
																		<option key={x + 1} value={x + 1}>
																			{x + 1}
																		</option>
																	)
																)}
															</select>
														</div>
													</div>
												</li>
												<li>
													<button
														onClick={this.addToCartHandler}
														className='primary block'
													>
														Add to Cart
													</button>
												</li>
											</>
										)}
									</ul>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		productDetails: state.productDetails,
	};
};

export default connect(mapStateToProps, { detailsProduct })(ProductScreen);
