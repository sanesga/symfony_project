import React, { Component } from 'react';

class RestaurantDetail extends Component{


  componentWillMount(){
    this.props.fetchRestaurant();
  }
  componentWillReceiveProps(newprop){
    let nextid = newprop.match.params.id;
    this.props.fetchRestaurant(nextid);
  }
  renderRestaurants(restaurant,loading,error){
    return (
      <div>mostrando el restaurante recibido</div>
      // <div key={restaurant.id} className="featured">
      //     <div className="top-image-con">
      //         <img alt={restaurant.title} src={restaurant.featured_image} />
      //     </div>
      //    <h3>{restaurant.title}</h3>
      //     <span>Thursday, September 18th, 2014</span>
      //     <p>{restaurant.content}</p>
      // </div>
    );
  }

  renderLoading(){
    return <h1>Loading....</h1>
  }
  renderError(error){
    return <h1>{error}</h1>
  }
  render(){
    console.log("entra a restaurant detail component");
    const { restaurant,loading,error } = this.props.activeRestaurant;
    return (
      <div className="row">
        <div className="col-md-12">
          { !loading && !error && restaurant && this.renderRestaurants(restaurant,loading,error)}
          { loading && this.renderLoading()}
          { error && this.renderError(error)}
        </div>
      </div>
    )
  }
}

export default RestaurantDetail;

