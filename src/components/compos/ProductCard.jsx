import React from "react";
import ReactStars from "react-rating-stars-component";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../customcss/swiperSlides.css";
import { Link } from "react-router-dom";
const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product?._id}`}>
      <div className="xxxsm:w-[95vw] xxsm:w-[165px]  xsm:w-[220px] sm:w-[250px] bg-white rounded-lg shadow-lg  -z-30">
        {/* Image Slider */}
        <Swiper
          className="h-full"
          id="swiper1"
          navigation
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination]}
          style={{ height: "300px" }}
          autoplay={true}
        >
          {product?.images?.map((image, index) => {
            return (
              <SwiperSlide key={image?._id + "55"}>
                <img
                  src={image?.url}
                  alt={`Product Slide ${index + 1}`}
                  className="w-full h-full object-cover "
                />
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* Product Info */}
        <div className="xxxsm:p-2 sm:p-4">
          {/* Product Name */}
          <h3 className="xxxsm:text-sm sm:text-lg xxxsm:font-medium sm:font-bold text-gray-800">
            {product?.name.length > 19
              ? product?.name.slice(0, 19) + ".."
              : product?.name}
          </h3>

          {/* Rating Stars */}
          <div className="flex items-center xxxsm:my-1 sm:my-2">
            <span>
              <ReactStars
                count={5}
                value={product?.rating}
                size={24}
                color2="#dc2626" // Red color for filled stars
                edit={false}
              />
            </span>
            <span className="text-sm text-gray-500 ml-2 xxxsm:hidden sm:inline">
              ({product?.reviews?.length} reviews)
            </span>
          </div>

          {/* Price and Discount */}
          <div className="flex items-center justify-between mt-2">
            <div>
              <span className=" xxxsm:font-semibold sm:text-xl sm:font-bold text-gray-800">
                
                {product?.discount !== undefined
                  ? (Number(product?.price) - Number(product?.discount)).toLocaleString()
                  : Number(product?.price).toLocaleString()}
              </span>
              {product?.discount > 0 && (
                <span className="text-sm line-through text-gray-400 ml-2 xxxsm:hidden sm:inline">
                  {product?.price}
                </span>
              )}
            </div>
            {product.discount && (
              <div className="flex items-center bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="xxxsm:h-3 xxxsm:w-3 sm:h-4 sm:w-4 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.158c.969 0 1.371 1.24.588 1.81l-3.357 2.47a1 1 0 00-.364 1.118l1.286 3.965c.3.922-.755 1.688-1.54 1.118l-3.357-2.47a1 1 0 00-1.176 0l-3.357 2.47c-.785.57-1.84-.196-1.54-1.118l1.286-3.965a1 1 0 00-.364-1.118L2.528 9.393c-.783-.57-.381-1.81.588-1.81h4.158a1 1 0 00.95-.69L9.049 2.927z" />
                </svg>
                {((product?.discount / product?.price) * 100).toFixed(1)}% OFF
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
