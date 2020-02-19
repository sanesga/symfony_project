
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';

import { RESTAURANT_DETAIL } from '../../constants/actionTypes';

const mapStateToProps = state => ({
  ...state.article,
  restaurant: state.home.restaurant
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: RESTAURANT_DETAIL, payload }),
});

class Restaurant extends React.Component {

  constructor (props){
    super(props);

    this.props.onLoad(Promise.all([
      agent.Restaurants.get(this.props.match.params.id),
     
    ]));
  }


  render() {
    if (!this.props.restaurant) {
      return null;
    }

    return (
      <div>
      <p>estamos en details</p>
      <p>{this.props.restaurant.name}</p>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Restaurant);
