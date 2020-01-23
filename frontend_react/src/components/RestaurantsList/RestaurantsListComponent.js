import React, { Component } from "react";
import { Link } from "react-router-dom";

class RestaurantsList extends Component{
  componentWillMount(){
    this.props.fetchRestaurants();
  }
  componentWillReceiveProps(){
    this.props.fetchRestaurants();
  }
  renderRestaurants(restaurants){
    if (restaurants !== undefined) {
    return restaurants.map((restaurant)=>{
      return (
        <div key={restaurant.id} className="row list-item">
            <h3>{restaurant.name}</h3>
            <Link to={"/restaurant/"+restaurant.id}><button className="volver">Details</button></Link>
        </div>
      )
    })
  }
  }

  


  render(){
    const { restaurants } =  this.props.restaurantsList.restaurants;
    return(
      <div className="container">
          <p><strong>Restaurant's List</strong></p>
          <div className="col-md-12">
          { this.renderRestaurants(restaurants)}
          </div>
      </div>
    );
  }
}

export default RestaurantsList;
