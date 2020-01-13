import axios from "axios";

const BaseURL = "http://192.168.0.14:3000/api";
// const token = sessionStorage.getItem("token");
const config = () => {
  return {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token")
    }
  };
};
const Api = axios.create({
  baseURL: BaseURL,
  config: {
    headers: { "Content-Type": "application/json" }
  }
});
const currentUser = async () => {
  return await Api.get("/users/true", config());
};
const Get = async (url, data) => {
  return await Api.get(url, data, config());
};
const Post = async (url, data) => {
  return await Api.post(url, data, config());
};
const Put = async (url, data) => {
  return await Api.put(url, data, config());
};

const ApiZipcode = axios.create({
  baseURL: "https://viacep.com.br/ws"
});

export { Api, currentUser, ApiZipcode, Get, Post, Put, BaseURL };
