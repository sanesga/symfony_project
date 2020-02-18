import React from "react";
import agent from "../../agent";
import {
  RESTAURANT_FAVORITED,
  RESTAURANT_UNFAVORITED
} from "../../constants/actionTypes";
import { connect } from "react-redux";

// const FAVORITED_CLASS = "btn btn-sm btn-primary";
// const NOT_FAVORITED_CLASS = "btn btn-sm btn-outline-primary";

const mapDispatchToProps = dispatch => ({
  favorite: id =>
    dispatch({
      type: RESTAURANT_FAVORITED,
      payload: agent.Restaurants.favorite(id)
    }),
  unfavorite: id =>
    dispatch({
      type: RESTAURANT_UNFAVORITED,
      payload: agent.Restaurants.unfavorite(id)
    })
});


const Restaurants = props => {
  const restaurants = props.restaurants;
  // const favoriteButtonClass = tags.favorited ?
  //   FAVORITED_CLASS :
  //   NOT_FAVORITED_CLASS;

  function handleClick(restaurant) {
    //console.log(id);
    if (restaurant.favorited) {
      // console.log("si que es favorito");
      // console.log(tag.favorited);
      props.unfavorite(restaurant.id);
    } else {
      // console.log("no es favorito");
      // console.log(tag.favorited);
      props.favorite(restaurant.id);
    }
    window.location.reload(); //hi haurà que fer async ComponentDidMount...await ..cridem al método this.props..
  }


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
  // console.log("TAGS", tags);
    return (
      <div>
        {restaurants.map(restaurant => {
          // const handleClick = ev => {
          //   ev.preventDefault();
          //   props.onClickTag(tag, page => agent.Articles.byTag(tag, page), agent.Articles.byTag(tag));
          // };

          return (
            <div key={restaurant.id}>
              <a href="">
                {restaurant.name}{" "}
              </a>
              <p >{restaurant.address}</p>
              {(() => {
                switch (restaurant.favorited) {
                  case true:
                    return (
                      <button
                        className="btn btn-success"
                        onClick={() => handleClick(restaurant)}
                      >
                       Favorite
                      </button>
                    );
                  case false:
                    return (
                      <button
                        className="btn btn-danger"
                        onClick={() => handleClick(restaurant)}
                      >
                        No favorite
                      </button>
                    );
                    default:
                      return false
                }
              })()}
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

//export default Tags;
export default connect(() => ({}), mapDispatchToProps)(Restaurants);
