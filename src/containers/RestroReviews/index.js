import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getRestroReviews, getRestroFromResId } from '../../reducer/ActionCreator';
import InfiniteScroll from 'react-infinite-scroller';
import Loader from 'react-loader';
import EachReview from '../../components/EachReveiwComponent';
import PropTypes from 'prop-types';


class RestroReviews extends React.Component {
    constructor() {
        super();
        this.state = {
            enableScroll: false
        }
    }
    onScroll() {
        const { reviews_shown, user_reviews } = this.props.reviewsObj;
        if (this.props.match.params.res_id) {
            this.props.getRestroReviews(this.props.match.params.res_id, user_reviews.length, user_reviews.length + reviews_shown);
        }
    }
    componentWillMount() {
        let restaurantId = this.props.match ? this.props.match.params.res_id : this.props.res_id;

        if (!this.props.restaurant) {
            this.props.getRestroFromResId(restaurantId, true);
        }
        let end = this.props.match ? 10 : 5; //load 5 if restraunt details page else load 10
        this.props.getRestroReviews(restaurantId, 0, end);
        let enableScroll = this.props.match ? this.props.match.url.includes('/reviews/') : false;
        if (enableScroll) this.setState({ enableScroll }); //enable scroll when user viewing all reviews
    }
    render() {

        let reviewList = [], jsx = [];
        const { reviewsObj, isLoading, restaurant, limit } = this.props;
        if (reviewsObj.user_reviews.length) {
            reviewList = reviewsObj.user_reviews.map(each => each.review);
        }
        if (limit) reviewList = reviewList.slice(0, limit);
        jsx = reviewList.map((userReview, index) => <EachReview key={'review_' + index} userReview={userReview} index={index} />)

        return (
            <div >
                <Loader loaded={!isLoading}>
                    {!this.state.enableScroll && jsx.length && jsx}
                    {this.state.enableScroll && jsx.length &&
                        <>
                            <div className='content-container outline page-header'>
                                <h2 className="page-header__title"><small>Showing Reviews for </small>"<strong>{restaurant.restaurant.name + ", " + restaurant.restaurant.location.locality_verbose}</strong>"</h2>
                            </div>
                            <InfiniteScroll
                                loadMore={this.onScroll.bind(this)}
                                hasMore={reviewsObj.reviews_found !== reviewsObj.user_reviews.length}>
                                {jsx}
                            </InfiniteScroll>
                        </>
                    }
                </Loader>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    let restaurantId = props.match ? props.match.params.res_id : props.res_id;
    return {
        reviewsObj: state.Restaurant.reviewsObj,
        isLoading: state.Restaurant.isLoading,
        restaurant: state.Restaurant.restroObj.restaurants.find(restaurant => restaurant.restaurant.id === restaurantId)
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            getRestroReviews,
            getRestroFromResId
        },
        dispatch
    );

RestroReviews.propTypes = {
    reviewsObj: PropTypes.object,
    isLoading: PropTypes.bool,
    restaurant: PropTypes.object,
    getRestroReviews: PropTypes.func
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RestroReviews);