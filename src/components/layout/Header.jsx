import React, { useState } from "react";
import { ReactNavbar } from "overlay-navbar";
import { CiSearch } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import logo from "../../assets/download.svg";
import { Link, NavLink } from "react-router-dom";
import { useSelector ,useDispatch} from "react-redux";
import { logoutUser } from "../../redux/authSlice";


export default function Header({ fixed }) {
let dispatch=useDispatch();
  const {user,isAuthenticated,isLoading}=useSelector(state=>state.auth)
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  let [active,setActive]=useState(false)

  let logoutUserr=()=>{
  dispatch(logoutUser()).then((res)=>{
    console.log(res)
  })
  }
  return (
    <>
      <nav className="w-screen relative flex flex-wrap items-center justify-between px-2 py-3 bg-slate-800 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <img src={logo} alt="" />
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>

          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex gap-x-5 flex-col lg:flex-row lg:items-center list-none lg:ml-auto">
              <NavLink className={({isActive})=>isActive?"text-red-600":"text-white"} to={"/"}>
                <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i>
                <span className="ml-2 text-lg font-bold">Home</span>
              </NavLink>
              <NavLink className={({isActive})=>isActive?"text-red-600":"text-white"} to={"/products"}>
                <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i>
                <span className="ml-2 text-lg font-bold">Products</span>
              </NavLink>
              <NavLink className={({isActive})=>isActive?"text-red-600":"text-white"} to={"/about"}>
                <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i>
                <span className="ml-2 text-lg font-bold">About</span>
              </NavLink>
              <NavLink className={({isActive})=>isActive?"text-red-600":"text-white"} to={"/contact"}>
                <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i>
                <span className="ml-2 text-lg font-bold">Contact</span>
              </NavLink>
              
              
              <NavLink to={"/cart"} className={({isActive})=>isActive?"text-red-600 nav-item":"text-white nav-item"}>
               
                  <i className="fab fa-pinterest text-xl leading-lg text-white opacity-75">
                    <FaShoppingCart />
                  </i>
                
              </NavLink>
              <NavLink to={"/search"} className={({isActive})=>isActive?"text-red-600 nav-item":"text-white nav-item"}>
               
                  <i className="fab fa-pinterest text-xl leading-lg text-white opacity-75">
                    <CiSearch />
                  </i>
                
              </NavLink>
              <div>

                  <i onClick={()=>setActive(pre=>!pre)} className="relative fab fa-pinterest text-xl leading-lg text-white opacity-75">
                    <FaCircleUser />
                  </i>

                  {active===true && isAuthenticated===false?<div className="bg-white absolute right-0 top-16 px-3 py-2 z-20">
                    <div><Link to={"/login"}>login</Link></div>
                    <div><Link to={"/singup"}>singup</Link></div>
                  </div>:null}
                  {active===true && isAuthenticated===true?<div className="bg-white absolute right-0 top-16 px-3 py-2 z-20">
                    <div onClick={logoutUserr} className="cursor-pointer">logout</div>
                  </div>:null}

              </div>
                
              
              
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
