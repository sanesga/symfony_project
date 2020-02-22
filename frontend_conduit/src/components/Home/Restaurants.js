import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// const FAVORITED_CLASS = "btn btn-sm btn-primary";
// const NOT_FAVORITED_CLASS = "btn btn-sm btn-outline-primary";

const mapDispatchToProps = dispatch => ({

});

const Restaurants = props => {
  if (!props.restaurants) {
    return "loading";
  }
  const restaurants = props.restaurants;
  // const favoriteButtonClass = tags.favorited ?
  //   FAVORITED_CLASS :
  //   NOT_FAVORITED_CLASS;


  // const handleClick = ev => {
  //   ev.preventDefault();
  //   // if (restaurant.favorited) {
  //   //   props.unfavorite(tag.id);
  //   // } else {
  //   //   props.favorite(tag.id);
  //   // }
  //  // console.log("click");
  //  props.favorite(tag);
  // };

  if (props.restaurants) {
     //console.log("RESTAURANTS", restaurants);
    return (
      <div>
        {restaurants.map(restaurant => {
          // const handleClick = ev => {
          //   ev.preventDefault();
          //   props.onClickTag(tag, page => agent.Articles.byTag(tag, page), agent.Articles.byTag(tag));
          // };

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
