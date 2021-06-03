import React, { useContext } from 'react'
import { GlobalState } from "../../../globalstate";
import ProductItem from '../utils/productItem/ProductItem';


function Cart() {
  const state = useContext(GlobalState);
  const [cart] = state.userAPI.cart;
  return (
    <div>
      {cart.map(item =>  <ProductItem key={item.product._id} product={item.product}/>)}
    </div>
  )
}

export default Cart
