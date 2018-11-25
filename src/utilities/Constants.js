
const ZOMATO_API_KEY = `${process.env.REACT_APP_ZOMATO_API_KEY}`;
const ZOMATO_API = `https://developers.zomato.com/api/v2.1`;

export const ZOMATO_API_ENDPOINTS = {
    GET_DETAILS_FROM_GEOCODE: (lat, lon) => `${ZOMATO_API}/geocode?lat=${lat}&lon=${lon}&apikey=${ZOMATO_API_KEY}`,

    GET_RESTAURANT_DETAILS: res_id => `${ZOMATO_API}/restaurant?res_id=${res_id}&apikey=${ZOMATO_API_KEY}`,

    GET_RESTAURANT_REVIEW: (res_id, start, end) => `${ZOMATO_API}/reviews?res_id=${res_id}&start=${start}&count=${end}&apikey=${ZOMATO_API_KEY}`,

    GET_CITY_ZOMATO_DETAILS: city => `${ZOMATO_API}/cities?q=${city}&apikey=${ZOMATO_API_KEY}`,

    GET_RESTRO_LIST: (entity_id, entity_type, start, count, sort_by, order_by) => `${ZOMATO_API}/search?entity_id=${entity_id}&entity_type=${entity_type}&start=${start}&count=${count}&sort=${sort_by}&order=${order_by}&apikey=${ZOMATO_API_KEY}`
}

export const APPLICATION_TITLE = "Restaurant-Finder";

export const listOfCitiesServing = [
    { city_id: 1, city: "Bangalore" },
    { city_id: 2, city: "Delhi" },
    { city_id: 3, city: "Kolkata" },
    { city_id: 4, city: "Mumbai" },
    { city_id: 5, city: "Pune" },
    { city_id: 6, city: "Hyderabad" },
    { city_id: 7, city: "Chennai" },
];

export const getDummyUserReviewData = review_text => {
    return {
        review: {
          user: {
            name: 'Current User',
            profile_image: 'https://gravatar.com/avatar/98bed73280a9a84a3421bc59b9739d9d?s=400&d=robohash&r=x',
          },
          rating: "5", //Default to 5 stars
          timestamp: new Date().getTime() / 1000,
          review_text
        }
      }
}

export const SORT_BY = {
    RATING: 'rating',
    PRICE: 'price'
}

export const ORDER_BY = {
    ASCENDING: 'asc',
    DESCENDING: 'desc'
}
