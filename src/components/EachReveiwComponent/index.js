import React from 'react';
import StarRatings from 'react-star-ratings';
import PropTypes from 'prop-types';

const EachReview = ({userReview, index}) => {
    return (
        <div key={index}>
            <div className='media-left'>
                <img src={userReview.user.profile_image} alt='user' className='media-left__image user-image' />
            </div>
            <div className='media-body'>
                <h4 className='user-name'>{userReview.user.name}</h4>
                <li>
                <StarRatings rating={parseFloat(userReview.rating)} starDimension="15px" starSpacing="8px" isAggregateRating={true} starRatedColor="rgb(255,255,0)" />
                    <span>Reviewd At :- {new Date(parseInt(userReview.timestamp * 1000)).toDateString()}</span>
                </li>
                <p> {userReview.review_text}</p>
            </div>
        </div>
    )
}

EachReview.propTypes = {
    userReview: PropTypes.object,
    index: PropTypes.number
};

export default EachReview;