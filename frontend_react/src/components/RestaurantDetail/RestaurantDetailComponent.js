import React, { Component } from "react";

class RestaurantDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialArray: []
    };
  }

  componentWillMount() {
    this.props.fetchRestaurant();
  }
  componentWillReceiveProps(newprop) {
    if (this.props.activeRestaurant.restaurant != null) {
      //console.log(this.props.activeRestaurant.restaurant);
      var restaurant = this.props.activeRestaurant.restaurant;
      // console.log(restaurant.name);
      // console.log(typeof restaurant);

      var array = [];
      array.push(restaurant.name);
      array.push(restaurant.address);
      array.push(restaurant.category);
      array.push(restaurant.phone);

      //console.log(array);

      // console.log(typeof(array));

      this.setState({
        initialArray: array
      });
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <p>RESTAURANT DETAILS</p>
          {/* {this.props.activeRestaurant !== null && 
           <p>{this.props.activeRestaurant}</p> 
          } */}
          {/* { !loading && !error && restaurant && this.renderRestaurants(restaurant,loading,error)}
          { loading && this.renderLoading()}
          { error && this.renderError(error)} */}

          {this.state.initialArray.map(a => (
            <li key={a}>{a}</li>
          ))}
        </div>
      </div>
    );
  }
}

export default RestaurantDetail;
