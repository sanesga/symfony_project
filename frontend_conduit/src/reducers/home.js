import { HOME_PAGE_LOADED, HOME_PAGE_UNLOADED, RESTAURANT_FAVORITED, RESTAURANT_UNFAVORITED } from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case HOME_PAGE_LOADED:
      console.log("HOME PAGE LOADED",action.payload[0].restaurants);
      return {
        ...state,
        tags: action.payload[0].restaurants
      };
    case HOME_PAGE_UNLOADED:
      return {};
      case RESTAURANT_FAVORITED:
        case RESTAURANT_UNFAVORITED:
          console.log("STATE");
          console.log(state.tags);
          // state.tags[0].restaurants.map(tag => {
          //   console.log(tag.id);
          // })
          console.log("ACTION");
          console.log(action.payload.restaurant[0].id);
         
           state.tags.map(tag => {
              if (tag.id === action.payload.restaurant[0].id) {
                tag.favorited=action.payload.restaurant[0].favorited;
                return {
                  ...state,
                  tags: state.tags
                  // ...tag,
                  // favorited: action.payload.restaurant[0].favorited,
                };
              }
             // return tags;
            })
         

    default:
      return state;
  }
};
