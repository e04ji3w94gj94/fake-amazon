import React from 'react';

const Rating = (props) => {
	const { rating, numReviews } = props;
	const ratingList = [1, 2, 3, 4, 5];
	const renderrating = ratingList.map((rate) => {
		return (
			<React.Fragment key={rate}>
				<span>
					<i
						className={
							rating >= rate
								? 'fa fa-star'
								: rating >= rate - 0.5
								? 'fa fa-star-half-o'
								: 'fa fa-star-o'
						}
					></i>
				</span>
			</React.Fragment>
		);
	});

	return (
		<div className='rating'>
			{renderrating}
			<span>{numReviews + ' reviews'}</span>
		</div>
	);
};

export default Rating;
