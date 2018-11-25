import * as Actions from './ActionTypes';
import { getDummyUserReviewData } from '../utilities/Constants';

const INIT_STATE = {
  reviewsObj: {
    user_reviews: []
  },
  city: null,
  title: null,
  entity_id: null,
  isLoading: false,
  restroObj: {
    restaurants: []
  }
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case Actions.DATA_REQUESTED:
    case Actions.REVIEWS_REQUESTED:
      return { ...state, isLoading: true };

      case Actions.NOT_ALLOWED_TO_ACCESS_USER_LOCATION:
      return { ...state, isLoading: false };

    case Actions.SET_SELECTED_CITY:
      let defaultReviewsObj = {
        user_reviews: []
      }
      return { ...state, reviewsObj: defaultReviewsObj, city: action.city, title: action.title, entity_id: action.entity_id, isLoading: true };

    case Actions.GOT_RESTRO_LIST:
      let restroList = !action.changeData ? [...state.restroObj.restaurants, ...action.restroList.restaurants] : [...action.restroList.restaurants];
      let restroObj = { ...action.restroList, restaurants: restroList }
      return { ...state, restroObj, isLoading: false };

    case Actions.UPDATED_RESTRO_LIST:
      restroList = [...action.restroList.restaurants];
      restroObj = { ...action.restroList, restaurants: restroList };
      return { ...state, restroObj, isLoading: false };

    case Actions.GOT_RESTRO_REVIEWS:
      let userReviewsList = [...state.reviewsObj.user_reviews, ...action.reviewsObj.user_reviews];
      let reviewsObj = { ...action.reviewsObj, user_reviews: userReviewsList };

      return { ...state, reviewsObj, isLoading: false };

    case Actions.SET_USER_REVIEW:
      let curr_reviews_list = state.reviewsObj.user_reviews;
      let userAddedReview = getDummyUserReviewData(action.review_text);
      curr_reviews_list.unshift(userAddedReview);
      reviewsObj = { ...action.reviewsObj, user_reviews: curr_reviews_list };
      return { ...state, reviewsObj, isLoading: false };

    default:
      return state
  }
}
