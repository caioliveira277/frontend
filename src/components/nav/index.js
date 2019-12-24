import React from "react";
import { FaHome, FaAngleDoubleLeft } from "react-icons/fa";
import "./../animations/fade.css";
import "./../animations/rotate.css";
import "./styles.css";

const NavToggle = () => {
  const nav = document.querySelector("nav#nav-left");
  const btn = document.querySelector("button#btn-nav");
  const article = document.querySelector("article#main-article");

  nav.classList.toggle("anim-fade-out-l-big");
  nav.classList.toggle("anim-fade-in-r-big");
  btn.classList.toggle("anim-rotate-l-r");
  btn.classList.toggle("anim-rotate-r-l");
  article.classList.toggle("col-10");
  setTimeout(() => {
    nav.classList.toggle("d-none");
    article.classList.toggle("col-12");
  }, 400);
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
      <ul className="d-inline">
        <a href="/app">
          <li>
            <FaHome />
            <span className="d-none d-sm-inline"> Home</span>
          </li>
        </a>
      </ul>
    </nav>
  );
}

export { BtnNavLeft, NavLeft };
