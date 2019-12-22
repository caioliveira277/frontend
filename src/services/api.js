import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.14:3000/api",
  config: {
    headers: {'Content-Type': 'application/json'}
  } 
});

export default api;
