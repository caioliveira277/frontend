import axios from "axios";
const BaseURL = "http://localhost:3000/api";
const token = sessionStorage.getItem("token");
const config = {
  headers: {
    Authorization: "Bearer " + token
  }
};
const Api = axios.create({
  baseURL: BaseURL,
  config: {
    headers: { "Content-Type": "application/json" }
  }
});
const currentUser = async () => {
  const user = await Api.get("/users/true", config);
  return user;
};

const Get = async (url, data) => {
  const get = await Api.get(url, data, config);
  return get;
};
const Post = async (url, data) => {
  const post = await Api.post(url, data, config);
  return post;
};
const Put = async (url, data) => {
  const post = await Api.put(url, data, config);
  return post;
};

const ApiZipcode = axios.create({
  baseURL: "https://viacep.com.br/ws"
});

export { Api, currentUser, ApiZipcode, Get, Post, Put, BaseURL };
