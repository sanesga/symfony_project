import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  RESTAURANT_FAVORITED,
  RESTAURANT_UNFAVORITED,
  RESTAURANT_DETAIL,
  GET_FAVORITES
} from "../constants/actionTypes";

export default (state = {}, action) => {
  switch (action.type) {
    case RESTAURANT_DETAIL:
      return {
        ...state,
        restaurant: action.payload[0].data[0]
      };
    case HOME_PAGE_LOADED:
      return {
        ...state,
        restaurants: action.payload[0].restaurants
      };
    case HOME_PAGE_UNLOADED:
      return {};
    case RESTAURANT_FAVORITED:
    case RESTAURANT_UNFAVORITED:
      return {
        ...state,
        restaurant: action.payload.restaurant[0]
      };
    case GET_FAVORITES:
      return{
        ...state,
        favorites: action.payload[0].restaurants
      };
    default:
      return state;
  }
};
