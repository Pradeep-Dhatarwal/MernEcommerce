import React, { useContext } from "react";
import { GlobalState } from "../../globalstate";
import menu from "./logo/menu.svg";
import close from "./logo/times.svg";
import Cart from "./logo/cart.svg";
import { Link } from "react-router-dom";
import axios from "axios";

function Header() {
	const state = useContext(GlobalState);
	const [isLoggedIn, setIsLoggedIn] = state.userAPI.isLoggedIn;
	const [isAdmin, setIsAdmin] = state.userAPI.isAdmin;
	const [cart] = state.userAPI.cart;

	const logoutUser = async () =>{
		await axios.get("/user/logout")
		localStorage.clear();
		setIsAdmin(false);
		setIsLoggedIn(false)
	}

	const adminRouter = () => {
		return (
			<>
				<li>
					<Link to="/create-product">Create Products</Link>
				</li>
				<li>
					<Link to="/category">Category</Link>
				</li>
			</>
		);
	};
	const loggedInRouter = () => {
		return (
			<>
				<li>
					<Link to="/history">Create Products</Link>
				</li>
				<li>
					<Link to="/" onClick={logoutUser}>Logout</Link>
				</li>
			</>
		);
	};




	return (
		<header>
			<div className="menu">
				<img src={menu} alt="menu" width="30" />
			</div>
			<div className="logo">
				<h1>
					<Link to="/">{isAdmin ? "Admin" : "MernEcommerce"}</Link>
				</h1>
			</div>
			<ul>
				<li>
					<Link to="/">{isAdmin ? "Products" : "Shop"}</Link>
				</li>
				{isAdmin && adminRouter()}
				{isLoggedIn ? (
					loggedInRouter()
				) : (
					<li>
						<Link to="/login">Login</Link>
					</li>
				)}

				<li>
					<img src={close} className="menu" alt="cart" width="30" height="30" />
				</li>
			</ul>
			{isAdmin ? (
				" "
			) : (
				<div className="cart-icon">

					<span>{cart.length}</span>
					<Link to="/cart">
						<img src={Cart} alt="cart" width="30" height="30" />
					</Link>
				</div>
			)}
		</header>
	);
}
export default Header;
