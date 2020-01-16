import React, { Component } from 'react';
import './SideNav.css';

class SideNav extends Component{
  render(){
    return(
      <div className="col-md-3 col-xs-1 p-l-0 p-r-0" id="sidebar">
          <div className="list-group panel">
              <a href="" className="list-group-item" ><i className="fa fa-film"></i> <span className="hidden-sm-down">Item 2</span></a>
              <a href="" className="list-group-item" ><i className="fa fa-film"></i> <span className="hidden-sm-down">Item 2</span></a>
              <a href="" className="list-group-item" ><i className="fa fa-film"></i> <span className="hidden-sm-down">Item 2</span></a>
              <a href="" className="list-group-item" ><i className="fa fa-film"></i> <span className="hidden-sm-down">Item 2</span></a>
          </div>
      </div>
    );
  }
}

export default SideNav;

