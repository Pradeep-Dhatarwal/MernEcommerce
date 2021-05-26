const Category = require("../models/categoryModel");

const categoryCtrl = {
	getCategories: async (req, res) => {
		try {
			const categories = await Category.find();
			res.json(categories);
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	createCategory: async (req, res) => {
		try {
			const { name } = req.body;
			if (!name)
				return res
					.status(400)
					.json({ msg: "Didn't recieve a category name. Please try again." });
			let exist = await Category.findOne({ name });
			if (exist)
				return res.status(500).json({
					msg: "Category already exists. Please try a different name.",
				});

			const categories = await new Category({ name });
			await categories.save();
			res.json(categories);
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	deleteCategory: async (req, res) => {
		try {
			const categories = await Category.findByIdAndDelete(req.params.id);
			res.json({ msg: "Deleted a category" });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	updateCategory: async (req, res) => {
		try {
			const { name } = req.body;
			await Category.findOneAndUpdate({ _id: req.params.id }, { name });
			res.json({ msg: "Updated a category" });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
};

module.exports = categoryCtrl;
