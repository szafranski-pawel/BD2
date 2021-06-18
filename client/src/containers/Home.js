import React from "react";
import "./Home.css";
import logo from './logo.png';

export default function Home() {
  return (
    <div className="Home">
      <div className="lander">
        <h1>Grejfrut</h1>
        <p className="text-muted">Hulajnogi dla każdego</p>
        <img src={logo} />
      </div>
    </div>
  );
}
