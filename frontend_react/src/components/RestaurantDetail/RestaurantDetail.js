import { connect } from "react-redux";
import RestaurantDetailComponent from "./RestaurantDetailComponent";
import { getRestaurant } from "../../store/Restaurants/actions";

const mapStateToProps = (state) => {
  //console.log("entra a mapStateToProps");
  //console.log(state.restaurants.activeRestaurant);

  // if(state.restaurants.activeRestaurant.restaurant!==null){
  //     //console.log("tenemos datos");
  //    // console.log(state.restaurants.activeRestaurant.restaurant);

  // }
  return {
    activeRestaurant : state.restaurants.activeRestaurant,
  }; 
}


const mapDispatchToProps = (dispatch,props) => {
 // console.log("entra al map dispatch to props");
  return {
    fetchRestaurant: (id)=>{
     
      id = id || props.match.params.id;
      dispatch(getRestaurant(id));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantDetailComponent);




