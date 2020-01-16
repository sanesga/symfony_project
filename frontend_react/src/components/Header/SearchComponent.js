import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setSearchTerm,RESTAURANT_TYPE } from '../../store/Restaurants/actions'

class SearchBar extends Component{
  constructor(props){
    super(props);
    this.state = {
      query:''
    }
  }
  handleSearchChange(e){
    this.setState({query:e.target.value});
  }
  handleSearch(e){
    console.log(this.props.router);
    e.preventDefault()
    this.props.setSearchTerm(this.state.query);
  }
  render(){
    return (
      <form className="input-group">
          <input className="form-control" name="search" placeholder="Search Here"  onChange={this.handleSearchChange.bind(this)} autoComplete="off" autoFocus="autofocus" type="text" />
          <div className="input-group-btn">
              <button className="btn btn-outline-success" onClick={this.handleSearch.bind(this)} type="submit">Search</button>
          </div>
      </form>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    search : state.restaurants[RESTAURANT_TYPE.MAIN_RESTAURANTS].params.search
  }
}
const mapDispatchToProps = (dispatch) =>{
  return {
    setSearchTerm : (query) => dispatch(setSearchTerm(query,RESTAURANT_TYPE.MAIN_RESTAURANTS))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(SearchBar)
