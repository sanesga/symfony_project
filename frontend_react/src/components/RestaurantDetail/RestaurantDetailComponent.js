import React, { Component } from 'react';

class RestaurantDetail extends Component{
  componentWillMount(){
    this.props.fetchRestaurant();
  }
  componentWillReceiveProps(newprop){
    let nextslug = newprop.match.params.slug;
    this.props.fetchRestaurant(nextslug);
  }
  renderRestaurant(restaurant,loading,error){
    return (
      <div key={restaurant.id} className="featured">
          <div className="top-image-con">
              <img alt={restaurant.title} src={restaurant.featured_image} />
          </div>
         <h3>{restaurant.title}</h3>
          <span>Thursday, September 18th, 2014</span>
          <p>{restaurant.content}</p>
      </div>
    );
  }

  renderLoading(){
    return <h1>Loading....</h1>
  }
  renderError(error){
    return <h1>{error}</h1>
  }
  render(){
    const { restaurant,loading,error } = this.props.activeRestaurant;
    return (
      <div className="row">
        <div className="col-md-12">
          { !loading && !error && restaurant && this.renderRestaurant(restaurant,loading,error)}
          { loading && this.renderLoading()}
          { error && this.renderError(error)}
        </div>
      </div>
    )
  }
}

export default RestaurantDetail;

