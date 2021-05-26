const Products = require("../models/productModel");
const Category = require("../models/categoryModel");

// Filter, Sorting and Pagination
class APIfeatures {
	constructor(query, queryString) {
		this.query = query;
		this.queryString = queryString;
	}
	filtering() {
		const queryObj = { ...this.queryString }; //queryString = req.query
		const excludedFields = ["page", "sort", "limit"];
		excludedFields.forEach((el) => delete queryObj[el]);
		let queryStr = JSON.stringify(queryObj);
		queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, (match) => "$" + match);
		/* 
		gt  = greater than
		lt  = less than
		gte = greater than equal
		lte = less than equal
		*/
		this.JSON.find(JSON.parse(queryStr));
		return this;
	}
	Sorting() {
		if (this.queryString.sort) {
			const sortBy = this.queryString.sort.split(",").join(" ");
			this.query = this.query.sort(sortBy);
		} else {
			this.query = this.query.sort("-createdAt");
		}
		return this;
	}
	Paginating() {
		const page = this.queryString.page * 1 || 1;
		const limit = this.queryString.limit * 1 || 9;
		const skip = (page - 1) * limit;
		this.query = this.query.skip(skip).limit(limit);

		return this;
	}
}
const productCtrl = {
	getProducts: async (req, res) => {
		try {
			const features = new APIfeatures(Products.find(), req.query)
				.filtering()
				.sorting()
				.paginating();
			const products = await features.query;
			return res.json({
				status: "success",
				result: products.length,
				products: products,
			});
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	createProduct: async (req, res) => {
		try {
			const {
				product_id,
				title,
				price,
				description,
				content,
				images,
				category,
			} = req.body;
			if (!images) return res.status(400).json({ msg: "No image uploaded." });
			const chkCategory = await Category.findOne({ name: category });
			if (!chkCategory) {
				return res.status(400).json({
					msg: "Category dosen't exist. Please enter a valid category",
				});
			}

			const product = await Products.findOne({ product_id });
			if (product) {
				return res
					.status(400)
					.json({ msg: "Product already exists, Please try again." });
			}
			const newProduct = new Products({
				product_id,
				title: title.toLowerCase(),
				price,
				description,
				content,
				images,
				category,
			});
			await newProduct.save();
			res.json({ msg: "Created a product" });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	deleteProduct: async (req, res) => {
		try {
			await Products.findByIdAndDelete(req.params.id);
			res.json({ msg: "Deleted a product." });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	updateProduct: async (req, res) => {
		try {
			const { title, price, description, content, images, category } = req.body;

			if (!images) return res.status(400).json({ msg: "No image uploaded." });
			const chkCategory = await Category.findOne({ name: category });
			if (!chkCategory) {
				return res.status(400).json({
					msg: "Category dosen't exist. Please enter a valid category",
				});
			}
			await Products.findByIdAndUpdate(
				{ _id: req.params.id },
				{
					title: title.toLowerCase(),
					price,
					description,
					content,
					images,
					category,
				}
			);
			res.json({ msg: "Updated a product." });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
};
module.exports = productCtrl;
