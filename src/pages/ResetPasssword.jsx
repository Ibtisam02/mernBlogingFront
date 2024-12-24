import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../redux/userSlice/forgetPassword";
import { useNavigate, useParams } from "react-router-dom";

function ResetPasssword() {
    let dispatch=useDispatch();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
let {token}= useParams();
let navigate=useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      setSuccess("");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setSuccess("");
      return;
      
    }
    let data={
      token:token,
      "password":password,
      "confirmPassword":confirmPassword
    }
    dispatch(resetPassword(data)).then((res)=>{
      if (res.payload?.success) {
        setSuccess("Password reset successfully!");
        navigate("/home")
      }
      else{
        setSuccess("")
        setError("Somthing went Wrong!");

      }
    })
    
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 max-w-md w-full space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-700 text-center">
          Reset Your Password
        </h2>
        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}
        {success && (
          <div className="text-green-500 text-sm text-center">{success}</div>
        )}
        <div>
          <label
            htmlFor="password"
            className="block text-gray-600 font-medium mb-2"
          >
            New Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Enter new password"
          />
        </div>
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-gray-600 font-medium mb-2"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Confirm new password"
          />
        </div>

        
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-lg shadow hover:bg-[#0c1118] transition duration-200"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default ResetPasssword;
