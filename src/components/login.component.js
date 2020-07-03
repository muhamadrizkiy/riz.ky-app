import React, { Component } from "react";
import DataService from "../services/data.service";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Alert from 'react-bootstrap/Alert'

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername= this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.login = this.login.bind(this);

    this.state = {
      id: null,
      username: "",
      password: "", 
      submitted: false,
      isError: false
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  login() {
    var data = {
      username: this.state.username,
      password: this.state.password
    };

    DataService.login(data)
      .then(response => {
        this.setState({
          username: response.data.username,
          password: response.data.password,
          submitted: true
        })
        localStorage.setItem('token', response.data.data.id)

        DataService.getUser(response.data.data.userId).then(userData => {
          localStorage.setItem('usr', userData.data.data.username)
          localStorage.setItem('email', userData.data.data.email)
        })
        this.props.history.replace('/dashboard')
        window.location.reload();
      })
      .catch(e => {
        this.setState({ isError : true})
        console.log(e);
      });
  }


  render() {
    return (
      <div className="submit-form">
        {this.state.isError ? (
          <div>

            <div>
              <label className="login-header">Log in</label>
            </div>
            <div>
              <label className="account-header">Don't have an account? 
                <Link to={"/signup"}>
                  <span className="register-span"> Sign up</span>
                </Link>
              </label>
            </div>
            <Alert variant="danger">
              <Alert.Heading>Login Failed!</Alert.Heading>
              <hr />
              <p className="mb-0">
                Wrong credential or missing access right to application. Please Try again.
              </p>
            </Alert>

            <div className="form-group fixed-center">
              <label htmlFor="title">Username</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.username}
                onChange={this.onChangeUsername}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Password</label>
              <input
                type="password"
                className="form-control"
                id="description"
                required
                value={this.state.password}
                onChange={this.onChangePassword}
                name="description"
              />
            </div>

            <button onClick={this.login} className="btn btn-success btn-login">
              Log in
            </button>
          </div>
        ) : (
          <div>

            <div>
              <label className="login-header">Log in</label>
            </div>
            <div>
              <label className="account-header">Don't have an account? 
                <Link to={"/signup"}>
                  <span className="register-span"> Sign up</span>
                </Link>
              </label>
            </div>

            <div className="form-group fixed-center">
              <label htmlFor="title">Username</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.username}
                onChange={this.onChangeUsername}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Password</label>
              <input
                type="password"
                className="form-control"
                id="description"
                required
                value={this.state.password}
                onChange={this.onChangePassword}
                name="description"
              />
            </div>

            <button onClick={this.login} className="btn btn-success btn-login">
              Log in
            </button>
          </div>
        )}
      </div>
    );
  }
}
