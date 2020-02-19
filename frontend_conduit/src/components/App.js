import agent from '../agent';
import Header from './Header';
import React from 'react';
import { connect } from 'react-redux';
import { APP_LOAD, REDIRECT } from '../constants/actionTypes';
import { Route, Switch, withRouter } from 'react-router-dom';
import Article from '../components/Article';
import Editor from '../components/Editor';
import Home from '../components/Home';
import Login from '../components/Login';
import Profile from '../components/Profile';
import ProfileFavorites from '../components/ProfileFavorites';
import Register from '../components/Register';
import Settings from '../components/Settings';
import { store } from '../store';
import { push } from 'react-router-redux';

import LoginBackend from '../components/LoginBackend';
import SuccessLogin from '../components/SuccessLogin';

const mapStateToProps = state => {
  //console.log("state",state);
  
  return {
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    currentUser: JSON.parse(localStorage.getItem('user_data')),
    //currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo
    //redirectTo: "/"
  }};

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
  onRedirect: () =>
    dispatch({ type: REDIRECT })
});

class App extends React.Component {

  constructor (props){
    super(props);

    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);
    }
    this.props.onLoad(token ? agent.Auth.current() : null, token);
    
  }

   componentDidUpdate(nextProps){
     //console.log("nextprops",nextProps);
     //console.log("this.props",this.props);

    //console.log("entra  a did update");
    if (this.props.redirectTo) {
      //console.log("entra al if");
      try {
        store.dispatch(push(this.props.redirectTo));
       // this.props.onRedirect();
    } finally {
       // console.log('on redirect');
        this.props.onRedirect();
    }
      
      // this.context.router.replace(nextProps.redirectTo);
     
    }
  }

//   shouldComponentUpdate(nextProps){
//     if (nextProps.redirectTo && nextProps.redirectTo !== this.props.location.pathname) {
//       console.log("entra al if");
//         try {
//             this.props.history.push(nextProps.redirectTo);
//             console.log("fasdf");
//             return true;
//         } finally {
//             console.log('on redirect');
//             //this.props.onRedirect();
//         }
//     }
//     return false;
// }
  
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.redirectTo) {
  //     // this.context.router.replace(nextProps.redirectTo);
  //     store.dispatch(push(nextProps.redirectTo));
  //     this.props.onRedirect();
  //   }
  // }

  // componentWillMount() {
  //   const token = window.localStorage.getItem('jwt');
  //   if (token) {
  //     agent.setToken(token);
  //   }

  //   this.props.onLoad(token ? agent.Auth.current() : null, token);
  // }

  render() {
    if (this.props.appLoaded) {
      return (
        <div>
          <Header
            appName={this.props.appName}
            currentUser={this.props.currentUser} />
            <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/editor/:slug" component={Editor} />
            <Route path="/editor" component={Editor} />
            <Route path="/article/:id" component={Article} />
            <Route path="/settings" component={Settings} />
            <Route path="/@:username/favorites" component={ProfileFavorites} />
            <Route path="/@:username" component={Profile} />

            <Route path="/loginBackend" component={LoginBackend} />
            <Route path="/successLogin" component={SuccessLogin} />
            </Switch>
        </div>
      );
    }
    return (
      <div>
        <Header
          appName={this.props.appName}
          currentUser={this.props.currentUser} />
      </div>
    );
  }
}

// App.contextTypes = {
//   router: PropTypes.object.isRequired
// };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
