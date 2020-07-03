import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { ReactComponent as Logo } from './rizky.svg';


import Login from "./components/login.component";
import Signup from "./components/signup.component";
import Home from "./components/home.component";
import Dashboard from "./components/dashboard.component";

class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      user: null,
      routes: null
    };
    
  }

  componentDidMount() {
    const user = localStorage.getItem('usr');
    this.setState({ user : user });
  }

  logout() {
    localStorage.removeItem('usr');
    localStorage.removeItem('email');
    localStorage.removeItem('token');
  }

  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-white bg-white">
            <a href="/home" className="navbar-brand">
              <Logo className="logo"></Logo>
            </a>
            <div className="navbar-nav">
              <li className="nav-item">
                <Link to={"/"} className="nav-link">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/"} className="nav-link">
                  Solution
                </Link>
              </li>

              {this.state.user ? (
                <li className="nav-item login">
                  <Link to={"/home"} className="nav-link">
                    <button className="nav-login-btn" onClick={this.logout}>Logout</button>
                  </Link>
                  <span></span>
                  
                </li>
              ): (
                <div className="row">
                  <div className="col-2">
                    <li className="nav-item">
                    <Link to={"/signup"} className="nav-link">
                      Sign up
                    </Link>
                  </li>
                  </div>
                  <div className="col-2">
                    
                    <li className="nav-item login">
                      <Link to={"/login"} className="nav-link">
                        <button className="nav-login-btn">Login</button>
                      </Link>
                    </li>
                  </div>
                </div>
              )}
            </div>
          </nav>

          <div className="container mt-5">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
