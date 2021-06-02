import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";

function Register() {
	const [user, setUser] = useState({ name: "", email: "", password: "" });
	const onChangeInput = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};
	const registerSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post("/user/register", { ...user });
			localStorage.setItem("firstLogin", true);
			window.location.href = "/";
		} catch (err) {
			alert(err.response.data.msg);
		}
	};
	return (
		<div className="page">
			<div className="login-page">
        <h2>Register</h2>
				<form onSubmit={registerSubmit}>
					<input
						type="texy"
						name="name"
						required
						placeholder="Name"
						value={user.name}
						autoComplete="on"
						onChange={onChangeInput}
					/>
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
						<button type="submit">Register</button>
						<Link to="/login">Login</Link>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Register;
