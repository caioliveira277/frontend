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
        <a href="/app">
          <li>
            <FaHome className="text-center"/> 
            <span className="d-none d-sm-inline">Home</span>
          </li>
        </a>
      </ul>
    </nav>
  );
}

export { BtnNavLeft, NavLeft };
