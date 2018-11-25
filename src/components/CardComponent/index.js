import React from 'react';
import StarRatings from 'react-star-ratings';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const CardComponent = ({ id, thumb, name, average_cost_for_two, cuisines, location, user_rating }) => {
    return (
        <div className='media content content-container'>
            <div className='media-left'>
                <Link to={`/${id}`} ><img src={thumb} alt='thumb' className='media-left__image' /></Link>
            </div>
            <div className='media-body'>
                <Link to={`/${id}`} ><h3 className='restaurant-name res_name'>{name}</h3> </Link>
                 <p>{location.locality_verbose}<br /></p>
                <StarRatings rating={parseFloat(user_rating.aggregate_rating)} starDimension="15px" starSpacing="8px" isAggregateRating={true} starRatedColor="rgb(255,255,0)" />
                <label>{user_rating.votes} votes</label><br />
                <span>
                    Cuisines: {cuisines}<br />
                    Average Cost for 2 People: {average_cost_for_two}
                </span>
            </div>
        </div>
    );
}

CardComponent.propTypes = {
    id: PropTypes.string,
    thumb: PropTypes.string,
    name: PropTypes.string,
    average_cost_for_two: PropTypes.number,
    cuisines: PropTypes.string,
    location: PropTypes.object,
    user_rating: PropTypes.object
  };

export default CardComponent;