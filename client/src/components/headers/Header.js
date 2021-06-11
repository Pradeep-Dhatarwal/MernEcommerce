import React, { useContext } from "react";
import { GlobalState } from "../../globalstate";
import menu from "./logo/menu.svg";
import close from "./logo/times.svg";
import Cart from "./logo/cart.svg";
import { Link } from "react-router-dom";
import axios from "axios";

function Header(props) {
	const state = useContext(GlobalState);
	const [isLoggedIn] = state.userAPI.isLoggedIn;
	const [isAdmin] = state.userAPI.isAdmin;
	const [cart, setCart] = state.userAPI.cart;

	const logoutUser = async (props) => {
		await axios.get("/user/logout");
		localStorage.clear();
		window.location.href = "/";
		setCart([]);
	};

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
					<Link to="/history">History</Link>
				</li>
				<li>
					<Link to="/" onClick={logoutUser}>
						Logout
					</Link>
				</li>
			</>
		);
	};

	return (
		<nav>
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
						<img
							src={close}
							className="menu"
							alt="cart"
							width="30"
							height="30"
						/>
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
		</nav>
	);
}
export default Header;
