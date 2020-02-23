import React from "react";
import agent from "../agent";
import { connect } from "react-redux";
import {
  SETTINGS_SAVED,
  SETTINGS_PAGE_UNLOADED,
  LOGOUT,
} from "../constants/actionTypes";


const mapStateToProps = state => {
  console.log(state);
  return {
    ...state.settings,
    currentUser: state.common.currentUser,
  };
};

const mapDispatchToProps = dispatch => ({
  onClickLogout: () =>
    dispatch({
      type: LOGOUT,
      payload: agent.Auth.logout()
    }),
  onSubmitForm: user =>
    dispatch({ type: SETTINGS_SAVED, payload: agent.Auth.save(user) }),
  onUnload: () => dispatch({ type: SETTINGS_PAGE_UNLOADED }),
  onSubmit: (email) => {
    agent.UserData.updateUserData(email);
    dispatch({
      type: LOGOUT,
      payload: agent.Auth.logout()
    })
  },
});

class Settings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: ''
      };

      this.guardar = this.guardar.bind(this);
      this.updateUserData = this.updateUserData.bind(this);

  }

  updateUserData(ev) {
    var email = this.state.email;
    this.props.onSubmit(email);
  }
 
  guardar(ev) {
    this.setState({
      email: ev.target.value 
    });
  }

  render() {
    if (localStorage.getItem("user_data")) {
      const currentUser = JSON.parse(localStorage.getItem("user_data"));
      return (
        <div className="settings-page">
          <div className="container page">
            <h2 className="settings-title ">Your Settings</h2>
            <fieldset className="form-group">
              <label className="settings-email">Email:</label>
              <input
                className="form-control form-control-lg"
                name="email"
                type="email"
                placeholder={currentUser.email}
                onChange={this.guardar}
              />
            </fieldset>

            <div className="settings-buttons">
              <button
                className="btn-logout btn btn-danger"
                onClick={this.props.onClickLogout}
              >
                Logout
              </button>
              <button className="btn btn-warning" onClick={this.updateUserData}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
