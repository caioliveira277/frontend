import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaUserEdit, FaDoorOpen, FaAngleDown } from "react-icons/fa";
import { InputGroup, Dropdown } from "react-bootstrap";
import { BtnNavLeft } from "./../nav/index";
import "./../animations/fade.css";
import "./styles.css";
import { currentUser, BaseURL } from "../../services/api";
import UserDefaultImg from "../../assets/images/userDefault.png"
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

toast.configure();

const Header = () => {
  const [name, setName] = useState("...");
  const [userImage, setUserImage] = useState(UserDefaultImg);
  useEffect(() => {
    currentUser().then(result => {
      setName(result.data.name);
      if (result.data.gallery.length) setUserImage(`${BaseURL}/files/${result.data.gallery[0].key}`);
    });
  }, []);
  const DropdownUserInfo = React.forwardRef(({ children, onClick }, ref) => (
    <a
      className="text-white"
      href="/#"
      ref={ref}
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <span className="user-info-card">
        <img src={userImage} alt="user" />
        <strong className="text-white m-3 d-none d-md-inline" id="nameUser">
          {name}
        </strong>
      </span>
      <FaAngleDown className="d-none d-sm-inline" />
      {children}
    </a>
  ));

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
              <Link to={`/app/profile`} className="dropdown-item">
                <FaUserEdit /> Perfil
              </Link>
              <Link
                to={`/`}
                className="dropdown-item"
                onClick={() => sessionStorage.clear()}
              >
                <FaDoorOpen /> Sair
              </Link>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </section>
    </header>
  );
};

export default Header;
