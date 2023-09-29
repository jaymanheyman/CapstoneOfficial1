import { Route, Routes } from "react-router-dom"
import ForgotPassword from "./views/ForgotPassword"
import Home from "./views/Home"
import Login from "./views/Login"
import SignUp from "./views/SignUp"
import PageNotFound from "./views/PageNotFound"

import ViewProduct from "./views/ViewProduct"
import login from './views/Login'
import WishList from "./views/WishList"

import ShoppingCart from "./views/ShoppingCart"


import PostView from "./views/PostView"


import RoutePaths from "./config"

import ProductDetails from './components/ProductDetails'
import PrivateRoute from "./components/PrivateRoute"
import RedirectIfAuthenticate from "./components/RedirectIfAuthenticate"
import CheckOut from "./components/CheckOut"
import CheckOutSuccess from "./components/CheckOutSuccess"

function App() {

  return (
    <Routes>

      <Route path={RoutePaths.home} element={<Home />}></Route>
     
      <Route path={RoutePaths.wishlist} element={<WishList />}></Route>
      <Route path="/productss/:id" Component={ProductDetails} />
      <Route path="/checkout" Component={CheckOut} />
      <Route path="/checkoutsuccess" Component={CheckOutSuccess} />
      <Route path="/login" Component={login} />
      <Route path={RoutePaths.post} element={<PostView />}></Route>
      <Route path={RoutePaths.shopping} element={<ShoppingCart />}></Route>
      
      
      <Route element={<RedirectIfAuthenticate />} >
        <Route path={RoutePaths.login} element={<Login />}></Route>
        <Route path={RoutePaths.signup} element={<SignUp />}></Route>
      </Route>
      <Route path={RoutePaths.passwordReset} element={<ForgotPassword />}></Route>
      <Route path={RoutePaths.productView} element={<ViewProduct />}></Route>

  

      {/* ADMINS ROUTES */}

      

      <Route path="*" element={<PageNotFound />}></Route>

    </Routes>
    
  )
}

export default App
