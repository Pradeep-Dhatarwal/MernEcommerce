import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"

function Login(props) {
	const [user, setUser] = useState({ email: "", password: "" });
	const onChangeInput = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};
	const loginSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post("/user/login", { ...user });
			localStorage.setItem("firstLogin", true);
			window.location.href = "/";
		} catch (err) {
			alert(err.response.data.msg);
		}
	};



	return (
		<motion.div exit={{ opacity: 0 }}>
		<div className="page">
			<div className="login-page">
				<h2>Login</h2>
				<form onSubmit={loginSubmit}>
					<input
						type="email"
						name="email"
						required
						placeholder="Email"
						value={user.email}
						autoComplete="on"
						onChange={onChangeInput}
					/>
					<input
						type="password"
						name="password"
						required
						placeholder="Password"
						value={user.password}
						autoComplete="on"
						onChange={onChangeInput}
					/>
					<div className="row">
						<button type="submit">Login</button>
						<Link to="/register">Register</Link>
					</div>
				</form>
			</div>
		</div>
		</motion.div>
	);
}

export default Login;
