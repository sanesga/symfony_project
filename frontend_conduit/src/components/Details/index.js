import React from "react";
import agent from "../../agent";
import { connect } from "react-redux";
import { RESTAURANT_DETAIL,  RESTAURANT_FAVORITED,
  RESTAURANT_UNFAVORITED } from "../../constants/actionTypes";

const mapStateToProps = state => ({
  ...state.article,
  restaurant: state.home.restaurant
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: RESTAURANT_DETAIL, payload }),
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

class Restaurant extends React.Component {
  constructor(props) {
    super(props);

    this.props.onLoad(
      Promise.all([agent.Restaurants.get(this.props.match.params.id)])
    );
  }

  cambiarFav(restaurant) {

    //console.log(restaurant.id);

    if (restaurant.favorited) {
      // console.log("si que es favorito");
      // console.log(tag.favorited);
      this.props.unfavorite(restaurant.id);
    } else {
      // console.log("no es favorito");
      // console.log(tag.favorited);
      this.props.favorite(restaurant.id);
    }
   // window.location.reload(); //hi haurà que fer async ComponentDidMount...await ..cridem al método this.props..
  }

  render() {
    if (!this.props.restaurant) {
      return null;
    }

    return (
      <div>
        <p>Name: {this.props.restaurant.name}</p>
        <p>Address: {this.props.restaurant.address}</p>
        <p>Category: {this.props.restaurant.category}</p>
        <p>Phone: {this.props.restaurant.phone}</p>
        {(() => {
          switch (this.props.restaurant.favorited) {
            case true:
              return (
                <button
                  className="btn btn-success"
                  onClick={() => this.cambiarFav(this.props.restaurant)}
                >
                  Favorite
                </button>
              );
            case false:
              return (
                <button
                  className="btn btn-danger"
                  onClick={() => this.cambiarFav(this.props.restaurant)}
                >
                  No favorite
                </button>
              );
            default:
              return false;
          }
        })()}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Restaurant);
