import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { GlobalState } from "../../../globalstate";

function ProductDetail() {
	const params = useParams();
	const state = useContext(GlobalState);
	const [products] = state.ProductAPI.products;
	const [productDetail, setProductDetail] = useState([]);

	useEffect(() => {
		if (params) {
			products.forEach((product) => {
				if (product._id === params.id) setProductDetail(product);
			});
		}
	}, [params, products]);
  console.log(productDetail);
  if(productDetail.length === 0) return null;

	return (
		<div className="detail">
			<img
				src={productDetail.images.url}
				alt={productDetail.title}
				width="300"
				height="300"
			/>
			<div className="box-detail">
				<div className="row">
					<h2>{productDetail.title}</h2>
					<h6>#id: {productDetail.product_id}</h6>
				</div>
        <span>${productDetail.price}</span>
        <p>{productDetail.description}</p>
        <p>In Stock: {productDetail.content}</p>
        <p>Sold:{productDetail.sold}</p>
        <Link to="/cart" className="cart">Buy Now</Link>
			</div>
		</div>
	);
}

export default ProductDetail;
