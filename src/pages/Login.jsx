import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { IoMdKey } from "react-icons/io";
import { Link } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";

function Login() {
  const { user } = useSelector((state) => state.auth);
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(pass);
    const formData = {
      email,
      password: pass,
    };
    dispatch(loginUser(formData)).then((data) => {
      console.log(data);
    });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-primary flex flex-col items-center py-6 px-4 sm:px-8 w-full max-w-[400px] sm:w-[50%] md:w-[30%] text-white rounded-md shadow-lg"
      >
        <h1 className="text-2xl font-bold my-3">Login</h1>
        <div className="flex flex-col justify-center items-center gap-y-6 w-full mt-5">
          {/* Email Input */}
          <div className="relative w-full">
            <MdEmail className="absolute w-5 h-5 left-3 top-1/4 text-2xl text-gray-300" />
            <input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="text-lg py-2 pl-10 pr-3 w-full text-white rounded-md bg-transparent outline-none border border-white focus:border-red-500 transition duration-300"
              id="email"
              type="email"
            />
          </div>

          {/* Password Input */}
          <div className="relative w-full">
            <IoMdKey className="absolute w-5 h-5 left-3 top-1/4 text-2xl text-gray-300" />
            {showPass ? (
              <HiEye
                onClick={() => setShowPass(false)}
                className="absolute w-5 h-5 right-3 top-1/4 text-gray-300 cursor-pointer"
              />
            ) : (
              <HiEyeOff
                onClick={() => setShowPass(true)}
                className="absolute w-5 h-5 right-3 top-1/4 text-gray-300 cursor-pointer"
              />
            )}
            <input
              placeholder="Password"
              onChange={(e) => setPass(e.target.value)}
              required
              className="text-lg py-2 pl-10 pr-10 w-full text-white rounded-md bg-transparent outline-none border border-white focus:border-red-500 transition duration-300"
              id="password"
              type={showPass ? "text" : "password"}
            />
          </div>

          {/* Forgot Password */}
          <p className="w-full text-right hover:text-red-500 transition duration-300">
            <Link to={"/login/forgetPassword"}>Forgot Password?</Link>
          </p>

          {/* Submit Button */}
          <input
            className="w-full bg-red-500 py-2 px-3 hover:opacity-80 rounded-md transition duration-500 font-semibold cursor-pointer"
            type="submit"
            value="Login"
          />
        </div>

        {/* Signup Link */}
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to={"/signup"} className="underline text-red-500">
            Create Account
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
