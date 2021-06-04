const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userCtrl = {
	register: async (req, res) => {
		try {
			const { name, email, password } = req.body; // Assign the variables from req.body to corredsponding element

			// run validations
			let emailRegex = new RegExp(
				/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i
			);
			const user = await Users.findOne({ email });
			if (user)
				return res.status(400).json({ msg: "The email already exists." });
			if (password.length < 6)
				return res
					.status(400)
					.json({ msg: "Password should be atleast 6 characters." });
			if (!emailRegex.test(email))
				return res.status(400).json({ msg: "Invalid email id." });
			// end validations

			const passwordHash = await bcrypt.hash(password, 10); //encrypt passwords

			const newUser = new Users({
				// Create new user
				name,
				email,
				password: passwordHash,
			});

			await newUser.save(); //save new user to db

			//create Jwt to authenticate
			const accesstoken = createAccessToken({ id: newUser._id });
			const refreshtoken = createRefreshToken({ id: newUser._id });

			//set cookie from refresh token
			res.cookie("refreshtoken", refreshtoken, {
				httpOnly: true,
				path: "/user/refresh_token",
			});

			res.status(201).json({ accesstoken });
			// res.json({ msg: "Registered successfully!" });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	refreshToken: (req, res) => {
		try {
			const rf_token = req.cookies.refreshtoken; // get refresh token from cookie

			if (!rf_token)
				return res.status(400).json({ msg: "Please login/Register." });

			jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
				// Verify refresh token
				if (err) return res.status(400).json({ msg: "Please login/Register." });
				const accesstoken = createAccessToken({ id: user.id });
				res.json({ accesstoken });
			});
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	login: async (req, res) => {
		try {
			const { email, password } = req.body;
			const user = await Users.findOne({ email });

			if (!user) return res.status(400).json({ msg: "User does not exist." });

			const isMatch = await bcrypt.compare(password, user.password); //comparing password to hash

			if (!isMatch)
				return res.status(400).json({ msg: "Incorrect email/password." });

			//if login success then create access token and refresh token
			const accesstoken = createAccessToken({ id: user._id });
			const refreshtoken = createRefreshToken({ id: user._id });
			//set cookie from refresh token
			res.cookie("refreshtoken", refreshtoken, {
				httpOnly: true,
				path: "/user/refresh_token",
			});
			res.json({ accesstoken });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	logout: async (req, res) => {
		try {
			res.clearCookie("refreshtoken", { path: "/user/refresh_token" }); //clear cookies to logout
			return res.json({ msg: "logged out successfully" });
		} catch (error) {
			return res.status(500).json({ msg: err.message });
		}
	},
	getUser: async (req, res) => {
		try {
			const user = await Users.findById(req.user.id).select("-password");

			if (!user) return res.status(400).json({ msg: "User does not exist" });

			res.json(user); //id of the user logged in
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	addCart: async (req,res)=>{
		try {
			const user = await Users.findById(req.user.id);
			if (!user) return res.status(400).json({msg:"User doesn't exist."})
			await Users.findOneAndUpdate({_id:req.user.id },{ cart:req.body.cart})
			res.json({
				msg:"Added to cart"
			})
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	} 
};
const createAccessToken = (user) => {
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};
const createRefreshToken = (user) => {
	return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: "7d",
	});
};
module.exports = userCtrl;
