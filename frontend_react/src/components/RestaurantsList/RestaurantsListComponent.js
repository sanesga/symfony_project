import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
//import { RestaurantDetail } from '../RestaurantDetail'

class RestaurantsList extends Component {
  //el constructor hace los dos métodos siguientes
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     restaurants: [this.props.restaurantsList.restaurants]
  //   };
  // }
  componentWillMount() {
    this.props.fetchRestaurants();
  }
  componentWillReceiveProps() {
    this.props.fetchRestaurants();
  }

  render() {
    const { restaurants } = this.props.restaurantsList.restaurants;
    if (restaurants !== undefined) {
      return (
        <div>
          <p>
            <strong>Restaurant's List</strong>
          </p>
          {restaurants.map(restaurant => {
            return (
              <li key={restaurant.name}>
                <span>{restaurant.name}</span>
                <button className="detalles">
                <Link to={`/restaurant/${restaurant.id}/`}>Detaills</Link>
                </button>
              </li>
            );
          })}
        </div>
      );
    } else {
      return (
        <div>
          <p>No hay restaurantes registrados</p>
        </div>
      );
    }
  }
}

export default RestaurantsList;
