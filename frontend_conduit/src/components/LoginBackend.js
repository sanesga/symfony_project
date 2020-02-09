import React from "react";

class LoginBackend extends React.Component {

  render() {
   
    return (
      <div className="auth-page">

        <a style={{backgroundColor: "#64b962", color: "white", borderRadius: "5px", padding:"10px", marginLeft: "10px" }} id="hacer_login" href="http://localhost:8000/login" target="_self">HACER LOGIN</a>
      </div>
    );
  }
}

export default LoginBackend;
