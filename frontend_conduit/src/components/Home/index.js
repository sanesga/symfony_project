import Banner from "./Banner";
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
        <Banner token={this.props.token} appName={this.props.appName} />

        <div className="container page">
          <div className="row">
          
            <div className="col-md-3">
              <div className="sidebar">
                <p>RESTAURANTS LIST</p>
                <Restaurants restaurants={this.props.restaurants} />
                <p>FAVORITE RESTAURANTS</p>
                <Favorites/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
