import Banner from "./Banner";
//import MainView from './MainView';
import React from "react";
import Restaurants from "./Restaurants";
import agent from "../../agent";
import { connect } from "react-redux";
import {
  HOME_PAGE_LOADED,
  //LOGIN
  // HOME_PAGE_UNLOADED,
  //APPLY_TAG_FILTER
} from "../../constants/actionTypes";

const Promise = global.Promise;

const mapStateToProps = state => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  // onClickTag: (tag, pager, payload) =>
  //   dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload }),
  onLoad: payload => dispatch({ type: HOME_PAGE_LOADED, payload }),
 // onLogin: datos => dispatch({ type: LOGIN, payload: datos })
  // onUnload: () =>
  //   dispatch({  type: HOME_PAGE_UNLOADED })
});

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.props.onLoad(Promise.all([agent.Restaurants.getAll()]));
    //this.props.onLogin(Promise.all([agent.UserData.get()]));
  }

  //componentWillMount() {
  //  const tab = this.props.token ? 'feed' : 'all';
  // const articlesPromise = this.props.token ?
  //   agent.Articles.feed :
  //   agent.Articles.all;

  // this.props.onLoad(tab, articlesPromise, Promise.all([agent.Tags.getAll(), articlesPromise()]));
  //     this.props.onLoad(Promise.all([agent.Restaurants.getAll()]));
  // }

  // componentWillUnmount() {
  //   this.props.onUnload();
  // }

  render() {




    return (
      <div className="home-page">
        <Banner token={this.props.token} appName={this.props.appName} />

        <div className="container page">
          <div className="row">
            {/* <MainView /> */}

            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Restaurants</p>

                {/* <Restaurants
                  restaurants={this.props.restaurants}
                  onClickRestaurant={this.props.onClickRestaurant} /> */}

                <Restaurants restaurants={this.props.restaurants} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
