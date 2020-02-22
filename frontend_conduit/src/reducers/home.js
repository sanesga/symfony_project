import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  RESTAURANT_FAVORITED,
  RESTAURANT_UNFAVORITED,
  RESTAURANT_DETAIL
} from "../constants/actionTypes";

export default (state = {}, action) => {
  switch (action.type) {
    case RESTAURANT_DETAIL:
      // console.log(action.payload);

      return {
        ...state,
        restaurant: action.payload[0].data[0]
      };

    case HOME_PAGE_LOADED:
      //console.log(action);

      //console.log("HOME PAGE LOADED",action.payload[0].restaurants);
      return {
        ...state,
        restaurants: action.payload[0].restaurants
      };
    case HOME_PAGE_UNLOADED:
      return {};
    case RESTAURANT_FAVORITED:
    case RESTAURANT_UNFAVORITED:
      console.log("reducer favoritos", action.payload.restaurant[0].id);
      console.log("state", state.restaurant.favorited);
      console.log(state);

      return {
        ...state,
        restaurant: action.payload.restaurant[0]
      };

      //  state.restaurants.map(restaurant => {
      //     if (restaurant.id === action.payload.restaurant[0].id) {
      //       restaurant.favorited=action.payload.restaurant[0].favorited;
      //       return {
      //         ...state,
      //         data: action.payload[0].user[0],
      //         restaurants: state.restaurants
      //         // ...tag,
      //         // favorited: action.payload.restaurant[0].favorited,
      //       };
      //     }
      //     return {
      //       ...state,
      //       data: action.payload[0].user[0],
      //         restaurants: state.restaurants
      //     }
      //   })

      break;
    default:
      return state;
  }
};
