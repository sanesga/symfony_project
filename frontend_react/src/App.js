import React, { Component } from "react";
import { Header } from "./components/Header";
import { RestaurantsList } from "./components/RestaurantsList";
import { Route, Switch , Link } from "react-router-dom";
import { RestaurantDetail } from "./components/RestaurantDetail";

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Link to="/restaurantsList">Restaurant's list</Link>

        <Switch>
          <Route exact path="/restaurantsList" component={RestaurantsList} />
          <Route exact path="/restaurant/:id" component={RestaurantDetail} />
        </Switch>
      </div>
    );
  }
}

export default App;
