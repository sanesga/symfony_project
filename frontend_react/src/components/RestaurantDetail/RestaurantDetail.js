import { connect } from 'react-redux';
import RestaurantDetailComponent from './RestaurantDetailComponent';
import { getRestaurant } from '../../store/Restaurants/actions'; 

console.log("entra a restaurant detail");

const mapStateToProps = (state,props) => {

  console.log("Recibimos el active Restaurant");
  console.log(state.restaurants.activeRestaurant.retaurant);
    return {
      activeRestaurant : state.restaurants.activeRestaurant,
    };
  
}
const mapDispatchToProps = (dispatch,props) => {
  
  console.log("entra a map dispatch to props");
  return {
    fetchRestaurant: (id)=>{
      id = id || props.match.params.id;
      dispatch(getRestaurant(id));
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(RestaurantDetailComponent);