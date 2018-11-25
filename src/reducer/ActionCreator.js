import * as Actions from './ActionTypes';
import { ZOMATO_API_ENDPOINTS } from '../utilities/Constants';
import { MakeAPICall, GetUserLocation } from '../utilities/api';
import { HandleError } from '../utilities/handleError';

export const getUserLocationRestro = () => {
    return async dispatch => {
        dispatch({
            type: Actions.DATA_REQUESTED
        });
        let position = await GetUserLocation();
        if (!(position.notAllowedToAccessLocation)) {
            let { latitude, longitude } = position.coords;
            let geoDetails = await MakeAPICall(ZOMATO_API_ENDPOINTS.GET_DETAILS_FROM_GEOCODE(latitude, longitude));
            if (!(geoDetails instanceof Error)) {
                let { city_name, title } = geoDetails.location;
                let city_zomato_details = await MakeAPICall(ZOMATO_API_ENDPOINTS.GET_CITY_ZOMATO_DETAILS(city_name));
                let entity_id = city_zomato_details.location_suggestions[0].id;
                dispatch({
                    type: Actions.SET_SELECTED_CITY,
                    city: city_name,
                    title,
                    entity_id
                });
                let restroList = await MakeAPICall(ZOMATO_API_ENDPOINTS.GET_RESTRO_LIST(entity_id, 'city', 1, 10, 'rating', 'desc'));

                if (!(restroList instanceof Error)) {
                    dispatch({
                        type: Actions.GOT_RESTRO_LIST,
                        restroList
                    });
                }
                else {
                    HandleError('Error while getting restraunt list ', restroList);
                    dispatch({
                        type: Actions.NOT_ALLOWED_TO_ACCESS_USER_LOCATION
                    })
                }
            }
        } else {
            dispatch({
                type: Actions.NOT_ALLOWED_TO_ACCESS_USER_LOCATION
            })
        }
    }
};

export const setSelectedCity = (city, title, entity_id) => {
    return async dispatch => {
        let city_zomato_details;
        if (!entity_id) {
            city_zomato_details = await MakeAPICall(ZOMATO_API_ENDPOINTS.GET_CITY_ZOMATO_DETAILS(city));
            entity_id = city_zomato_details.location_suggestions[0].id;
        }
        dispatch({
            type: Actions.SET_SELECTED_CITY,
            city,
            title,
            entity_id
        });
        let restroList = await MakeAPICall(ZOMATO_API_ENDPOINTS.GET_RESTRO_LIST(entity_id, 'city', 1, 10, 'rating', 'desc'));
        console.log('This data ', restroList);
        if (!(restroList instanceof Error)) {
            dispatch({
                type: Actions.UPDATED_RESTRO_LIST,
                restroList
            });
        }
        else {
            HandleError('Error while getting restraunt list ', restroList);
        }
    }
};

export const getMoreRestro = (entity_id, start, count, entity_type = 'city', sort_by = 'rating', order_by = 'desc', changeData) => {
    return async dispatch => {
        if (changeData) {
            dispatch({
                type: Actions.DATA_REQUESTED
            });
        }
        let restroList = await MakeAPICall(ZOMATO_API_ENDPOINTS.GET_RESTRO_LIST(entity_id, entity_type, start, count, sort_by, order_by));
        if (!(restroList instanceof Error)) {
            dispatch({
                type: Actions.GOT_RESTRO_LIST,
                restroList,
                changeData
            });
        }
        else {
            HandleError('Error while getting restraunt list ', restroList);
        }
    }
}

export const getRestroReviews = (restro_id, start, end, loader) => {

    return async dispatch => {
        if (loader) {
            dispatch({
                type: Actions.DATA_REQUESTED
            });
        }
        let reviewsObj = await MakeAPICall(ZOMATO_API_ENDPOINTS.GET_RESTAURANT_REVIEW(restro_id, start, end));

        if (reviewsObj instanceof Error) {
            HandleError('Error with Review fetch API ', reviewsObj);
        }
        else {
            dispatch({
                type: Actions.GOT_RESTRO_REVIEWS,
                reviewsObj
            });
        }
    }
};

export const getRestroFromResId = (restro_id, changeData) => {

    return async dispatch => {
        dispatch({
            type: Actions.DATA_REQUESTED
        });
        let restaurant = await MakeAPICall(ZOMATO_API_ENDPOINTS.GET_RESTAURANT_DETAILS(restro_id));

        if (restaurant instanceof Error) {
            HandleError('Error with Restro fetch API ', restaurant);
        }
        else {
            let restroList = {
                results_found: 1,
                results_start: 1,
                results_shown: 1,
                restaurants: [{
                    restaurant
                }]
            }
            dispatch({
                type: Actions.GOT_RESTRO_LIST,
                restroList,
                changeData
            });
        }
    }
};

export const setUserReview = (review_text) => {
    return dispatch => {
        dispatch({
            type: Actions.SET_USER_REVIEW,
            review_text
        });
    }
}
