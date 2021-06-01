/* mySeedScript.js */
// require the necessary libraries
const faker = require("faker");
const mongoose = require("mongoose");
const Product = require("./models/productModel");
require("dotenv").config();

const URI = process.env.MONGO_URL;

mongoose.connect(
	URI,
	{
		useCreateIndex: true,
		useFindAndModify: false,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	(err) => {
		if (err) throw err;
		console.log("Connected to MongoDB");
	}
);
let generateProduct = () =>{
  return {
		category: faker.commerce.department(),
		checked: faker.datatype.boolean(),
		content: faker.datatype.number(500), //Quantity
		description: faker.commerce.productDescription(),
		images: {
			public_id: `test/${faker.random.alphaNumeric(20)}`,
			url: faker.image.business(),
		},
		price: faker.commerce.price(),
		product_id: faker.datatype.number(),
		title: faker.commerce.product(),
	}
}
async function seedDB() {
	for(let i = 1;i<=9;i++){
      let product = await generateProduct();
      let result = await new Product({ ...product });
      result.save();
	}
}

seedDB();
