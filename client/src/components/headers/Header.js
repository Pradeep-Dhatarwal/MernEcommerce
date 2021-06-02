import React, { memo, useContext } from "react";
import { GlobalState } from "../../globalstate";
import menu from "./logo/menu.svg";
import close from "./logo/times.svg";
import cart from "./logo/cart.svg";
import { Link } from "react-router-dom";

 function Header() {
	const value = useContext(GlobalState);
  
	return (
		<header>
			<div className="menu">
				<img src={menu} alt="menu" width="30" />
			</div>
			<div className="logo">
				<h1>
					<Link to="/">MernEcommerce</Link>
				</h1>
			</div>
			<ul>
				<li>
					<Link to="/">products</Link>
				</li>
				<li>
					<Link to="/login">Login or Register</Link>
				</li>
				<li>
					<img src={close} className="menu" alt="cart" width="30" height="30"/>
				</li>
			</ul>
			<div className="cart-icon">
				<span>0</span>
        <Link to="/cart">
				<img src={cart} alt="cart" width="30" height="30" />
        </Link>
			</div>
		</header>
	);
}
export default memo(Header)