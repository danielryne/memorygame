import React from "react";
import "./Nav.css";

const Nav = props => (
  <nav>
    <ul>

      <li>Your Score: {props.score}</li>

      <li>Top Score: {props.topScore}</li>

      <li>{props.gameStatus}</li>

    </ul>
  </nav>
);

export default Nav;