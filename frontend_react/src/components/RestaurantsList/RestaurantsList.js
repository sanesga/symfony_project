import { connect } from 'react-redux';
import RestaurantsListComponent from './RestaurantsListComponent';
import { getRestaurants,RESTAURANT_TYPE } from '../../store/Restaurants/actions'

//console.log("estamos en restaurantslist.js");

const mapStateToProps = (state) => {
 // console.log(state.restaurants[RESTAURANT_TYPE.MAIN_RESTAURANTS]);
  //console.log("entra en mapstatetoprops");

  return {
    restaurantsList : state.restaurants[RESTAURANT_TYPE.MAIN_RESTAURANTS]
  };
}


//ESTE VA AL ACTION DEL STORE -- SERVICE -- REDUCERS I TORNA AL DE DALT
const mapDispatchToProps = (dispatch) => {
  //console.log("entra en map dispatch to props");
  return {
    fetchRestaurants: () => dispatch(getRestaurants(RESTAURANT_TYPE.MAIN_RESTAURANTS)),
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(RestaurantsListComponent);
