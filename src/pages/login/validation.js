import api from "../../services/api";

async function Validation(username, password) {
  const response = { isValidadeted: "", message: "" };
  try {
    if (!username) throw new Error("Nome de usuario não informado!");
    if (!password) throw new Error("Senha não informada!");

    await api
      .post("/authenticate", {
        username: username,
        password: password
      })
      .then(res => {
        if (res.data.token === false) {
          throw new Error(res.data.message);
        } else {
          response.isValidadeted = true;
          response.message = res.data.message;
          localStorage.setItem("token", res.data.token);
        }
      });
  } catch (error) {
    response.isValidadeted = false;
    response.message = error.message;
  } finally {
    return response;
  }
}

export default Validation;
