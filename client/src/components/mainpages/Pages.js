import React from 'react'
import { Switch , Route} from 'react-router-dom'
import Products from './products/Products'
import ProductDetail from './ProductDetail/ProductDetail'
import Cart from './cart/Cart'
import Login from './auth/Login'
import Register from './auth/Register'
import NotFound from './utils/NotFound/NotFound'

function Pages() {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Products}/>
        <Route path="/detail/:id" exact component={ProductDetail}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/register" exact component={Register}/>
        <Route path="/cart" exact component={Cart}/>
        <Route path="/carts" exact component={Cart}/>


        <Route path="*" exact component={NotFound}/>
      </Switch>
    </div>
  )
}

export default Pages
