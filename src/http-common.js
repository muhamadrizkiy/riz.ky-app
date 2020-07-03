import axios from "axios";

export default axios.create({
  withCredentials: false,
  baseURL: "http://localhost:3001/api/v1",
  headers: {
    "Content-type": "application/json",
    'Access-Control-Allow-Origin': 'http://localhost:3000'
  }
});