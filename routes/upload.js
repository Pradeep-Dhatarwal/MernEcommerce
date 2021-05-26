const router = require("express").Router();
const cloudinary = require("cloudinary");
const auth = require("../middlewares/auth");
const authAdmin = require("../middlewares/authAdmin");
const fs = require("fs");
//uploading images on cloudinary
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Only Admin can upload images

router.post("/upload", auth, authAdmin, (req, res) => {
	try {
		const { files } = req;
		if (!files || Object.keys(files).length === 0)
			return res.status(400).json({ msg: "No files were uploaded" });
		if (files.file.size > process.env.MAX_UPLOAD_FILE_SIZE) {
			// images should be less than 5MB

			removeTemp(files.file.tempFilePath);
			return res
				.status(400)
				.json({ msg: "Exceeded File size limit, please try again." });
		}
		if (
			files.file.mimetype !== "image/webp" &&
			files.file.mimetype !== "image/jpeg" &&
			files.file.mimetype !== "image/png"
		) {
			removeTemp(files.file.tempFilePath);
			return res
				.status(400)
				.json({ msg: "Invalid file format, please try again." });
		}
		cloudinary.v2.uploader.upload(
			files.file.tempFilePath,
			{ folder: "test" },
			async (err, result) => {
				if (err) {
					throw err;
				} else {
					removeTemp(files.file.tempFilePath);
					return res.json({
						public_id: result.public_id,
						url: result.secure_url,
					});
				}
			}
		);
	} catch (err) {
		removeTemp(files.file.tempFilePath);
		return res.status(500).json({ msg: err.message });
	}
});
router.post("/destroy",auth, authAdmin, (req, res) => {
	try {
		const { public_id } = req.body;
		if (!public_id) return res.status(400).json({ msg: "No images selected" });
		cloudinary.v2.uploader.destroy(public_id, (err,result) => {
			if (err) {
				throw err;
			} else {
				res.json({ msg: "Deleted Image" });
			}
		});
	} catch (err) {
		return res.status(500).json({ msg: err.message });
	}
});
const removeTemp = (path) => {
	//delete temp folder after uploading
	fs.unlink(path, (err) => {
		if (err) throw err;
	});
};
module.exports = router;
