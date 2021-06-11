import React, { useContext } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import Products from "./products/Products";
import ProductDetail from "./ProductDetail/ProductDetail";
import Cart from "./cart/Cart";
import Login from "./auth/Login";
import Register from "./auth/Register";
import OrderHistory from "./history/OrderHistory";
import OrderDetails from "./history/OrderDatails";
import NotFound from "./utils/NotFound/NotFound";
import { AnimatePresence } from "framer-motion";
import { GlobalState } from "../../globalstate";

function Pages() {
	const state = useContext(GlobalState);
	const [isLoggedIn] = state.userAPI.isLoggedIn;
	const location = useLocation();

	return (
		<div>
			<AnimatePresence exitBeforeEnter>
				<Switch location={location} key={location.pathname}>
					<Route path="/" exact component={Products} />
					<Route path="/detail/:id" exact component={ProductDetail} />
					<Route
						path="/login"
						exact
						component={isLoggedIn ? NotFound : Login}
					/>
					<Route
						path="/register"
						exact
						component={isLoggedIn ? NotFound : Register}
					/>
					<Route
						path="/history"
						exact
						component={isLoggedIn ? OrderHistory:NotFound}
					/>
					<Route
						path="/history/:id"
						exact
						component={isLoggedIn ? OrderDetails:NotFound}
					/>
					<Route path="/cart" exact component={Cart} />
					<Route path="*" exact component={NotFound} />
				</Switch>
			</AnimatePresence>
		</div>
	);
}

export default Pages;
