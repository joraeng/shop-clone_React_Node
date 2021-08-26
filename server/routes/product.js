const express = require("express");
const productRouter = express.Router();
const multer = require("multer");

// ===============================
//             Product
// ===============================

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/");
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(null, file.fieldname + "-" + uniqueSuffix);
	},
});

const upload = multer({ storage: storage }).single("file");

productRouter.post("/image", (req, res) => {
	// 가져온 이미지를 저장을 해주면 됨
	upload(req, res, (err) => {
		if (err) {
			return res.json({ success: false, err });
		}
		return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename });
	});
});

module.exports = productRouter;
