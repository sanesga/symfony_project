export const RESTAURANT_TYPE = {
  MAIN_RESTAURANTS:'mainRestaurants',
  RELATED_RESTAURANTS:'relatedRestaurants',
  FEATURED_RESTAURANTS : 'featuredRestaurants'
}

export const FETCH_RESTAURANTS = 'FETCH_RESTAURANTS';
export const FETCH_RESTAURANTS_SUCCESS = 'FETCH_RESTAURANTS_SUCCESS';
export const FETCH_RESTAURANTS_FAILURE = 'FETCH_RESTAURANTS_FAILURE';

export const FETCH_RESTAURANT = 'FETCH_RESTAURANT';
export const FETCH_RESTAURANT_SUCCESS = 'FETCH_RESTAURANT_SUCCESS';
export const FETCH_RESTAURANT_FAILURE = 'FETCH_RESTAURANT_FAILURE';

export const SEARCH = 'SEARCH';

const INITIAL_STATE = {
  activeRestaurant:{
    loading:false,
    restaurant:null,
    error:null,
    //holds current state information.e.g If it is in loading state
    //it holds the info of id being loaded.
    //It may hold the ajax promise in case cancellation is required
    info:{}
  },
  searchActive:false,
  mainRestaurants:{
    //current filters of the component
    params:{
      search:'',
    },
    //restaurants currently displayed
    restaurants:[],
    error:null,
    loading:false,
    //next parameters set by different filters
    //This parameter is reset to empty whenever a call is made
    nextparams:{
    },
    //boolean value set to schedule a request.
    //Initially it always has to make the call
    makecall:true
  },
  relatedRestaurants:{
    params:{
      ordering:'-modified_at',
      limit : 4
    },
    restaurants:[],
    error:null,
    loading:false,
  },
  featuredRestaurants:{
    params:{
      limit:1
    },
    restaurants:[],
    error:null,
    loading:false
  }
}
export default function(state=INITIAL_STATE,action){
  switch(action.type){
    case FETCH_RESTAURANTS:
      //Before starting a fetch nextparams and makecall are reset which 
      //is again changed by other events like search,change filter etc.
      /** --State Info--
       *  Empty Post
       *  Clear Error
       *  Set Loading to true
       *  Set makecall to false
       *  Reset nextparams
       */
      return { ...state,[action.restaurant_type]:{restaurants:[],error:null,loading:true,params:{},makecall:false,nextparams:{}}}
    case FETCH_RESTAURANTS_SUCCESS:
      /**
       * --State Info--
       *  Set restaurants to fetched restaurants
       *  Set Loading to false
       *  Clear Error
       *  Set params to fetched params
       */
      let params = action.params || {}; 
      return { ...state,[action.restaurant_type]:{restaurants:action.payload,error:null,loading:false,params:params}};
    case FETCH_RESTAURANTS_FAILURE:
      /**
       * --State Info--
       *  Set restaurants to []
       *  Set Loading to false
       *  Set Error
       *  Set params to empty
       */
      return { ...state,[action.restaurant_type]:{restaurants:[],error:action.payload,loading:false},params:{}};
    case SEARCH:
    // When SEARCH Action is dipatched then main restaurants are marked for refetch
    // This action can be divided into SET_SEARCH and SEARCH if other filters are present
    /**
     * --State Info --
     *  populate nextparams.search
     *  set makecall to true
     *
     */
      return { ...state,searchActive:action.state,[action.restaurant_type]:{...state[action.restaurant_type],nextparams:{search:action.search},makecall:true}}

    /**
     *--State Info--
     * Almost same as restaurants
     *
     */
    case FETCH_RESTAURANT:
      //console.log("---------------------------ESTA ENTRANDO A FETCH RESTAURANT-----------------------")
      return {...state,activeRestaurant:{restaurant:null,loading:true,error:null,id:null,info:{id:action.id}}};
    case FETCH_RESTAURANT_SUCCESS:
     // console.log("estamos en fetch restaurant SUCCES");
     // console.log(action.payload);
     // console.log("ESTE ES EL ACTIVE RESTAURANT***************");
    //  console.log({ ...state,activeRestaurant:{restaurant:action.payload,loading:false,error:null,info:{}}});
      return { ...state,activeRestaurant:{restaurant:action.payload,loading:false,error:null,info:{}}};
    case FETCH_RESTAURANT_FAILURE:
     // console.log("estamos en fetch restaurant failure");
      return { ...state,activeRestaurant:{restaurant:null,loading:false,error:action.payload,info:{}}}

    default:
      return state;
    }
}
