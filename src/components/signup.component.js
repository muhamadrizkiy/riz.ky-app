import React, { Component } from "react";
import DataService from "../services/data.service";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername= this.onChangeUsername.bind(this);
    this.onChangeEmail= this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.signup = this.signup.bind(this);

    this.state = {
      id: null,
      username: "",
      email: "",
      password: "", 
      submitted: false
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  signup() {
    var data = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };

    console.log(data)

    DataService.signup(data)
      .then(response => {
        this.setState({
          username: response.data.username,
          email: response.data.email,
          password: response.data.password,
          submitted: true
        });
        console.log(response.data);
        this.props.history.push('/login')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    return (
      <div className="submit-form-signup">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
          </div>
        ) : (
          <div>

            <div>
              <label className="login-header">Sign up</label>
            </div>

            <div className="form-group fixed-center">
              <label htmlFor="title">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                required
                value={this.state.username}
                onChange={this.onChangeUsername}
                name="username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                required
                value={this.state.email}
                onChange={this.onChangeEmail}
                name="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                required
                value={this.state.password}
                onChange={this.onChangePassword}
                name="password"
              />
            </div>

            <button onClick={this.signup} className="btn btn-success btn-login">
              Sign Up
            </button>
          </div>
        )}
      </div>
    );
  }
}
