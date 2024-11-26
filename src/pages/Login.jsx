import React from "react";
import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { IoMdKey } from "react-icons/io";
import { Link } from "react-router-dom";
import { HiEye } from "react-icons/hi";
import { HiEyeOff } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/authSlice";
import { useSelector } from "react-redux";



function Login() {

  const {user}=useSelector(state=>state.auth)
console.log(user)
  let [showPass,setShowPass]=useState(true)
  let [email,setEmail]=useState("");
  let [pass,setPass]=useState("");
let dispatch=useDispatch()
let handleSubmit=(e)=>{
  e.preventDefault();
  console.log(email)
  console.log(pass)
  const formData={
    "email":email,
    "password":pass
  }
dispatch(loginUser(formData)).then((data)=>{
  console.log(data)
})
}

  return (
    <div className="h-[70vh] gap-y-5 w-screen flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-primary h-[90%] flex py-5 flex-col  items-center justify-center w-[25%]  text-white rounded-md text-center">
        <h1 className="text-2xl font-bold my-3">Login</h1>
        <div className="flex flex-col justify-center items-center gap-y-7 mt-5">
          <div className="relative focus-within:text-red-500 transition duration-1000">
            <MdEmail className="absolute w-5 h-5 ml-3 top-1/4 left-2 text-2xl" />
            <input
              placeholder="Email"
              onChange={(e)=>setEmail(e.target.value)}
              required
              className="text-[1.30rem]  py-1 px-8 w-[90%]  text-white rounded-md bg-transparent outline-none border-white border-[1.5px] border-b-[3px] "
              id="email"
              type="email"
            />
          </div>
          <div className="relative focus-within:text-red-500 transition duration-1000">
            <IoMdKey className="absolute w-5 h-5 ml-3 top-1/4 left-2 text-2xl pointer-events-none" />
            {showPass?<HiEye onClick={()=>setShowPass(false)} className='absolute w-5 h-5 right-5 top-1/4 cursor-pointer  '/>:<HiEyeOff onClick={()=>setShowPass(true)} className='absolute w-5 h-5 right-5 top-1/4 cursor-pointer '/>}
            <input
              placeholder="Password"
              onChange={(e)=>setPass(e.target.value)}
              className="text-[1.30rem] py-1 px-8 w-[90%]  text-white rounded-md bg-transparent outline-none border-white border-[1.5px] border-b-[3px] "
              id="password"
              type={showPass?"text":"password"}
              required
            />
            
          </div>
          <p className="  hover:text-red-500 transition duration-300">
          <Link className="text-right" to={"/reset-password"}>forget password?</Link>
        </p>
        <input
          className="w-[90%] bg-red-500 py-2 px-3 hover:opacity-80 rounded-md transition duration-500 font-semibold cursor-pointer"
          type="submit"
          value="Login"
        />
        </div>
        
        <p className="mt-3">Don't have an account? <Link to={"/singup"} className="underline text-red-500"> Create Account</Link></p>
      </form>
    </div>
  );
}

export default Login;
