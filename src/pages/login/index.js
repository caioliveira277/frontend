import React, { useState, useRef } from "react";
import { FaUserAlt, FaKey } from "react-icons/fa";
import { Form, Button, InputGroup, Toast } from "react-bootstrap";
import Validation from "../../middleware/validation";
import ToastMessage from "../../components/toastMessage/index";
import Particle from "../../components/particles";
import "../../components/animations/fade.css";
import "./styles.css";
import { dateNow } from "../../utils/utilities";

const DateNow = () => {
  return `Hoje é ${dateNow.getDate()}
	do ${dateNow.getMonth() + 1} de ${dateNow.getFullYear()}`;
};

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const formBtn = useRef(null);
  const toast = useRef(null);

  const handleSubmit = event => {
    event.preventDefault();
    const elementToast = toast.current;
    formBtn.current.innerHTML =
      "<span class='spinner-grow spinner-grow-sm'></span>";

    Validation(username, password).then(response => {
      if (response.Validated === false) {
        formBtn.current.innerHTML = "Enviar";
        ToastMessage(elementToast, "danger", "Ops...", response.message);
      } else {
        ToastMessage(
          elementToast,
          "success",
          DateNow(),
          `Olá ${response.message}`
        );
        props.history.push("/app");
      }
    });
  };
  return (
    <>
      <section className="position-absolute" id="form_login">
        <div className="box anim-fade-in">
          <Form onSubmit={handleSubmit}>
            <div className="div-center mb-3">
              <Toast className="text-center p-2" ref={toast}>
                <strong className="text-success font-weight-bold">
                  {DateNow()}
                </strong>
                <Toast.Body>Seja bem-vindo!</Toast.Body>
              </Toast>
            </div>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FaUserAlt />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                placeholder="Nome de usuario"
                type="text"
                value={username}
                autoComplete="username"
                autoFocus
                onChange={event => setUsername(event.target.value)}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FaKey />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                placeholder="Sua senha"
                type="password"
                autoComplete="current-password"
                onChange={event => setPassword(event.target.value)}
              />
            </InputGroup>
            <Form.Group className="text-right">
              <a href="#http" className="text-info">
                Esqueceu sua senha?
              </a>
            </Form.Group>
            <div className="text-center">
              <Button className="w-25 bg-theme1" type="submit" ref={formBtn}>
                Entrar
              </Button>
            </div>
          </Form>
        </div>
      </section>
      <Particle></Particle>
    </>
  );
}

export default Login;
