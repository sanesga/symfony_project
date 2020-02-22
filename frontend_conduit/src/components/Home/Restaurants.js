import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const mapDispatchToProps = dispatch => ({
});

const Restaurants = props => {
  if (!props.restaurants) {
    return "loading";
  }
  const restaurants = props.restaurants;

  if (props.restaurants) {
 
    return (
      <div>
        {restaurants.map(restaurant => {
          return (
            <div key={restaurant.id}>
              <Link to={`/restaurant/${restaurant.id}`}>
                <h3>{restaurant.name} </h3>
              </Link>

              <p>{restaurant.address}</p>
              <br></br>
              <br></br>
            </div>
          );
        })}
      </div>
    );
  } else {
    return <div>Loading restaurants...</div>;
  }
};

export default connect(() => ({}), mapDispatchToProps)(Restaurants);
