import React from "react";
import ReactStars from "react-rating-stars-component";

function Card({
  price = 500,
  name = "waseem shose",
  reviews = 375,
  value = 3.5,
}) {
  let options = {
    edit: false,
    value: value,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 22,
  };
  return (
    <div className="h-fit px-3 shadow-md border border-black w-[20vw] bg-white relative py-3 hover:scale-105 transition duration-200 cursor-pointer  overflow-hidden rounded-2xl">
      <div className="h-2/3">
        <img
          className="w-52  top-0 right-5 z-10 scale-x-125"
          src="https://pngimg.com/uploads/running_shoes/running_shoes_PNG5817.png"
          alt=""
        />
      </div>
      <p className=" text-lg font-semibold">{name}</p>
      <p className="text-lg  top-1/2 right-2/3">Rs: {price}</p>
      <div className="text-center flex justify-center items-center gap-x-3">
        <ReactStars {...options} />
        <p className="text-white">({reviews})</p>
      </div>
      <div className="flex justify-around text-white">
        <button className="bg-red-500 w-full px-2 py-1 rounded-lg">
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default Card;
