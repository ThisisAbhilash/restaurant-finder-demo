import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import InfiniteScroll from 'react-infinite-scroller';
import CardComponent from '../../components/CardComponent';
import { getMoreRestro } from '../../reducer/ActionCreator';
import { SORT_BY, ORDER_BY } from '../../utilities/Constants';
import PropTypes from 'prop-types';

class RestroList extends React.Component {

    constructor() {
        super();
        this.state = {
            sortBy: SORT_BY.RATING,
            orderBy: ORDER_BY.DESCENDING
        }
    }

    onScroll() {
        const { results_start, results_shown } = this.props.restroObj;
        if (this.props.entity_id) {
            this.props.getMoreRestro(this.props.entity_id, results_start + results_shown, results_shown);
        }
    }

    onSortList(sortBy) {
        let orderBy = ORDER_BY.ASCENDING;
        if (this.state.sortBy === sortBy) {
            orderBy = this.state.orderBy === ORDER_BY.ASCENDING ? ORDER_BY.DESCENDING : ORDER_BY.ASCENDING;
        }
        this.props.getMoreRestro(this.props.entity_id, 0, 10, 'city', sortBy, orderBy, true);
        this.setState({ sortBy, orderBy });
    }

    render() {
        const { isLoading, restroObj, title, city } = this.props;
        const { results_found } = restroObj;
        let title_city = `${title ? title + ', ' + city : city}`;
        let cards = [];
        if (restroObj) {
            let { restaurants } = restroObj;
            cards = restaurants.map((eachRestaurant, index) => <CardComponent key={index} {...eachRestaurant.restaurant} />);
        }
        let arrowCode = this.state.orderBy === ORDER_BY.ASCENDING ? <i className="fa fa-arrow-down" style={{color:"blue"}}></i> : <i className="fa fa-arrow-up" style={{color:"blue"}}></i>;
        return (
            <div>
                <Loader loaded={!isLoading}>
                {cards.length ?
                    <>
                    <div className='content-container outline page-header'>
                        <h2 className="page-header__title"><small>Showing restaurants in </small>"<strong>{title_city}</strong>"</h2>
                        <label>sort by&nbsp;&nbsp; 
                            <span onClick={() => this.onSortList(SORT_BY.RATING)} className = {`${this.state.sortBy === SORT_BY.RATING ? 'seletedSort' : 'cursor'}`}>Rating {this.state.sortBy === SORT_BY.RATING && <span>{arrowCode}</span>}</span>&nbsp;&nbsp; 
                            <span onClick={() => this.onSortList(SORT_BY.PRICE)} className = {`${this.state.sortBy === SORT_BY.PRICE ? 'seletedSort' : 'cursor'}`}>Price </span>{this.state.sortBy === SORT_BY.PRICE && <span>{arrowCode}</span>}
                        </label>
                    </div>
                    <InfiniteScroll
                        loadMore={this.onScroll.bind(this)}
                        hasMore={results_found !== restroObj.restaurants.length}>
                        {cards}
                    </InfiniteScroll>
                    </> : <p>Please select a city to search...</p>}
                </Loader>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        restroObj: state.Restaurant.restroObj,
        isLoading: state.Restaurant.isLoading,
        title: state.Restaurant.title,
        city: state.Restaurant.city,
        entity_id: state.Restaurant.entity_id
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            getMoreRestro
        },
        dispatch
    );

RestroList.propTypes = {
    restroObj: PropTypes.object,
    isLoading: PropTypes.bool,
    title: PropTypes.string,
    city: PropTypes.string,
    entity_id: PropTypes.number,
    getMoreRestro: PropTypes.func
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RestroList);