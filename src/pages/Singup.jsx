import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { IoMdKey } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { HiEye } from "react-icons/hi";
import { HiEyeOff } from "react-icons/hi";
import Metadata from "../components/layout/Metadata";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/authSlice";

function Singup() {
  const dispatch = useDispatch();
  let [showPass, setShowPass] = useState(false);
  let [avatarUrl, setAvatarUrl] = useState(null);

  //data to send to backend
  let [avatar, setAvatar] = useState(null);
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  //load avatar to frontend and show avatar
  let loadAvatar = (e) => {
    setAvatar(e.target.files[0]);
    setAvatarUrl(URL.createObjectURL(e.target.files[0]));
  };

  // handle backend request to create account
  const handleSubmitSingup = (e) => {
    e.preventDefault();
    let formData=new FormData();
    formData.append("avatar",avatar);
    formData.append("name",name);
    formData.append("email",email);
    formData.append("password",password);
    dispatch(registerUser(formData)).then((data) => {
      console.log(data);
    });
  };
  return (
    <>
      <Metadata title={"Ecommerce singup"} />
      <div className="h-fit gap-y-5  w-screen my-10 flex flex-col justify-center items-center">
        <form
          onSubmit={handleSubmitSingup}
          className="bg-primary h-[90%] flex py-5 flex-col  items-center justify-center w-[25%]  text-white rounded-md text-center"
        >
          <h1 className="text-2xl font-bold my-3">SingUp</h1>
          <div className="relative w-[70px]  h-[70px]">
            <label className="w-full h-full" htmlFor="avatar">
              <img
                className=" object-cover rounded-full  bg-white w-full h-full"
                src={
                  avatarUrl ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb8EsZEXeyr8S2UO2EsjdXjR9UVSjOPnXjUA&s"
                }
                alt=""
              />
            </label>
            <input
              onChange={loadAvatar}
              className="hidden"
              type="file"
              name="avatr"
              id="avatar"
              accept="image/*"
              required
            />
          </div>
          <div className="flex flex-col justify-center items-center gap-y-7 mt-5">
            <div className="relative focus-within:text-red-500 transition duration-1000">
              <FaUser className="absolute w-5 h-5 ml-3 top-1/4 left-2 text-2xl pointer-events-none" />
              <input
                placeholder="Name"
                className="text-[1.30rem]  py-1 px-8 w-[90%]  text-white rounded-md bg-transparent outline-none border-white border-[1.5px] border-b-[3px] before:"
                id="name"
                type="text"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="relative focus-within:text-red-500 transition duration-1000">
              <MdEmail className="absolute w-5 h-5 ml-3 top-1/4 left-2 text-2xl pointer-events-none" />
              <input
                placeholder="Email"
                className="text-[1.30rem]  py-1 px-8 w-[90%]  text-white rounded-md bg-transparent outline-none border-white border-[1.5px] border-b-[3px] before:"
                id="email"
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative focus-within:text-red-500 transition duration-1000">
              <IoMdKey className="absolute w-5 h-5 ml-3 top-1/4 left-2 text-2xl pointer-events-none" />
              {showPass ? (
                <HiEye
                  onClick={() => setShowPass(false)}
                  className="absolute w-5 h-5 right-5 top-1/4 cursor-pointer  "
                />
              ) : (
                <HiEyeOff
                  onClick={() => setShowPass(true)}
                  className="absolute w-5 h-5 right-5 top-1/4 cursor-pointer "
                />
              )}
              <input
                placeholder="Password"
                className="text-[1.30rem] py-1 px-8 w-[90%]  text-white rounded-md bg-transparent outline-none border-white border-[1.5px] border-b-[3px] before:"
                id="password"
                type={showPass ? "text" : "password"}
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <input
              className="w-[90%] bg-red-500 py-2 px-3 mt-6 hover:opacity-80 rounded-md transition duration-500 font-semibold cursor-pointer"
              type="submit"
              value="Create Account"
            />
          </div>

          <p className="mt-3">
            Already have an account?{" "}
            <Link to={"/login"} className="underline text-red-500">
              {" "}
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Singup;
