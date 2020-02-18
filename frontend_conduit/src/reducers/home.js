import { HOME_PAGE_LOADED, HOME_PAGE_UNLOADED, RESTAURANT_FAVORITED, RESTAURANT_UNFAVORITED } from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case HOME_PAGE_LOADED:
      //console.log("HOME PAGE LOADED",action.payload[0].restaurants);
      return {
        ...state,
        restaurants: action.payload[0].restaurants
      };
    case HOME_PAGE_UNLOADED:
      return {};
      case RESTAURANT_FAVORITED:
        case RESTAURANT_UNFAVORITED:
         // console.log("STATE");
         // console.log(state.restaurants);
          // state.tags[0].restaurants.map(tag => {
          //   console.log(tag.id);
          // })
         // console.log("ACTION");
         // console.log(action.payload.restaurant[0].id);
         
           state.restaurants.map(restaurant => {
              if (restaurant.id === action.payload.restaurant[0].id) {
                restaurant.favorited=action.payload.restaurant[0].favorited;
                return {
                  ...state,
                  data: action.payload[0].user[0],
                  restaurants: state.restaurants
                  // ...tag,
                  // favorited: action.payload.restaurant[0].favorited,
                };
              }
              return {
                ...state,
                data: action.payload[0].user[0],
                  restaurants: state.restaurants
              }
            })
            
         
break;
    default:
      return state;
    
  }
};
