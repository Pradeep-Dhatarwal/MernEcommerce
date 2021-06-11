import React, { useContext, useState, useEffect, memo } from "react";
import { GlobalState } from "../../../globalstate";
import { motion } from "framer-motion";
import axios from "axios";
import Paypal from "./Paypal";

function Cart() {
	const state = useContext(GlobalState);
	const [cart, setCart] = state.userAPI.cart;
	const [callback, setCallback] = state.userAPI.callback;
	const [token] = state.token;
	const [total, setTotal] = useState(0);

	useEffect(() => {
		const total = cart.reduce((accumulator, currentValue) => {
			return accumulator + currentValue.price * currentValue.quantity; // take the currentValue of pricing and add it to accumulator
		}, 0); // Initial Value of accumulator is 0
		setTotal(total);
	}, [cart]);

	const addToCart = async (cart) => {
		await axios.patch(
			"/user/addcart",
			{ cart },
			{
				headers: {
					Authorization: token,
				},
			}
		);
	};

	const increment = (id) => {
		cart.forEach((item) => {
			if (item._id === id) {
				return (item.quantity += 1);
			}
		});
		setCart([...cart]);
		addToCart(cart);
	};

	const decrement = (id) => {
		cart.forEach((item) => {
			if (item._id === id) {
				if (item.quantity >= 1) {
					return (item.quantity -= 1);
				}
			}
		});
		setCart([...cart]);
		addToCart(cart);
	};

	const removeProduct = async (id) => {
		if (window.confirm("Do you really want to remove this item")) {
			let removed = cart.filter((item) => item._id !== id);
			setCart([...removed]);
			addToCart(cart);
		}
	};

	if (cart.length === 0)
		return (
			<motion.div exit={{ opacity: 0 }}>
				<h2
					style={{ textAlign: "center", fontSize: "2rem", marginTop: "100px" }}
				>
					Cart Empty
				</h2>
			</motion.div>
		);
	const transferSuccess = async (payment) => {
		console.log(payment);
		const paymentID = payment.purchase_units[0].payments.captures[0].id;
		const address = payment.purchase_units[0].shipping.address;
		await axios.post(
			"/api/payment",
			{ cart, paymentID, address },
			{
				headers: { Authorization: token },
			}
		);
		setCart([]);
		addToCart([]);
		alert("You have succesfully placed an order.");
		setCallback(!callback);
	};

	// animation variants for framer-motion
	const variants = {
		container: {
			animate: {
				transition: {
					staggerChildren: 0.1,
					ease: "easeInOut",
				},
			},
			exit: {
				x: -500,
				transition: {
					delay: 0.5,
					ease: "easeInOut",
				},
			},
		},
		card: {
			initial: {
				opacity: 0,
				x: 200,
			},
			animate: {
				opacity: 1,
				x: 0,
				transition: { ease: "easeInOut", duration: 0.4 },
			},
			exit: {
				opacity: 0,
				x: -200,
				transition: {
					ease: "easeInOut",
					duration: 0.4,
				},
			},
		},
	};
	return (
		<motion.div
			className="page"
			variants={variants.container}
			initial="initial"
			animate="animate"
			exit="exit"
		>
			{cart.map((product) => (
				<motion.div
					variants={variants.card}
					className="detail cart"
					exit={{ opacity: 0, x: -500 }}
					key={product._id}
				>
					<img
						src={product.images.url}
						alt={product.title}
						className="img_container"
						width="300"
						height="300"
					/>
					<div className="box-detail">
						<h2 className="product-title">{product.title}</h2>
						<h3>${product.price * product.quantity}</h3>
						<p>{product.description}</p>
						<p>In Stock: {product.content}</p>
						<div className="amount">
							<button onClick={() => decrement(product._id)}>-</button>
							<span>{product.quantity}</span>
							<button onClick={() => increment(product._id)}>+</button>
						</div>
						<div className="delete" onClick={() => removeProduct(product._id)}>
							x
						</div>
					</div>
				</motion.div>
			))}
			<motion.div
				initial={{ y: 200 }}
				animate={{ y: 0 }}
				exit={{ y: 500 }}
				className="total detail"
			>
				<h3>Total: ${total} </h3>
				<Paypal total={total} transferSuccess={transferSuccess} />
			</motion.div>
		</motion.div>
	);
}

export default memo(Cart);
