import React, { Component } from "react";
import DataService from "../services/data.service";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Alert from 'react-bootstrap/Alert'


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.onChangeLink= this.onChangeLink.bind(this);
    this.generateLink = this.generateLink.bind(this);

    this.state = {
      id: null,
      link: "",
      shortUrl: "",
      submitted: false
    };
  }

  onChangeLink(e) {
    this.setState({
      link: e.target.value
    });
  }

  navigateLogin() {
    this.props.history.push('/login')
  }
  
  back() {
    this.props.history.push('/home')
  }

  generateLink() {
    var data = {
      customLink: this.state.link
    };

    DataService.generateLink(data)
      .then(response => {
        this.setState({
          link: response.data.link,
          submitted: true,
          shortUrl: response.data.data.Link.shortedUrl
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div className="margin-top">
             <Alert variant="success" className="error">
                <Alert.Heading>Success!</Alert.Heading>
                <hr />
                <p className="mb-0">
                  This is your Shorted Link. Want to another custom link? 
                  <Link to={"/signup"}>
                    <span className="bolder"> Sign up</span>
                  </Link>
                </p>
              </Alert>
            <div className="nav-shortlink margin">
                <div className="row short-link-padding">
                    <div className="col-6">
                    <input
                        readonly
                        type="text"
                        className="form-control input-short"
                        id="title"
                        value={this.state.shortUrl}
                        />
                    </div>
                    <div className="col-6">
                        <button className="btn btn-success btn-home-shorten">
                          Copy Link
                        </button>
                    </div>
                </div>


            </div>

           
          </div>
        ) : (
          <div>

            <div >
              <div>
              <label  className="label-home">
                Create Click Worthy Links
                
              </label>
              <Link to={"/login"}>
                <button className="btn btn-success btn-get-started">
                  Get Started For Free
                </button>
              </Link>
             
              </div>

              <div>
                <img className="img-home" src="https://docrdsfx76ssb.cloudfront.net/static/1591979433/pages/wp-content/uploads/2020/05/illo-mobile-810x480-1.jpg"></img>
              </div>

              
            </div>
            <div className="nav-shortlink">
                <div className="row short-link-padding">
                    <div className="col-6">
                    <input
                        type="text"
                        className="form-control input-short"
                        id="title"
                        placeholder="Paste Long URL"
                        />
                    </div>
                    <div className="col-6">
                        <button className="btn btn-success btn-home-shorten" onClick={this.generateLink}>
                          Shorten
                        </button>
                    </div>
                </div>
                
            </div>
           
          </div>
        )}
      </div>
    );
  }
}
