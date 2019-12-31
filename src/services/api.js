import axios from "axios";

const Api = axios.create({
  baseURL: "http://192.168.0.14:3000/api",
  config: {
    headers: { "Content-Type": "application/json" }
  }
});
const currentUser = async () => {
  const token = sessionStorage.getItem("token");
  const user = await Api.get("/users/true", {
    headers: {
      Authorization: "Bearer " + token
    }
  });
  return user;
};

const Post = async (url, data, token) => {
  const post = await Api.post(url, data, {
    headers: {
      Authorization: "Bearer " + token
    }
  })
  return post;
};
const Put = async (url, data, token) => {
  const post = await Api.put(url, data, {
    headers: {
      Authorization: "Bearer " + token
    }
  })
  return post;
};

const ApiZipcode = axios.create({
  baseURL: "https://viacep.com.br/ws"
});

export { Api, currentUser, ApiZipcode, Post, Put };
