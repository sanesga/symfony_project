import { combineReducers } from 'redux';
import RestaurantsReducer from './Restaurants/reducers';

const rootReducer = combineReducers({
  restaurants: RestaurantsReducer
});

export default rootReducer;

