import axios from "axios";
const url = "http://155.69.146.213:5000/";

const Axios = axios.create({
  baseURL: `${url}`,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json, application/x-www-form-urlencoded"
  }
});

export default Axios;
