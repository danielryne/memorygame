import React from "react";
import "./Header.css";
import mainLogo from "./stranger-clicks.png"


const Header = props => <div>
	<img src={mainLogo} alt="Stranger Clicks Logo"></img>
	<h4 className="title">{props.children}</h4>
	</div>;

export default Header;