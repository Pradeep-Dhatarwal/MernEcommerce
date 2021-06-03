import React, { useContext } from "react";
import { GlobalState } from "../../../globalstate";
import ProductItem from "../utils/productItem/ProductItem";
import Loading from "../utils/Loading/Loading"

function Products() {
	const state = useContext(GlobalState);
	const [products] = state.productAPI.products;
	const [isAdmin] = state.userAPI.isAdmin

	return (
		<>
			<div className="products">
				{products.map((product) => {
					return <ProductItem product={product} key={product._id} 
					isAdmin={isAdmin}
					/>;
				})}
			</div>
			{products.length===0 && <Loading/>}
		</>
	);
}

export default Products;
