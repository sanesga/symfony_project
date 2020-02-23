import React from "react";
import { connect } from 'react-redux';
import { GET_USER_DATA, LOGIN } from "../constants/actionTypes";
//import { GET_USER_DATA } from "../constants/actionTypes";
import agent from '../agent';
import { Redirect } from 'react-router-dom'
//import Login from '../components/Login';


const mapStateToProps = (state) => {
  return {
    //userData: state.userData.data
    //cogemos el user data de local storage (lo hemos guardado al hacer login)
    userData: JSON.parse(localStorage.getItem('user_data'))
  }; 
}
 
 const mapDispatchToProps = dispatch => ({
  onLoad: (payload) =>
    dispatch({ type: GET_USER_DATA, payload }),
   onLogin: (datos) =>
     dispatch({ type: LOGIN, payload: datos })
});


class SuccessLogin extends React.Component {

  //component will mount el sustituim per el constructor
  constructor (props){
    super(props);
    this.props.onLoad(Promise.all([agent.UserData.get()]));
    this.props.onLogin(Promise.all([agent.UserData.get()]));
   //var userData= Promise.all([agent.UserData.get()]);
 

  
  }

  
  //el component will receive props el sustituim per este mètode
  // shouldComponentUpdate(nextProps){
  //  // this.props.getUserData();
  // }
  
  render() {

if(!this.props.userData){
return false;
}
 

  
   return (
        <div className="auth-page">
         
           {/* <Login userData={this.props.userData}></Login>  */}
           {/* <p>{this.props.userData.email}</p>
          <p>{this.props.userData.token}</p>    */}

 
           {/* {this.props.userData.map(userData => (
            <div key={userData.email}>
                <p>{userData.email}</p>
            </div>
          ))}   */}
       <Redirect to='/'></Redirect>
        </div>
      );



    // if(!this.props.userData){
    //   return null;
    // }else{
  
    //   return (
    //     <div className="auth-page">
    //       <p>Se ha hecho login con éxito</p>
    //       {/* <Login userData={this.props.userData}></Login> */}
    //        {/* <p>{this.props.userData.email}</p>
    //       <p>{this.props.userData.token}</p>  */}


    //        {this.props.userData.map(userData => (
    //         <div key={userData.email}>
    //             <p>{userData.email}</p>
    //         </div>
    //       ))} 
    //     </div>
    //   );
    // }

  
  }
}

//export default SuccessLogin;
export default connect(mapStateToProps,mapDispatchToProps)(SuccessLogin);


