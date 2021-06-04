import React, { useContext } from "react";
import { GlobalState } from "../../../globalstate";
import ProductItem from "../utils/productItem/ProductItem";
import Loading from "../utils/Loading/Loading";
import { motion ,AnimatePresence} from "framer-motion";

function Products({ isFirstMount }) {
	const state = useContext(GlobalState);
	const [products] = state.productAPI.products;
	const [isAdmin] = state.userAPI.isAdmin;
	const variants = {
		container: {
			animate: {
				transition: {
					staggerChildren: 0.1,
					delayChildren: 0.1
				},
			},
		},
		card: {
			initial: {
				opacity: 0,
				x: 500,
			},

			animate: {
				opacity: 1,
				x: 0,
			},
		},
		page:{
			initial: {
				opacity: 0,
				x: 500,
			},
			animate: {
				opacity: 1,
				x: 0,
			},
			exit:{
				opacity: 0, x:-500
			}
		}
	};
	return (
			<div className="page">
				<AnimatePresence >

				<motion.div
					initial="initial"
					animate="animate"
					variants={variants.container}
					className="products"
					>
					{products.map((product) => {
						return (
							<motion.div key={product._id+"1"} variants={variants.card}>
								<ProductItem
									product={product}
									isAdmin={isAdmin}
									/>
							</motion.div>
						);
					})}
				</motion.div>
			</AnimatePresence>
				{products.length === 0 && <Loading />}
			</div>
	);
}

export default Products;
