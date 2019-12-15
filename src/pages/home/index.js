import React, { useEffect } from "react";
import "./styles.css";
import Header from "../../components/header";
import { NavLeft } from "../../components/nav";

function Home() {
  useEffect(() => {
      let particles = document.querySelector("#particles-js")
      particles ? particles.remove() : particles = "";
  })
  return (
    <>
    <Header></Header>
    <NavLeft></NavLeft>
    </>
  );
}

export default Home;