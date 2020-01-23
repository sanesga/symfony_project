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
export const fetchRestaurant = (id)=>{
  return {
    type:FETCH_RESTAURANT,
    id
  }
}

export const fetchRestaurantSuccess = (restaurant)=>{
 // console.log("estamos en action en fetchRestaurantSucces");
 // console.log(restaurant);
  return {
    type: FETCH_RESTAURANT_SUCCESS,
    payload:restaurant,
  }
}

export const fetchRestaurantFailure = (error,id)=>{
  return{
    type : FETCH_RESTAURANT_FAILURE,
    payload:error,
    id
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
     // console.log(params);

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

const shouldFetchRestaurant = (state,nextid) => {

 // console.log("entra a shouldFetchRestaurant");
  /**
   * Check if restaurant  can be fetched.If the restaurant is currently loading
   * it checks if the currently loading restaurant is the requested restaurant.
   * If not loading then it checks if the current rendered restaurant is same as demanded.
   * @TODO
   * Handle error in case multiple requests are in processing
   */
  let activeRestaurant = state.restaurants.activeRestaurant;
 // console.log("recibimos el activeRestaurant");
 // console.log(activeRestaurant);
  let currentid = activeRestaurant.loading? activeRestaurant.info.id:(activeRestaurant.restaurant?activeRestaurant.restaurant.id:null); 
  return nextid !== currentid;
}

export const getRestaurant = (id) => (dispatch,getState) => {

  //console.log("entra al get restaurant");
  // if(!id){
  //     dispatch(fetchRestaurantFailure('No id provided',id));
  //     return;
  // }
  if(!shouldFetchRestaurant(getState(),id)) return Promise.resolve();

  dispatch(fetchRestaurant(id));

  return requestRestaurant(id).then((response)=>{
   // console.log("respuesta desde getRestaurant en el ACTION");
  //  console.log(response.data.data[0]);

    if(!response.error){
   //   console.log("entra a restaurant succes desde el action");

      dispatch(fetchRestaurantSuccess(response.data.data[0]));
    }
    else{
      dispatch(fetchRestaurantFailure(response.data,id));
    }
  });
}


