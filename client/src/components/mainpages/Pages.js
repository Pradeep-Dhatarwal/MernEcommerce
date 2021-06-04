import React ,{useContext,useState}from 'react'
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import Products from './products/Products'
import ProductDetail from './ProductDetail/ProductDetail'
import Cart from './cart/Cart'
import Login from './auth/Login'
import Register from './auth/Register'
import NotFound from './utils/NotFound/NotFound'
import {AnimatePresence} from "framer-motion"
import { GlobalState } from "../../globalstate";


function Pages() {
  const state = useContext(GlobalState)
  const [isLoggedIn] = state.userAPI.isLoggedIn;

  const [isFirstMount, setIsFirstMount] = useState(true);
  const location = useLocation();
  const history = useHistory();

  React.useEffect(() => {
    const unlisten = history.listen(() => {
      isFirstMount && setIsFirstMount(false);
    });

    return unlisten;
  }, [history, isFirstMount]);

  return (
    <div>
      <AnimatePresence exitBeforeEnter>
      <Switch location={location} key={location.pathname}>
        <Route path="/" exact  component={(props) => (<Products isFirstMount={isFirstMount} {...props} />)}/>
        <Route path="/detail/:id" exact component={ProductDetail}/>
        <Route path="/login" exact component={isLoggedIn?NotFound:Login}/>
        <Route path="/register" exact component={isLoggedIn?NotFound:Register}/>
        <Route path="/cart" exact component={Cart}/>
        <Route path="/carts" exact component={Cart}/>


        <Route path="*" exact component={NotFound}/>
      </Switch>
      </AnimatePresence>
    </div>
  )
}

export default Pages
