import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function AdminCard({price=500,name="waseem shose",reviews=375,value=3.5,admin=false,to ,images=[]}) {
  let options = {
    edit: false,
    value: value,
    isHalf: true,
    size: window.innerWidth<600?25: 27,
    
  };
  const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "contain",
  height: "300px",
};
  return (
    
    <div className="h-[75vh] px-3 shadow-md border border-black w-[20vw] bg-white relative py-3 hover:scale-105 transition duration-200 cursor-pointer  overflow-hidden rounded-lg">
      <div className="h-2/3 overflow-hidden">
      <Swiper
      className="h-full"
      controller={true}
      spaceBetween={50}
      slidesPerView={1}
      autoHeight={false}
      navigation
      pagination={{ clickable: true }}
      loop={true}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
    >
      {
        images.map((image)=>{
          return(

            <SwiperSlide className="h-full" key={image?._id}><img className="h-full object-contain overflow-hidden" src={image?.url} alt="Image" /></SwiperSlide>
          )
        })
      }
    </Swiper>
      </div>
      <p className=" text-lg font-semibold">{name}</p>
      <p className="text-lg  top-1/2 right-2/3">Rs: {price}</p>
      <div className="text-center flex justify-center items-center gap-x-3">
        <ReactStars {...options} />
        <p className="text-white">({reviews})</p>
      </div>
      <div className="flex justify-between items-center gap-x-3 text-white">
        <Link  className="bg-red-500 w-full text-center px-2 py-1 rounded-lg">
          delete
        </Link>
        <Link to={to} className="bg-red-500 w-full px-2 py-1 text-center rounded-lg">
          update
        </Link>
      </div>
    </div>
  );
}

export default AdminCard;