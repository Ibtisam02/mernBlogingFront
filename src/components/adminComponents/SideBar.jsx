import React, { useState } from 'react'
import logo from "../../assets/download.svg"
import { NavLink } from 'react-router-dom'
import { IoHomeOutline } from "react-icons/io5";
import { BsPencilSquare } from "react-icons/bs";
import { AiOutlineProduct } from "react-icons/ai";
import { RiLuggageCartLine } from "react-icons/ri";
import { FaShop } from "react-icons/fa6";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import { IoBagAddOutline } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/authSlice';






function SideBar() {
    let dispatch=useDispatch();
    let [sideActive,setSideActive]=useState(false)
    let setSideBarToTrue=()=>{
        setSideActive(true)
    }
    let makeSideFalse=()=>{
        setSideActive(false)
    }
    let logoutAdmin=()=>{
        dispatch(logoutUser())
    }
  return (
    <>
    <div onMouseLeave={makeSideFalse} onMouseOver={setSideBarToTrue} className=' w-[70px]  px-4 hover:w-1/6 transition-all ease-out duration-200 bg-primary shadow-md h-screen fixed z-30'>
        <div className='flex border-b-2 border-white'>
            <FaShop className='text-7xl text-red-600'/>
        {sideActive?<img className=' px-3 mb-1 w-2/3 object-contain ' src={logo} alt="" />:null}
        </div>
        

        <ul className='my-5 flex flex-col gap-y-4 '>
        <NavLink className={({isActive})=>isActive?"text-red-600 flex justify-start gap-x-5  items-center":"text-white flex justify-start gap-x-5  items-center" } to={"/admin/home"}>
                <IoHomeOutline className='text-5xl'/>
                {sideActive?<span className=" text-lg font-bold">Home</span>:null}
        </NavLink>
        <NavLink className={({isActive})=>isActive?"text-red-600 flex justify-start gap-x-5  items-center":"text-white flex justify-start gap-x-5  items-center" } to={"/admin/products"}>
                <AiOutlineProduct className='text-5xl'/>
                {sideActive?<span className=" text-lg font-bold">Products</span>:null}
        </NavLink>
        <NavLink className={({isActive})=>isActive?"text-red-600 flex justify-start gap-x-5 items-center":"text-white flex justify-start gap-x-5  items-center" } to={"/admin/orders"}>
                <RiLuggageCartLine className='text-5xl'/>
                {sideActive?<span className=" text-lg font-bold">Orders</span>:null}
        </NavLink>
        <NavLink className={({isActive})=>isActive?"text-red-600 flex justify-start  gap-x-5 items-center":"text-white flex justify-start gap-x-5  items-center" } to={"/admin/analytics"}>
                <TbBrandGoogleAnalytics className='text-5xl'/>
                {sideActive?<span className=" text-lg font-bold">Analytics</span>:null}
        </NavLink>
        <NavLink className={({isActive})=>isActive?"text-red-600 flex justify-start  gap-x-5 items-center":"text-white flex justify-start gap-x-5  items-center" } to={"/admin/users"}>
                <FaRegUser className='text-5xl'/>
                {sideActive?<span className=" text-lg font-bold">Users</span>:null}
        </NavLink>
        <NavLink className={({isActive})=>isActive?"text-red-600 flex justify-start  gap-x-5 items-center":"text-white flex justify-start gap-x-5  items-center" } to={"/admin/add-a-product"}>
                <IoBagAddOutline className='text-5xl'/>
                {sideActive?<span className=" text-lg font-bold">Add</span>:null}
        </NavLink>
        
        </ul>
        <div className='flex justify-start items-center gap-x-5'>

        <img className='rounded-full' width={"50px"} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ891HLuugNKthcStMIQ3VD_phd6XrcYAhkjA&s" alt="" />
        {sideActive?<div onClick={logoutAdmin} className='text-lg cursor-pointer px-3 py-1 rounded-md transition-all ease-in duration-200 font-bold hover:bg-red-700 hover:text-white text-white'>Logout</div>:null}
        </div>
    </div>
    </>
  )
}

export default SideBar