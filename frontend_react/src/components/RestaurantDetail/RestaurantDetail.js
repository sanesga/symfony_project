import { connect } from 'react-redux';
import RestaurantDetailComponent from './RestaurantDetailComponent';
import { getRestaurant } from '../../store/Restaurants/actions'; 

console.log("entra en restaurantDetail");

const mapStateToProps = (state,props) => {
  return {
    activeRestaurant : state.restaurants.activeRestaurant,
  };
}
const mapDispatchToProps = (dispatch,props) => {
  return {
    fetchRestaurant: (id)=>{
      id = id || props.match.params.id;
      dispatch(getRestaurant(id));
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(RestaurantDetailComponent);
