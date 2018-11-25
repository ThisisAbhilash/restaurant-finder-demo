import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './restrodetails.css';
import '../../components/CardComponent/card.css';
import RestroReviews from "../RestroReviews";
import Button from '../../components/ButtonComponent';
import { setUserReview, getRestroFromResId } from '../../reducer/ActionCreator';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Loader from 'react-loader';

class RestroDetails extends React.Component {

    componentWillMount() {
        if(!this.props.restaurant) {
            let { res_id } = this.props.match.params;
            if(res_id) {
                this.props.getRestroFromResId(res_id, true);
            }
        }
    }
    submitUserReview() {
        let textbox_elem = document.getElementById('login_user_review');
        let review_text = textbox_elem.value;
        this.props.setUserReview(review_text);
    }
    render() {
        if(!this.props.restaurant || !this.props.restaurant.restaurant) {
            return <Loader loaded={false} />;
        }
        const { featured_image, name, user_rating, cuisines, location } = this.props.restaurant.restaurant;
        return (

            <div className='content-container content'>
                <img src={featured_image} alt='...' className='featured-image' />
                <h3 className='restaurant-name'>
                    {name}
                </h3>

                <span>Rating : {user_rating.aggregate_rating}</span>
                <span> ({user_rating.votes} votes)</span>
                <p><strong>Cuisines: </strong>{cuisines}</p>
                <hr />

                <p><strong>Address:</strong></p>
                <p>{location.address}</p>
                <hr />
                <input type="text" className="form-control" id="login_user_review" placeholder="Revie this restaurant..."></input>
                <Button type="button" className={"btn btn-primary"} text={"Add Review"} onClick={() => this.submitUserReview()} />

                <p><strong>Reviews</strong></p>
                <RestroReviews res_id={this.props.match.params.res_id} limit={5} />
                <Link to={`reviews/${this.props.match.params.res_id}`}>More Reviews</Link>

            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        restaurant: state.Restaurant.restroObj.restaurants.find(restaurant => {
            return restaurant.restaurant.id === props.match.params.res_id;
        })
    }
}

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            setUserReview,
            getRestroFromResId
        },
        dispatch
    );

RestroDetails.propTypes = {
    restaurant: PropTypes.object,
    setUserReview: PropTypes.func
};
export default connect(mapStateToProps, mapDispatchToProps)(RestroDetails);