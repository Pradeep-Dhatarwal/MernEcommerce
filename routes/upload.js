const router = require("express").Router();
const cloudinary = require("cloudinary");
const auth = require("../middlewares/auth");
const authAdmin = require("../middlewares/authAdmin");

//uploading images on cloudinary
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

// upload images

router.post("/upload", (req, res) => {
	try {
		const { files } = req;
		if (!files || Object.keys(files).length === 0)
			return res.status(400).json({ msg: "No files were uploaded" });
		if (files.file.size > process.env.MAX_UPLOAD_FILE_SIZE)
			return res
				.status(400)
				.json({ msg: "Exceeded File size limit, please try again." }); // images should be less than 1MB
		if (
			files.file.mimetype !== "image/webp" &&
			files.file.mimetype !== "image/jpeg" &&
			files.file.mimetype !== "image/png" 
		)
			return res
				.status(400)
				.json({ msg: "Invalid file format, please try again." });


				cloudinary.v2.uploader.upload(files.file.tempFilePath, {folder:"test"}, async (err,result)=>{
					if (err) {
						throw err;
					} else {
						res.json(result); 
					}
				} )
	} catch (err) {
		return res.status(500).json({ msg: err.message });
	}
});

module.exports = router;
