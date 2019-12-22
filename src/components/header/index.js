import React from "react";
import { FaSearch, FaUserEdit, FaDoorOpen, FaAngleDown } from "react-icons/fa";
import { InputGroup, Dropdown } from "react-bootstrap";
import { BtnNavLeft } from "./../nav/index";
import "./../animations/fade.css";
import "./styles.css";

const Header = () => {
  const DropdownUserInfo = React.forwardRef(({ children, onClick }, ref) => (
    <a
      className="text-white"
      href="/home"
      ref={ref}
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <span className="user-info-card">
        <img
          src="https://ipc.digital/wp-content/uploads/2016/07/icon-user-default.png"
          alt="user"
        />
        <strong className="text-white m-3 d-none d-md-inline">
          Nome usuario
        </strong>
      </span>
      <FaAngleDown className="d-none d-sm-inline" />
      {children}
    </a>
  ));

  const Loggout = async () => {
    await sessionStorage.clear();
    await window.location.reload();
  };

  return (
    <header id="main-header">
      <section className="row">
        <div className="col-2 col-sm-2 nav">
          <span>
            <span className="d-none d-md-inline">PAINEL</span>
            <BtnNavLeft />
          </span>
        </div>
        <div className="col-8 col-sm-8 col-md-4">
          <InputGroup className="input-search">
            <InputGroup.Prepend>
              <InputGroup.Text>
                <a href="/home">
                  <i>
                    <FaSearch />
                  </i>
                </a>
              </InputGroup.Text>
            </InputGroup.Prepend>
            <input type="text" placeholder="Buscar" />
          </InputGroup>
        </div>
        <div className="col-2 col-sm-2 col-md-6">
          <Dropdown alignRight className="float-right user-info-dropdown">
            <Dropdown.Toggle as={DropdownUserInfo}></Dropdown.Toggle>
            <Dropdown.Menu className="anim-fade-in font-size">
              <Dropdown.Header></Dropdown.Header>
              <Dropdown.Item eventKey="1">
                <FaUserEdit /> Perfil
              </Dropdown.Item>
              <Dropdown.Item eventKey="2" onClick={Loggout}>
                <FaDoorOpen /> Sair
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </section>
    </header>
  );
};

export default Header;
