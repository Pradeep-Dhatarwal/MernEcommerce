import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { GlobalState } from "../../../globalstate";
import ProductItem from "../utils/productItem/ProductItem";

function ProductDetail() {
	const params = useParams();
	const state = useContext(GlobalState);
	const [products] = state.ProductAPI.products;
	const [productDetail, setProductDetail] = useState([]);

	useEffect(() => {
		if (params.id) {
			products.forEach((product) => {
				if (product._id === params.id) setProductDetail(product);
			});
		}
	}, [params.id, products]);
	if (productDetail.length === 0) return null;

	return (
		<div className="page">
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
					<Link to="/cart" className="cart">
						Buy Now
					</Link>
				</div>
			</div>
			<div className="similar-products">
				<h2>Related Products</h2>
				<div className="products">
					{products.map((product) => {
						return product.category === productDetail.category ? (
							product.title !== productDetail.title ? (
								<ProductItem key={product._id} product={product} />
							) : null
						) : null;
					})}
				</div>
			</div>
		</div>
	);
}

export default ProductDetail;
