import React, { useEffect, useState } from "react";
import { createACatagory, getAllCatagories } from "../../redux/catagorySlice/addACatagory";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createASubCatagory } from "../../redux/catagorySlice/addASubCatagory";

function SmallModel({text="Add",placeholder="Add",func1,showCat,showSubCat}) {
    
    let dispatch=useDispatch();
    let [catagoryText,setCatagoryText]=useState("");
    function funct() {
        
            if (showCat) {
                if (catagoryText.length<=0) {
                    return toast.error("type text in catagory field");
                     
                }
                dispatch(createACatagory({"catagory":catagoryText})).then((res) => {
                    console.log(res);
                    setCatagoryText("");
                  });
            }
            else if(showSubCat){
                if (catagoryText.length<=0) {
                    return toast.error("type text in Sub Catagory field");
                     
                }
                dispatch(createASubCatagory({"subCatagory":catagoryText})).then((res) => {
                    console.log(res);
                    setCatagoryText("");
                  });
            }
        
    }
  return (
    <div className="absolute flex  justify-center items-center left-1/2 -translate-x-1/2 py-4 h-[40vh] w-[30vw] top-1/2 -translate-y-1/2 z-30 bg-purple-600">
        
      <div>
        <label
          htmlFor="SubCatatgory"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center"
        >
         {text}
        </label>
        <input
          maxLength={20}
          value={catagoryText}
          type="text"
          id="SubCatatgory"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={placeholder}
          required
          onChange={(e)=>{setCatagoryText(e.target.value)}}
        />
        <input
          maxLength={20}
          type="button"
          className=" text-sm rounded-lg  block w-full p-2.5 bg-red-600 mt-3 text-white"
          value={"Add"}
          onClick={funct}
        />
        <input
          maxLength={20}
          type="button"
          className=" text-sm rounded-lg  block border border-black text-black w-full p-2.5 bg-white mt-3 "
          value={"Close"}
          onClick={func1}
        />
      </div>
    </div>
  );
}

export default SmallModel;
