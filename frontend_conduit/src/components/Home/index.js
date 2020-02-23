import React from "react";
import Restaurants from "./Restaurants";
import Favorites from "./Favorites";
import agent from "../../agent";
import { connect } from "react-redux";
import {
  HOME_PAGE_LOADED,
} from "../../constants/actionTypes";

const Promise = global.Promise;

const mapStateToProps = state => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: HOME_PAGE_LOADED, payload }),
});

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.props.onLoad(Promise.all([agent.Restaurants.getAll()]));
    
  }

  render() {
    return (
      <div className="home-page">
        <div className="container page">
              <div>
                <h2>RESTAURANTS LIST</h2>
                <Restaurants restaurants={this.props.restaurants} />
                <h2>FAVORITE RESTAURANTS</h2>
                <Favorites/>
              </div>
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
