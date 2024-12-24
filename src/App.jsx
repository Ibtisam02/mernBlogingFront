import {Route, Routes  } from "react-router-dom"
import Header from "./components/layout/Header"
import WebFont from "webfontloader"
import { useEffect } from "react"
import Footer from "./components/layout/Footer"
import { Outlet } from "react-router-dom"
import AdminHome from "./pages/adminPages/AdminHome.jsx";
import Orders from "./pages/adminPages/Orders.jsx";
import ProductsView from "./pages/adminPages/ProductsView.jsx";
import UsersView from "./pages/adminPages/UsersView.jsx";
import Analatics from "./pages/adminPages/Analatics.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import Login from "./pages/Login.jsx";
import Singup from "./pages/Singup.jsx";
import Products from "./pages/Products.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Home from "./pages/Home.jsx";
import CommonLayout from "./layouts/CommonLayout.jsx"
import CheckAuth from "./common/CheckAuth.jsx"
import { useSelector,useDispatch } from "react-redux"
import { checkAuth } from "./redux/authSlice/index.jsx"
import { useState, CSSProperties } from "react";
import HashLoader from "react-spinners/HashLoader";
import AddAProduct from "./pages/adminPages/AddAProduct.jsx"
import Logout from "./pages/adminPages/Logout.jsx"
import UpdateProduct from "./pages/adminPages/UpdateProduct.jsx"
import { Toaster } from "react-hot-toast"
import SingleProduct from "./pages/SingleProduct.jsx"
import Cart from "./pages/Cart.jsx"
import ShopByCatagory from "./pages/ShopByCatagory.jsx"
import ResetPasssword from "./pages/ResetPasssword.jsx"
import ForgetPassword from "./pages/ForgetPassword.jsx"
import Checkout from "./pages/Checkout.jsx"
import UserOrders from "./pages/UserOrders.jsx"




function App() {
  let dispatch=useDispatch();
  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  const {user,isAuthenticated,isLoading}=useSelector(state=>state.auth)

  useEffect(()=>{
    WebFont.load({
      google:{
        families:["Anton","Montserrat","Roboto","Poppins"]
      }
    })
  },[])

let [load,setLoad]=useState(true)

 
return(
  
<>
<Toaster position="top-right" />
{isLoading? <div className="sweet-loading w-screen h-screen flex justify-center items-center">

  <HashLoader
  color="#ff0000"
  cssOverride={{}}
  loading={isLoading}
  size={60}
  speedMultiplier={2}
/>
    </div>:<Routes>
    <Route path="/" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><CommonLayout/></CheckAuth>}>
      <Route path="home" element={<Home/>}/>
      <Route path="login" element={<Login />} />
      <Route path="login/forgetPassword" element={<ForgetPassword />} />
      <Route path="login/passwordReset/:token" element={<ResetPasssword />} />
      <Route path="singup" element={<Singup />} />
      <Route path="products" element={<Products />} />
      <Route path="about" element={<About />} /> 
      <Route path="contact" element={<Contact />} />
      <Route  path="product/:id" element={<SingleProduct />} />
      <Route  path="cart" element={<Cart />} />
      <Route  path="productsCat/:catagory" element={<ShopByCatagory />} />
      <Route  path="checkout" element={<Checkout />} />
      <Route  path="user/orders" element={<UserOrders />} />
    </Route>
    <Route path="/admin" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><AdminLayout/></CheckAuth>}>
    <Route path="home" element={<AdminHome/>}/>
    <Route path="orders" element={<Orders />} />
    <Route path="products" element={<ProductsView />} />
    <Route path="users" element={<UsersView />} />
    <Route path="analytics" element={<Analatics />} />
    <Route path="add-a-product" element={<AddAProduct/>} />
    <Route path="logout" element={<Logout/>} />
    <Route path="update/:id" element={<UpdateProduct/>} />
    <Route path="product/:id" element={<SingleProduct/>} />
  </Route>
  </Routes>
  }
  </>
)
}

export default App
