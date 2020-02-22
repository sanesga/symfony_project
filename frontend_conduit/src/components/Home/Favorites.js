
import React from "react";
import agent from "../../agent";
import { connect } from "react-redux";
import {
  GET_FAVORITES,
} from "../../constants/actionTypes";
import { Link } from "react-router-dom";

const Promise = global.Promise;

const mapStateToProps = state => {
  console.log("favorites", state.home.favorites);
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
            <p>Log in for watching your favorite restaurants.</p>
        </div>
      );
    }
   // console.log("render",this.props.favorites);
    return (
      <div>
        {this.props.favorites.map(favorite => {
        return (
          <div key={favorite.id}>
            <Link to={`/restaurant/${favorite.id}`}>
              <h3>{favorite.name} </h3>
            </Link>

            <p>{favorite.address}</p>
            <br></br>
            <br></br>
          </div>
        );
      })}
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
