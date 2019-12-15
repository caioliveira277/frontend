import React from "react";
import { FaHome, FaAngleDoubleLeft } from "react-icons/fa";
import "./../animations/fade.css";
import "./../animations/rotate.css";
import "./styles.css";

const NavToggle = () => {
  const nav = document.querySelector("#nav-left");
  const btn = document.querySelector("#btn-nav");
  nav.classList.toggle("anim-fade-out-l-big");
  nav.classList.toggle("anim-fade-in-r-big");
  btn.classList.toggle("anim-rotate-l-r");
  btn.classList.toggle("anim-rotate-r-l");
};

function BtnNavLeft() {
  return (
    <button
      className="float-right btn btn-sm btn-dark anim-rotate-l-r"
      id="btn-nav"
      onClick={NavToggle}
    >
      <FaAngleDoubleLeft />
    </button>
  );
}

function NavLeft() {
  return (
    <nav id="nav-left" className="col-2 col-md-2 anim-fade-in-r-big">
      <ul>
        <h6 className="text-left text-info font-weight-bold">Utilitarios:</h6>
        <a href="/app">
          <li>
            <FaHome /> Home
          </li>
        </a>
        <a href="/home">
          <li>
            <FaHome /> Link 2
          </li>
        </a>
        <a href="/home">
          <li>
            <FaHome /> Link 3
          </li>
        </a>
        <h6 className="text-left text-info font-weight-bold">Testes:</h6>
        <a href="/home">
          <li>
            <FaHome /> Link 4
          </li>
        </a>
        <a href="/home">
          <li>
            <FaHome /> Link 5
          </li>
        </a>
      </ul>
    </nav>
  );
}

export { BtnNavLeft, NavLeft };
