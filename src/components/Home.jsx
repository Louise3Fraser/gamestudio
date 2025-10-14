import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import "./Home.css";
import Clock from "./Clock";

function Home() {
  return (
    <div className="home">
      <header>
        <a href="index.html" title="Home page">
          <img
            src={logo}
            style={{ width: "40px" }}
            alt="GameStudio by Louise"
          />
        </a>
        <h1>gamestudio by louise</h1>
      </header>
      <Clock />
    </div>
  );
}

export default Home;
