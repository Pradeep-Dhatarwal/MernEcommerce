import { useState, useEffect } from "react";
import axios from "axios";

function UserAPI(token) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const [cart, setCart] = useState([]);
	const getUser = async (token) => {
		try {
			const res = await axios.get("/user/infor", {
				headers: {
					Authorization: token,
				},
			});
			setIsLoggedIn(true);

			res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);

			setCart(res.data.cart);
		} catch (err) {
			alert(err.response.data.msg);
		}
	};

	useEffect(() => {
		if (token) {
			getUser(token);
		}
	}, [token]);

	const addToCart = async (product) => {
		if (!isLoggedIn) return alert("Please login to continue buying");

		const check = cart.every((item) => {
			return item._id !== product._id;
		});

		if (check) {
			setCart([...cart, { ...product, quantity: 1 }]);

			await axios.patch(
				"/user/addcart",
				{ cart: [...cart, { ...product, quantity: 1 }] },
				{
					headers: { Authorization: token },
				}
			);
		} else {
			alert("This product has been added to cart.");
		}
	};

	return {
		isLoggedIn: [isLoggedIn, setIsLoggedIn],
		isAdmin: [isAdmin, setIsAdmin],
		cart: [cart, setCart],
		addToCart: addToCart,
	};
}
export default UserAPI;
