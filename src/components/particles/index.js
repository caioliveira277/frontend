import React from "react";
import Particles from "react-particles-js";

function Particle() {
  return (
    <Particles width="100vw" height="100vh"
      params={{
        particles: {
          number: {
            value: 80
          },
          size: {
            value: 3
          },
          move: {
            speed: 1,
          },
        },
      }}
      style={{
        backgroundColor: "#0e1e25"
      }}
    ></Particles>
  );
}

export default Particle;
