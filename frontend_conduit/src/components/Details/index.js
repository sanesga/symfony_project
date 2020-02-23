import React from "react";
import agent from "../../agent";
import { connect } from "react-redux";
import {
  RESTAURANT_DETAIL,
  RESTAURANT_FAVORITED,
  RESTAURANT_UNFAVORITED
} from "../../constants/actionTypes";

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
    if (restaurant.favorited) {
      this.props.unfavorite(restaurant.id);
    } else {
      this.props.favorite(restaurant.id);
    }
  }

  render() {
    if (!this.props.restaurant) {
      return null;
    }

    return (
      <div>
        <div className="home-page">
          <div className="container page">
            <h2>MORE INFO</h2>
            <div className="more-info">
              <p>
                <span>Name:</span> {this.props.restaurant.name}
              </p>
              <p>
                <span>Address:</span> {this.props.restaurant.address}
              </p>
              <p>
                <span>Category:</span> {this.props.restaurant.category}
              </p>
              <p>
                <span>Phone:</span> {this.props.restaurant.phone}
              </p>
              {(() => {
                switch (this.props.restaurant.favorited) {
                  case true:
                    return (
                      <button
                        className="btn btn-warning"
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
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Restaurant);
