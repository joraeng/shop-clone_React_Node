const mongoose = require("mongoose");
const Schema = mongoose.Schemal;

const productSchema = mongoose.Schema(
	{
		writer: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		title: {
			type: String,
			maxlength: 50,
		},
		description: {
			type: String,
		},
		price: {
			type: Number,
			default: 0,
		},
		Images: {
			type: Array,
			default: [],
		},
		sold: {
			// 몇개가 팔렸는지에 대한 필드
			type: Number,
			maxlength: 100,
			default: 0,
		},
		views: {
			// 조회수
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true } // 자동적으로 등록, 업데이트 시간이 등록된다
);

const Product = mongoose.model("Product", productSchema);

module.exports = { Product };
