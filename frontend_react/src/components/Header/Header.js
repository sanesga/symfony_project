import React, { Component } from 'react';
// import SearchBar from './SearchComponent';

class Header extends Component{
  render(){
    return (
      <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
          {/* <a className="navbar-brand" href="">My Blog</a>
          <div className="col-md-6 offset-md-3">
            <SearchBar />
          </div> */}
          <p>RESTAURANTS</p>
      </nav>
    );
  }
}
export default Header

