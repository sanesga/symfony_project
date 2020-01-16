import React, { Component } from "react";
//import {Link} from 'react-router-dom';

class RestaurantsList extends Component {

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
  // renderRestaurants(restaurants){
  //   return restaurants.map((restaurants)=>{
  //     return (
  //       <div key={restaurants.id} className="row list-item">
  //           <h3>{restaurants.title}</h3>
  //           <p>{restaurants.description}
  //           <Link to={`/${restaurants.slug}/`}>Read More</Link></p>
  //       </div>
  //     )
  //   })
  // }
  render() {
    const { restaurants } = this.props.restaurantsList.restaurants;
    console.log(restaurants);
   // console.log(this.state.restaurants);

   // var list = [];

    // Object.keys(restaurants).forEach(function(key) {
    //   list.push(restaurants[key]);
    //   console.log(restaurants[key][0]);
    // });

   
    // for (var i in restaurants) {
    //   console.log(restaurants[i]);
    // }

    return (
      <div>
        <p>
          <strong>Restaurant's List</strong>
        </p>

        {/* <div className="col-md-12">
          { this.renderRestaurants(restaurants)}
          </div> */}

        {this.state.restaurants.map(filterItem => {
          return (
            <li key={filterItem}>
              <span>{filterItem}</span>
            </li>
          );
        })}
      </div>
    );
  }
}

export default RestaurantsList;
