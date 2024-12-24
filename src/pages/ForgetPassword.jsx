import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { forgetPassword } from "../redux/userSlice/resetPassword";
import { BeatLoader } from "react-spinners";

function ForgetPassword() {
  let dispatch = useDispatch();
  let navigate=useNavigate();
  let { message, loading } = useSelector((state) => state.forgetPassword);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setSuccess("");
      return;
    }

    // Simulate sending the reset link
    dispatch(forgetPassword({ email: email })).then((res) => {
      console.log(res);
      if (res.payload?.success) {
        setSuccess(res.payload?.message);
      } else {
        setError("Sonthing went wrong! make sure to provide correct email!");
      }
    });
  };
  return (
    <div className="flex justify-center items-center h-screen ">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-700 text-center">
          Forgot Password?
        </h2>
        <p className="text-gray-500 text-sm text-center">
          Enter your email to receive a reset link.
        </p>
        {error && (
          <div className="text-red-600 text-sm text-center">{error}</div>
        )}
        {success && (
          <div className="text-green-600 text-sm text-center">{success}</div>
        )}
        <div>
          <label
            htmlFor="email"
            className="block text-gray-600 font-medium mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-primary text-center text-white py-2 rounded-lg shadow hover:bg-[#161d28] transition duration-200"
          disabled={loading}
        >
          {loading?<BeatLoader
            className=" text-white  "
            color="#ffffff"
          />:"Send Reset Link"}
        </button>
        
        <p className="text-center text-sm text-gray-400 mt-4">
          Remembered your password?{" "}
          <Link  to="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}

export default ForgetPassword;
