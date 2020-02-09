import React from "react";
import { connect } from 'react-redux';
import { GET_USER_DATA } from "../constants/actionTypes";
import agent from '../agent';
//import Login from '../components/Login';


const mapStateToProps = (state) => {
   // userData: state.userData.data
   console.log("estamos en mapstatetoprops");
   console.log(state);
  return {
    userData: state.userData.data
  }; 
}
 
 const mapDispatchToProps = dispatch => ({
  onLoad: (payload) =>
    dispatch({ type: GET_USER_DATA, payload })
});


class SuccessLogin extends React.Component {

  //component will mount el sustituim per el constructor
  constructor (props){
    super(props);
    this.props.onLoad(Promise.all([agent.UserData.get()]));
  }

  
  //el component will receive props el sustituim per este mètode
  // shouldComponentUpdate(nextProps){
  //  // this.props.getUserData();
  // }
  
  render() {

if(!this.props.userData){
return false;
}else{
  console.log("DATOS DEL USUARIO");
  console.log(this.props.userData);
}
  
   return (
        <div className="auth-page">
          <p>Se ha hecho login con éxito</p>
           {/* <Login userData={this.props.userData}></Login>  */}
           <p>{this.props.userData.email}</p>
           {/* <p>{this.props.userData}</p>   */}

 
           {/* {this.props.userData.map(userData => (
            <div key={userData.email}>
                <p>{userData.email}</p>
            </div>
          ))}   */}
        </div>
      );



    // if(!this.props.userData){
    //   return null;
    // }else{
    //   console.log("DATOS DEL USUARIO");
    //   console.log(this.props.userData);
    //   return (
    //     <div className="auth-page">
    //       <p>Se ha hecho login con éxito</p>
    //       {/* <Login userData={this.props.userData}></Login> */}
    //        {/* <p>{this.props.userData.email}</p>
    //       <p>{this.props.userData.token}</p>  */}
    //       {/* {this.props.userData.map(userData => (
    //         <div key={userData.email}>
    //             <p>{userData.email}</p>
    //         </div>
    //       ))} */}
    //     </div>
    //   );
    // }

  
  }
}

//export default SuccessLogin;
export default connect(mapStateToProps,mapDispatchToProps)(SuccessLogin);


