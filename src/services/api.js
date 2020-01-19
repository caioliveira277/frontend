import axios from "axios";
const BaseURL = "http://192.168.0.14:3000/api";

const Axios = axios.create({
  baseURL: BaseURL
});
Axios.defaults.headers.common["Authorization"] =
  "Bearer " + sessionStorage.getItem("token");

const CurrentUser = () => {
  return Axios.get("/users/true");
};
const Get = (url, data) => {
  return Axios.get(url, { params: data });
};
const Post = (url, data) => {
  return Axios.post(url, data);
};
const Put = (url, data) => {
  return Axios.put(url, data);
};

const ApiZipcode = axios.create({
  baseURL: "https://viacep.com.br/ws"
});

export { Axios, CurrentUser, ApiZipcode, Get, Post, Put, BaseURL };
