import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../../../globalstate";

function BtnRender({ product, deleteProduct }) {
	const state = useContext(GlobalState);
	const [isAdmin] = state.userAPI.isAdmin;
	const addToCart = state.userAPI.addToCart;
	const buyHandler = () =>{
		addToCart(product);
	}
	return (
		<div className="row_btn">
			{isAdmin ? (
				<>
					<Link
						className="btn_buy"
						to="#!"
						// onClick={() => deleteProduct(product._id, product.images.public_id)}
					>
						Delete
					</Link>
					<Link className="btn_view" to={`/edit_product/${product._id}`}>
						Edit
					</Link>
				</>
			) : (
				<>
					<button className="btn_buy" onClick={buyHandler}>
						Buy
					</button>
					<Link className="btn_view" to={`/detail/${product._id}`}>
						View
					</Link>
				</>
			)}
		</div>
	);
}

export default BtnRender;
