
import React from "react";
import agent from "../../agent";
import { connect } from "react-redux";
import {
  GET_FAVORITES,
} from "../../constants/actionTypes";
import { Link } from "react-router-dom";

const Promise = global.Promise;

const mapStateToProps = state => {
  return{
    ...state,
     favorites:state.home.favorites
  }};

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: GET_FAVORITES, payload }),
});

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.props.onLoad(Promise.all([agent.Restaurants.getFavorites()]));
  }

  render() {
    if(!this.props.favorites){
      return false;
      }
    if(this.props.favorites.length===0){
      return(
        <div>
            <p><i>You don't have any favorite restaurant added.</i></p>
        </div>
      );
    }
    return (
      <div>
        {this.props.favorites.map(favorite => {
         return (
          <div className="card"key={favorite.id} >
            <div className="card-header">{favorite.name} </div>
            <div className="card-body">
              <p className="card-text">
              {favorite.address}
              </p>
              <Link to={`/restaurant/${favorite.id}`}>
              <button className="btn btn-warning">More info</button>
             </Link>
            </div>
          </div>
        );
      })}
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
