import { requestRestaurants,requestRestaurant } from './services'
import { 
  FETCH_RESTAURANTS,
  FETCH_RESTAURANTS_SUCCESS,
  FETCH_RESTAURANTS_FAILURE,

  FETCH_RESTAURANT,
  FETCH_RESTAURANT_SUCCESS,
  FETCH_RESTAURANT_FAILURE,

  SEARCH,
  RESTAURANT_TYPE 
} from './reducers';

export {RESTAURANT_TYPE};
//Action Creators

/**
 * restaurant_type: 
 *  - The type of restaurant to be fetched.It is available on action as restaurant_type. 
 *  -  Currently restaurant_type are FEATURED_RESTAURANTS,RELATED_RESTAURANTS,MAIN_RESTAURANTS
 * params : filters applied to the listing.It is saved in the store when response arrives**/
export const fetchRestaurants = (restaurant_type,params={})=>{
  return {
    type:FETCH_RESTAURANTS,
    restaurant_type,
    params
  }
}

export const fetchRestaurantsSuccess = (restaurants,restaurant_type,params={})=>{
  return {
    type: FETCH_RESTAURANTS_SUCCESS,
    payload:restaurants,
    restaurant_type,
    params
  }
}

export const fetchRestaurantsFailure = (error,restaurant_type,params={})=>{
  return{
    type : FETCH_RESTAURANTS_FAILURE,
    payload:error,
    restaurant_type,
    params
  }
}
export const fetchRestaurant = (slug)=>{
  return {
    type:FETCH_RESTAURANT,
    slug
  }
}

export const fetchRestaurantSuccess = (restaurant)=>{
  return {
    type: FETCH_RESTAURANT_SUCCESS,
    payload:restaurant,
  }
}

export const fetchRestaurantFailure = (error,slug)=>{
  return{
    type : FETCH_RESTAURANT_FAILURE,
    payload:error,
    slug
  }
}
export const searchAction = (query,restaurant_type=RESTAURANT_TYPE.MAIN_RESTAURANTS)=>{
  return {
    type: SEARCH,
    state : !!query,
    search:query,
    restaurant_type
  }
}

/**checks if mainrestaurant is scheduled for a refetch
 * it uses store's makecall for specific restaurant
 * Currently enabled for only mainRestaurants
 */
function canMakeCall(state,restaurant_type){
  if(restaurant_type === RESTAURANT_TYPE.MAIN_RESTAURANTS){
    const Restaurants = state.restaurants[RESTAURANT_TYPE.MAIN_RESTAURANTS]
    return Restaurants.makecall;
  }
  return true;
}

/**
 * Collects the parameters to make the request.
 * The params are collected/merged from following three sources 
 * Priority 1 - extraparams passed from component
 * Priority 2 - scheduled params i.e nextparams in the store
 * Priority 3 - params in the store
 */
function get_params(state,extraparams={},restaurant_type){
    const Restaurants = state.restaurants[restaurant_type];
    //get params from next scheduled params and current params
    let params = Object.assign({},Restaurants.params || {},Restaurants.nextparams || {},extraparams);
    return params;
}

//Actions 
export const getRestaurants = (restaurant_type,params={}) => (dispatch,getState) =>{

  //console.log("estamos en action.js");
  /*
   *  It is responsible for fetching the restaurants of different type
   */
  const state = getState();
  //check if a call can be made using makecall param
  if(canMakeCall(state,restaurant_type)){
    //collect request parameters
    params = get_params(state,params,restaurant_type);

    dispatch(fetchRestaurants(restaurant_type));

    return requestRestaurants(params).then((response)=>{

     //console.log("parametros recuperados");
      //console.log(params);

      if(!response.error){
        dispatch(fetchRestaurantsSuccess(response.data,restaurant_type,params));
      }
      else{
        dispatch(fetchRestaurantsFailure(response.data,restaurant_type,params));
      }
    });
  }
}
export const setSearchTerm = (query,restaurant_type)=>(dispatch,getState)=> {
  const Restaurants = getState().restaurants[RESTAURANT_TYPE.MAIN_RESTAURANTS];
  if(Restaurants.params.search !== query){
    dispatch(searchAction(query));
  }
  //dispatch(getRestaurants(restaurant_type || RESTAURANT_TYPE.MAIN_RESTAURANTS,{search:query}));
}

const shouldFetchRestaurant = (state,nextslug) => {
  /**
   * Check if restaurant  can be fetched.If the restaurant is currently loading
   * it checks if the currently loading restaurant is the requested restaurant.
   * If not loading then it checks if the current rendered restaurant is same as demanded.
   * @TODO
   * Handle error in case multiple requests are in processing
   */
  let activeRestaurant = state.restaurants.activeRestaurant;
  let currentslug = activeRestaurant.loading? activeRestaurant.info.slug:(activeRestaurant.restaurant?activeRestaurant.restaurant.slug:null); 
  return nextslug !== currentslug;
}

export const getRestaurant = (id) => (dispatch,getState) => {

  console.log("entra en getRestaurant");

  if(!id){
      dispatch(fetchRestaurantFailure('No Id provided',id));
      return;
  }
  if(!shouldFetchRestaurant(getState(),id)) return Promise.resolve();
  dispatch(fetchRestaurant(id));
  return requestRestaurant(id).then((response)=>{
    if(!response.error){
      dispatch(fetchRestaurantSuccess(response.data));
    }
    else{
      dispatch(fetchRestaurantFailure(response.data,id));
    }
  });
}

