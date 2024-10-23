import React from "react";
import ReactStars from "react-rating-stars-component";

function Card() {
  let options = {
    edit: false,
    value: 2.5,
    isHalf: true,
    size: window.innerWidth<600?25: 27,
  };
  return (
    <div className="h-[350px] shadow-2xl w-[20vw] bg-primary relative py-3 hover:scale-105 transition duration-200 cursor-pointer  overflow-hidden rounded-2xl">
      <div className="h-2/3">
        <img
          className="w-52 absolute top-0 right-5 z-10 scale-x-125"
          src="https://pngimg.com/uploads/running_shoes/running_shoes_PNG5817.png"
          alt=""
        />
        <div className="w-[290px] absolute  h-[290px] scale-150 bg-red-500 rounded-full -top-40 -right-24"></div>
        <p className="text-white text-2xl absolute top-1/2 right-2/3">Rs: 500</p>
      </div>
      <p className="text-white text-center text-2xl">Waseem Shose</p>
      <div className="text-center flex justify-center items-center gap-x-3">
        <ReactStars {...options} />
        <p className="text-white">(375)</p>
      </div>
      <div className="flex justify-around text-white">
        <button className="bg-red-500 px-2 py-1 rounded-lg">Add to cart</button>
        
        <button className="bg-red-500 px-2 py-1 rounded-lg">Order Now</button>
      </div>
    </div>
  );
}

export default Card;
