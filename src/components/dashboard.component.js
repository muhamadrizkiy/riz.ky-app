import React, { Component } from "react";
import DataService from "../services/data.service";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Alert from 'react-bootstrap/Alert'
import Table from 'react-bootstrap/Table'

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.onChangeLink= this.onChangeLink.bind(this);
    this.onChangePath= this.onChangePath.bind(this);
    this.generateLink = this.generateLink.bind(this);
    this.getLocalStorage = this.getLocalStorage.bind(this);
    
    this.state = {
      id: null,
      user: null,
      token: null,
      link: "",
      shortUrl: "",
      path: "",
      submitted: false,
      taken: false,
      errorLoadingData: false,
      dataTable: [],
      isShorted: false,
      isDeleted: false
    };
  }


  componentWillMount() {
    const user = localStorage.getItem('usr');
    const token = localStorage.getItem('token');
    this.setState({ user : user, token: token });
    
  }

  componentDidMount() {
    const user = localStorage.getItem('usr');
    const token = localStorage.getItem('token');
    this.setState({ user : user, token: token });

    if (!token) {
      this.props.history.replace('/login')
    } else {
       DataService.getLinkByUser(this.state.user)
      .then(response => {
        console.log(response)
          if (response.data.status === 'Success') {
            this.setState({
              dataTable : response.data.data
            })
          } else {
            this.setState({
                errorLoadingData: true,
            });
          }
      })
      .catch(e => {
        console.log(e);
      });
    }
  }

  getLink() {

    DataService.getLinkByUser(this.state.user)
      .then(response => {
        console.log(response)
          if (response.data.status === 'Success') {
            console.log('data success')
            this.setState({
              dataTable : response.data.data
            })
          } else {
            console.log('error loading data')
            this.setState({
                errorLoadingData: true,
            });
          }
      })
      .catch(e => {
        console.log(e);
      });
  }

  getLocalStorage(e) {
    const user = localStorage.getItem('usr');
    const token = localStorage.getItem('token');
    this.setState({ user : user, token: token });
  }

  onChangeLink(e) {
    this.setState({
      link: e.target.value
    });
  }

  onChangePath(e) {
    this.setState({
      path: e.target.value
    });
  }

  navigateDashboard() {
    this.props.history.push('/dashboard')
  }

  generateLink() {
    var data = {
      link: this.state.link,
      path: this.state.path,
      userId: this.state.user
    };

    console.log(data)

    DataService.generateCustomLink(data)
      .then(response => {
          if (response.data.status === 'Success') {
            this.setState({
                submitted: true,
                shortUrl: response.data.data.Link.shortedUrl
              });
              this.getLink()
          } else {
            this.setState({
                submitted: true,
                taken: true,
            });
          }
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    return (
        <div className="submit-form">
          <div>
            <div >
              <div>
              <label  className="label-home">
                Welcome, {this.state.user}
                
              </label>
              
            
              </div>
              {this.state.taken ? (
              <Alert variant="danger" className="error">
                <Alert.Heading>Link already used!</Alert.Heading>
                <hr />
                <p className="mb-0">
                  You can change with another path.
                </p>
              </Alert>
            ) : (
                <label> This is your short URL, Check this out</label>
            )} 

              
            </div>

            <div className="nav-shortlink">
                <div className="row short-link-padding">
                    <div className="col-6">
                    <input
                        type="text"
                        className="form-control input-short"
                        id="title"
                        placeholder="Paste Long URL"
                        onChange={this.onChangeLink}
                        />
                    </div>
                    
                </div>

                <div className="row short-link-padding">
                    <div className="col-1">
                    <input
                        readOnly
                        type="text"
                        className="form-control input-short"
                        id="title"
                        placeholder="riz.ly/"
                        />
                    </div>
                    <div className="col-5">
                    <input
                        type="text"
                        className="form-control input-short-ok"
                        id="title"
                        placeholder="Path"
                        onChange={this.onChangePath}
                        maxLength="10"
                        />
                    </div>
                    <div className="col-5">
                        <button className="btn btn-success btn-home-shorten" onClick={this.generateLink}>
                          Shorten
                        </button>
                    </div>
                </div>

                <Table striped bordered hover variant="dark" className="table">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Full Link</th>
                      <th>Shorted Link</th>
                      <th>Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                  {this.state.dataTable.map(( listValue, index ) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{listValue.linkUrl}</td>
                        <td>{listValue.shortedUrl}</td>
                        <td>{listValue.ts}</td>
                      </tr>
                    );
                  })}
                  </tbody>
                </Table>
            </div>




            </div>
       
      </div>
    );
  }
}
