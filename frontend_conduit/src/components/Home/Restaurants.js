import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const mapDispatchToProps = dispatch => ({});

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
            <div className="card"key={restaurant.id} >
              <div className="card-header">{restaurant.name} </div>
              <div className="card-body">
                <p className="card-text">
                {restaurant.address}
                </p>
                <Link to={`/restaurant/${restaurant.id}`}>
                <button className="btn btn-warning">More info</button>
               </Link>
              </div>
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
