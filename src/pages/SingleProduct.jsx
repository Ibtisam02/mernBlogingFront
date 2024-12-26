import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../redux/productSlice/getSingleProduct";
import { useParams } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa";
import { BeatLoader, HashLoader } from "react-spinners";
import ReactStars from "react-rating-stars-component";
import toast from "react-hot-toast";
import { addReview } from "../redux/reviewSlice/AddAReview";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import InnerImageZoom from "react-inner-image-zoom";
import { addToCart } from "../redux/cartSlice/AddToCart";
import { getNoOfItemsInCart } from "../redux/cartSlice/NoOfItemsInCart";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../customcss/swiperSlides.css";

function SingleProduct() {
  let dispatch = useDispatch();
  let { id } = useParams();

  useEffect(() => {
    dispatch(getSingleProduct(id)).then((res) => {
      console.log(res);
      setSelectedColor(`${res?.payload?.product?.colors[0]?.color}`);
      setSelectedSize(res?.payload?.product?.sizes[0]?.size);
      setSizeToSend(res?.payload?.product?.sizes[0]?._id);
      setColorToSend(res?.payload?.product?.colors[0]?._id);
    });
  }, []);
  let { SingleProduct, loading } = useSelector(
    (state) => state.getSingleProductt
  );
  let { loadingForAddReview } = useSelector((state) => state.addAReview);

  let [quantity, setQuantity] = useState(1);
  let [hideDetail, setHideDetail] = useState(false);
  let [selectedSize, setSelectedSize] = useState("");
  let [selectedColor, setSelectedColor] = useState("");
  let [colorToSend, setColorToSend] = useState("");
  let [sizeToSend, setSizeToSend] = useState("");
  let [reOpen, setReOpen] = useState(false);
  console.log(SingleProduct?.sizes[0]?.size);

  //review
  let [rating, setRating] = useState(0);
  let [name, setName] = useState("");
  let [comment, setComment] = useState("");
  //submit review
  let submitReview = (e) => {
    e.preventDefault();
    if (rating <= 0) {
      return toast.error("select stars from 1 to 5!");
    }
    let obj = {
      rating,
      comment,
      productId: id,
    };
    dispatch(addReview(obj)).then((res) => {
      console.log(res);
    });
  };
  let addQuantity = () => {
    let stock = SingleProduct?.stock;
    console.log(stock < quantity);
    console.log(quantity < 10);

    if (stock > quantity && quantity < 10) {
      setQuantity(quantity + 1);
    } else {
      return toast.error("you can't add more");
    }
  };
  let { isLoading, message } = useSelector((state) => state.addToCartt);
  let addToCartHandler = () => {
    let product = {};
    let otherDetails = {};
    if (colorToSend) {
      otherDetails = { ...otherDetails, color: colorToSend };
      product = {
        product: {
          productId: SingleProduct?._id,
          quantity: quantity,
          otherDetails: { ...otherDetails },
        },
      };
    }
    if (sizeToSend) {
      otherDetails = { ...otherDetails, size: sizeToSend };
      product = {
        product: {
          productId: SingleProduct?._id,
          quantity: quantity,
          otherDetails: { ...otherDetails },
        },
      };
    }
    if (!colorToSend && !sizeToSend) {
      product = {
        product: {
          productId: SingleProduct?._id,
          quantity: quantity,
        },
      };
    }
    console.log(product);

    dispatch(addToCart(product)).then((res) => {
      console.log(res);
      dispatch(getNoOfItemsInCart()).then((res) => {
        console.log(res);
      });
    });

    
  };
  return loading ? (
    <div className="sweet-loading w-full h-screen flex justify-center items-center ">
      <HashLoader
        color="#ff0000"
        cssOverride={{}}
        loading={loading}
        size={60}
        speedMultiplier={2}
      />
    </div>
  ) : (
    <div className="w-screen flex justify-around items-center xxxsm:flex-col md:flex-row py-7 mt-20">
      <div className="xxxsm:w-[250px] xxsm:w-[300px] xsm:w-[400px]  rounded-md overflow-hidden">
        <Swiper
          className="h-full"
          id="swiper1"
          navigation
          
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination]}
          style={{ }}
          autoplay={true}
        >
          {SingleProduct?.images?.map((image, index) => {
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
      </div>
      <div className="px-3 md:w-[42%] xxxsm:w-full ">
        <h4 className="text-[18px]  font-[700] uppercase">
          {SingleProduct?.name}
        </h4>
        <p className="font-[600]">
          <span className="text-[16px]">
            Rs.
            {SingleProduct?.discount
              ? SingleProduct?.price - SingleProduct?.discount
              : SingleProduct?.price}
          </span>
          {SingleProduct?.discount ? (
            <span className="line-through text-[12px] pl-3">
              Rs.{SingleProduct?.price}
            </span>
          ) : null}
        </p>
        {SingleProduct?.sizes?.length > 0 ? (
          <div>
            <p className="font-bold mt-4">Size: {selectedSize}</p>
            <div className="flex gap-x-2 mt-4">
              {SingleProduct?.sizes?.map((size) => {
                return (
                  <p
                    onClick={(e) => {
                      setSelectedSize(size?.size);
                      setSizeToSend(size?._id);
                    }}
                    key={size?._id}
                    className={`w-8 border cursor-pointer  text-center ${
                      selectedSize === size?.size
                        ? "border-2 border-black"
                        : "border-black"
                    }`}
                  >
                    {size?.size}
                  </p>
                );
              })}
            </div>
          </div>
        ) : null}
        {SingleProduct?.colors?.length > 0 ? (
          <div>
            <p className="font-bold mt-4">
              Color:{" "}
              <input readOnly disabled value={selectedColor} type="color" />
            </p>
            <div className="flex gap-x-2 mt-4">
              {SingleProduct?.colors?.map((color) => {
                return (
                  <div
                    key={color?._id}
                    className={`w-12 h-6 p-[2px]  ${
                      selectedColor === color?.color
                        ? " border-2 border-black"
                        : "border-black"
                    }`}
                    onClick={() => {
                      setSelectedColor(color?.color);
                      setColorToSend(color?._id);
                    }}
                  >
                    <div
                      style={{ backgroundColor: `${color?.color}` }}
                      className="w-full h-full "
                    ></div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
        {SingleProduct?.stock > 0 ? (
          <div className="mt-4 flex gap-4">
            <div className="flex items-center gap-x-3">
              <div
                onClick={() => {
                  if (quantity <= 1) {
                    setQuantity(1);
                    return 0;
                  }
                  setQuantity((prv) => prv - 1);
                }}
                className="bg-primary w-5 h-5  rounded-full flex justify-center items-center"
              >
                <FaMinus className="text-white" />
              </div>
              <div>{quantity}</div>
              <div
                onClick={addQuantity}
                className="bg-primary w-5 h-5  rounded-full flex justify-center items-center"
              >
                <FaPlus className="text-white" />
              </div>
            </div>
            <div>
              {isLoading ? (
                <BeatLoader
                  className="float-right  text-white px-5 py-2.5"
                  color="#000000"
                />
              ) : (
                <button
                  onClick={addToCartHandler}
                  className="bg-primary px-6 py-2 font-bold text-white rounded-lg"
                >
                  ADD TO CART
                </button>
              )}
            </div>
          </div>
        ) : (
          <div>
            <button
              disabled
              className="bg-primary px-6 py-2 font-bold text-white rounded-lg opacity-45"
            >
              out of stock
            </button>
          </div>
        )}
        <div className="flex items-center my-2">
          <ReactStars
            count={5}
            value={SingleProduct?.rating}
            size={24}
            color2="#dc2626" // Red color for filled stars
            edit={false}
          />
          <span className="text-sm text-gray-500 ml-2">
            ({SingleProduct?.reviews?.length} reviews)
          </span>
        </div>
        <div
          className={`mt-4  overflow-hidden ${hideDetail ? "h-fit" : "h-6"}`}
        >
          <div
            className="hover:cursor-pointer flex items-center gap-x-3"
            onClick={() => {
              setHideDetail((prv) => !prv);
            }}
          >
            <h3 className="font-bold ">PRODUCT DETAILS </h3>
            <span>{hideDetail ? <FaMinus /> : <FaPlus />}</span>
          </div>
          <p>{SingleProduct?.description}</p>
          <div>
            <span className="font-semibold">Catagory:</span>
            <span className="text-sm"> {SingleProduct?.catagory}</span>
          </div>
        </div>
        <div className={`mt-4  overflow-hidden ${reOpen ? "h-fit" : "h-6"}`}>
          <div
            className="hover:cursor-pointer flex items-center gap-x-3"
            onClick={() => {
              setReOpen((prv) => !prv);
            }}
          >
            <h3 className="font-bold ">LEAVE A REVIEW </h3>
            <span>{reOpen ? <FaMinus /> : <FaPlus />}</span>
          </div>
          <form onSubmit={submitReview} className="flex flex-col gap-y-4 my-4">
            <div className="flex justify-start items-center">
              <p className="w-[15%]">Rate: {"  "}</p>
              <ReactStars
                count={5}
                classNames={"ml-2"}
                size={24}
                value={rating}
                color2="#dc2626" // Red color for filled stars
                edit={true}
                onChange={(e) => {
                  setRating(e);
                }}
              />
            </div>
            <div className="flex justify-start gap-x-3">
              <label className="w-[15%]" htmlFor="nameofreviwer">
                Comment:
              </label>
              <textarea
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                required
                className="w-[150px]  outline-none border-2 px-1 border-black"
                id="nameofreviwer"
                type="text"
              />
            </div>
            {loadingForAddReview ? (
              <BeatLoader
                className="float-right  text-white px-5 py-2.5"
                color="#000000"
              />
            ) : (
              <input
                className="bg-primary w-[100px] text-white px-1 rounded-md cursor-pointer"
                type="submit"
                value="Add Review"
              />
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
