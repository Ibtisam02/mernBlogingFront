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




function App() {
  let dispatch=useDispatch();
  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])
  const {user,isAuthenticated,isLoading}=useSelector(state=>state.auth)

console.log(user)
console.log(isAuthenticated)
console.log(isLoading)
  useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto","Poppins"]
      }
    })
  },[])
 
return(
  
<>
{isLoading?<div>loading</div>:<Routes>
    <Route path="/" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><CommonLayout/></CheckAuth>}>
      <Route path="home" element={<Home/>}/>
      <Route path="login" element={<Login />} />
      <Route path="singup" element={<Singup />} />
      <Route path="products" element={<Products />} />
      <Route path="about" element={<About />} /> 
      <Route path="contact" element={<Contact />} />
    </Route>
    <Route path="/admin" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><AdminLayout/></CheckAuth>}>
    <Route path="home" element={<AdminHome/>}/>
    <Route path="orders" element={<Orders />} />
    <Route path="products" element={<ProductsView />} />
    <Route path="users" element={<UsersView />} />
    <Route path="analytics" element={<Analatics />} />
  </Route>
  </Routes>
  }
  </>
)
}

export default App
