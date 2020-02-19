import { Link } from 'react-router-dom';
import ListErrors from './ListErrors';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import {
  REGISTER,
  REGISTER_PAGE_UNLOADED
} from '../constants/actionTypes';

const mapStateToProps = state => ({
  ...state.auth
});

const mapDispatchToProps = dispatch => ({
  onSubmit: (email, password) => {
    const payload = agent.Auth.register(email, password);
    dispatch({ type: REGISTER, payload })
  },
  onUnload: () =>
  dispatch({ type: REGISTER_PAGE_UNLOADED })
});

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
       password: '' 
      };

    this.guardar = this.guardar.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(ev) {
    ev.preventDefault();
    var email = this.state.email;
    var password = this.state.password;
    this.props.onSubmit(email, password);
  }

  guardar(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {

    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">

            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign Up</h1>
              <p className="text-xs-center">
                <Link to="/login">
                  Have an account?
                </Link>
              </p>

              <ListErrors errors={this.props.errors} />

              <form onSubmit={this.onSubmit}>
                <fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="email"
                      placeholder="Email"
                      // value={this.props.email}
                      onChange={this.guardar}
                      name="email" />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      // value={this.props.password}
                      onChange={this.guardar}
                      name="password" />
                  </fieldset>

                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={this.props.inProgress}>
                    Sign up
                  </button>

                </fieldset>
              </form>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);