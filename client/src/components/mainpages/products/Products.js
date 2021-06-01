import React, { useContext } from "react";
import { GlobalState } from "../../../globalstate";
import ProductItem from "../utils/productItem/ProductItem";

function Products() {
	const state = useContext(GlobalState);
	const [products] = state.ProductAPI.products;
	return (
		<div className="products">
			{products.map((product) => {
				return <ProductItem product={product} key={product._id} />;
			})}
		</div>
	);
}

export default Products;
