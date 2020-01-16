import { connect } from 'react-redux';
import RestaurantDetailComponent from './RestaurantDetailComponent';
import { getRestaurant } from '../../store/Restaurants/actions'; 
const mapStateToProps = (state,props) => {
  return {
    activeRestaurant : state.restaurants.activeRestaurant,
  };
}
const mapDispatchToProps = (dispatch,props) => {
  return {
    fetchRestaurant: (slug)=>{
      slug = slug || props.match.params.slug;
      dispatch(getRestaurant(slug));
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(RestaurantDetailComponent);
