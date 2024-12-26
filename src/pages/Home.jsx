import React, { useState, useEffect } from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Card from "../components/compos/Card";
import Metadata from "../components/layout/Metadata";
import { useDispatch, useSelector } from "react-redux";
import { getPosters } from "../redux/posterSlice/GetPoster";
import ProductCard from "../components/compos/ProductCard";
import {
  firstSec,
  forthSec,
  secondSec,
  thirdSec,
} from "../redux/productSlice/HomeProducts";
import { FaLocationArrow } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "../customcss/swiperSlides.css";
import { getAllReviews } from "../redux/reviewSlice/GetAllReviews";
import ReactStars from "react-rating-stars-component";
import { HashLoader } from "react-spinners";

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  height: "300px",
};
let product = {
  images: [
    {
      _id: "idgfhslkfhdsfgfhs",
      url: "https://res.cloudinary.com/dj0k9z7tr/image/upload/v1732551729/uploads/jghvelyhdpavjpemgld9.webp",
    },
    {
      _id: "idslkfhdsfs",
      url: "https://res.cloudinary.com/dj0k9z7tr/image/upload/v1731077586/uploads/gt0p2uqfatuqytkqcc4f.png",
    },
  ],
  name: "waseem shoose",
  rating: 3,
  reviews: ["f", "m", "g"],
  price: 5000,
  originalPrice: 4500,
  discount: 10,
};
function Home() {
  let dispatch = useDispatch();

  useEffect(() => {}, []);

  const { posters } = useSelector((state) => state.getPoster);
  const { reviews } = useSelector((state) => state.getAllReviews);
  const {
    loading,
    firstSecProducts,
    secondSecProducts,
    thirdSecProducts,
    fourthSecProducts,
  } = useSelector((state) => state.homeProducts);

  //get home products from backend

  useEffect(() => {
    dispatch(getPosters()).then((res) => {
      console.log(res);
    });
    dispatch(
      firstSec({ catagory: "chrome book", resultsPerPage: 12, sort: "descH" })
    ).then((res) => {
      console.log(res);
    });
    dispatch(
      secondSec({ catagory: "phone", resultsPerPage: 12, sort: "descH" })
    ).then((res) => {
      console.log(res);
    });
    dispatch(
      thirdSec({ catagory: "laptops", resultsPerPage: 12, sort: "descH" })
    ).then((res) => {
      console.log(res);
    });
    dispatch(
      forthSec({ catagory: "air pods", resultsPerPage: 12, sort: "descH" })
    ).then((res) => {
      console.log(res);
    });
    dispatch(getAllReviews()).then((res) => {
      console.log(res);
    });
  }, []);
  let [hoverOn, setHoverOn] = useState(false);
  console.log(reviews);

  return (
    <>
      {loading ? (
        <div className="sweet-loading w-screen h-screen flex justify-center items-center">
          <HashLoader
            color="#ff0000"
            cssOverride={{}}
            loading={loading}
            size={60}
            speedMultiplier={2}
          />
        </div>
      ) : (
        <div div className="transition-all ease-in duration-300 mt-20">
          <Metadata title={"Ecommerce"} />

          <div className="slide-container  -z-30  ">
            <Swiper
              pagination={{
                type: "fraction",
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="homeSwiper"
            >
              {posters?.map((posters, index) => (
                <SwiperSlide>
                  <Link
                    to={
                      posters?.productIdToRedirect
                        ? `/product/${posters?.productIdToRedirect}`
                        : null
                    }
                    key={index}
                  >
                    <img
                  src={posters?.posterUrl}
                  alt={`Product Slide ${index + 1}`}
                  className="w-full xxxsm:h-[200px] md:h-[300px] object-cover "
                />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-5 xxsm:my-3 md:my-10">
            <p className="text-xl font-semibold xxxsm:hidden md:block">Shop by category {"->"}</p>
            <Link className="xxsm:w-[40%] md:w-fit flex justify-center" to={"/productsCat/phone"}>
              <div>
                <img
                  className="rounded-full h-16 w-16  shadow-2xl object-cover"
                  src="data:image/jpeg;base64,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"
                  alt="img"
                />
                <p>Mobiles</p>
              </div>
            </Link>
            <Link className="xxsm:w-[40%] md:w-fit flex justify-center"  to={"/productsCat/laptops"}>
              <div>
                <img
                  className="rounded-full h-16 w-16  shadow-2xl object-cover"
                  src="data:image/jpeg;base64,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"
                  alt="img"
                />
                <p>Laptops</p>
              </div>
            </Link>
            <Link className="xxsm:w-[40%] md:w-fit flex justify-center"  to={"/productsCat/air pods"}>
              <div>
                <img
                  className="rounded-full h-16 w-16  shadow-2xl object-cover"
                  src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8PDxAQEA8NDw8PEA4ODg4PDRANDQ0NFREWFhURFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDQ0NDw0PDysZFRkrLS04Kzc4KysrLTc4KysrKysrODcrLDg4KysrKy0rKzQ4LCsuKysrKysrKzcrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAQMEAgUGB//EADsQAAIBAgIECggGAgMAAAAAAAABAgMRBCESMVFhBRMUQVJxkaHB0QYiMkJygZOxBzNiguHwI/EWksL/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAXEQEBAQEAAAAAAAAAAAAAAAAAEQEh/9oADAMBAAIRAxEAPwD9xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACJSSAkFUsRFf7sc8o3dzEF4KOUbn2PyJ4/c+x+RYLgU8o3PsfkRylbH2PyJBeCjlK2PsfkRypbH2PyLBoBn5Utj7H5DlK2PsfkINAKOUrY+x+Q5RufY/IkF4KeUbn2PyI5RufY/IsF4KOUbn2PyJWIX9ZILgcxqJnQAAAAAAAAAAAADipKyA4rVrZLX4mebsnKTslm88l5kwzz26uo8vhnEZqC1L1pdfMjSOMTwnJ5Q9SO23rPyMUq83rlJ9cmV3uSB0qj2vtZ0qj2vtZWTcC1VJdKX/ZlkMXVjqm3ufrfcoUjpAepheEVJ6M0oy5n7rfgbT5/RvkepwdXco2euNlfauYDYZsXjY08vak9UV47CzEVdCLls1La+Y8R3d5PNvNsC2pjqsve0Vsjl36yl1J88pPrkwcuQDTe19rHGPa+1kXOWB2q0l70u1mmhwjUjrektks+8xBsD6PD1YzjpRy2rY9jRppVrZM+d4OxOhNbJerLwZ70lfw3MDaCjDVLq393ovMqAAAAAAAAGbGPL5M0mbGLLfZ26y4OT5fGVdKUpbW38uY+hxM/wDHNroSa7D5pxbyWtuyW8qOaSlJ2inJvUkrsvlhKqlotQU3qpurTVR/tvc+g4OwsaMLK2k85y529nUfFel34bQxlWpicPXdGvUenKFWPGUZT2pr1od6Wwg3VtODtOMovY00cKo2fAy9JeFuA5qjwjSliMK3aMa0+MjJLW6GI2292WzVHWfdcC4/C4+hynBVOMp3tUpy9WtQn0Jx5vHmuBqgaacDilA20oFFSgacBG03vi/ujtUi3DQtd/JAc8IK8Uv1eDMXFnpVo3XeUKFwMFSBlqI9SpTMdaAGCUmRGo27JNvmSzbNFWnCEJ1atSFGhTWlUq1GowhHrPzzhD8RK+LqPCcCUai0no8fGmp42ulrlGLypQ/VLPP3SD9EeGqqykoQcvZVSrCnKXUm7nGIo1KbtUjKOy+p9TPlOBPwqrVWqvCWJk5Ss506cnWrS3TrTvn1J9Z+qOjDi1SavBRUEm27RSss3nfeB8nCR9Pg6unTjLas+tZM+dxGGdOco60s09seZnscCy/xPdJ27EUehh36z6/ukbDHhs5N733K3gzYTVAAQAAAAAApxcW43Wbjmlt2ouAHjKqtWuMr2fNnrRgw9DRqZ6o5rfsPQ4Rwjg3KKvCWco9B7VuME6jUb3vs2mkepCsixTPBhirGujiwNnCGCo4mlOjXpwrUqitOnOKlF/zvPivRX8NI8GcIyxWGxdRYWcKkJYScNKTUtUXUvmk7NXV8vmfZwroujUAz18Kk7rUzqFOxZiKto5e02ox+J5fz8i5Tytr8QM0mSpnGJoxlmsn3P5HnSnFOzcE1rTauB6nGEJo8vjYbYdsTZhqMdcvklkBplG5SsNdm2M0tSRTTq+vKL3Sj8L5vk0+4D5j8QvQqfC1LD0I4t4alSqSqVYKlxirZJRftLNeta/SPV9FvRnCcF0VRwtPRulxlWVpVq8l705c/VqXMj1pTKp1gL3M4lVSMVXFWMVXF3Av4SWnota/Zf3Row74uCgvaeb3bWY6FVtP+2NGDw8qrsrqPvz5+pbwPU4OV7y91erHfbW/D5M2nNOCilFKySslsR0ZUAAAAAAAAAM1Z+uvh8WBpPneFlFTcYqyXMllc96mKjyKPjm78z7Dyv+Q4eON5E1XjVtG03RlxDk4qSgp6r2fVfLWfezZw2VHiQlJF0a7W09S5MZ23geNyu9Va7QV9XvPJf+jVyzd3Ho6a2d44xbO8DyZ4jr7DxMVOlUnJyjG97XlFXdj7HjN3eOM3d4HxOhRWajTbWaWisz26GKuk881fUe3xm7vHGbu8DzY4y3+jPi8XZwmk8novL3ZfyontcZu7yOMWzvA8t4m+3sKZzkz2ZVNiscXA+J9IfSKhgpU41ePnKq8o0aMqrjG9tOVtS73nbUenq5n2M+kTOosDwsJLPNPPJ5H1VKKSSiklbJIqostkTR2DNPXH4kaSKAAAAAAAAGar+Z+1fdmkzVfzP2r7suC2mRU1E0yKmoIzzK2WTKmURcXIAE3FyABNxcghsDq4uU4eq5xUnGUG7+rL2lmWjNvUqbkXIAEggASjuJwjuIVool0iqiWy1EFM9cfiRpM09cfiRpGqAAgAAAAABmq/mftX3ZpM1b8z9q+7LgtpkVNRNMipqCM8yplsytlHBB0yAIAAQAAAAAAAAAAEosicI7iFaKJbIqolstRBTPXH4kaTNPXH4l9zSNUABAAAAAADNW9tfD4mkz4lZxfWv72FwWUyKhEGTMIzzK2WyK2UckEgDkEkAASAiAAFAAAAJAI7RydIC+iXSKqR3JgVy9qPWaTNDOa3Jvw8TSTVAAQAAAAAArxELxe1ZrrRYAMlOV0W3KqsdCX6Zdz2EqRpETRWy55lTA4ZBLIAggAASQAAAAAAIEogIK6O4nCLYZAXRIbOXI5zk9FfN7EBbhle8tuS6l/e4vIjFJJLUsiTKgAAAAAAAAAAiUU1Z5pmGrTlDPOUdvOus3gDzY10+clzRor4KE87OL2xyZiq8GVPcqRe6UWu9eRqo7ckc6RmlgcUuak+qo/FEcjxXQh9RCjVpEaRm5HiuhH6iHI8V0I/UQo06Q0jNyPE9CP1EOR4noR+ohRp0hpGbkeJ6EfqIcjxPQj9RCjRpDSM/I8T0I/UQ5HiehH6iFGnSCkjLyPFdCP1ESsDiujTXXU8kKNamieNS5yinwXXftVKcfhUp/exsocGQjnJym/1ZR7EKOKTlP2VlzyepG6lSUVZfN87Z0lbJZLYSSqAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/9k="
                  alt="img"
                />
                <p>AirPods</p>
              </div>
            </Link>
            <Link className="xxsm:w-[40%] md:w-fit flex justify-center "  to={"/productsCat/chrome book"}>
              <div className="flex flex-col justify-center items-center">
                <img
                  className="rounded-full h-16 w-16  shadow-2xl object-cover"
                  src="data:image/jpeg;base64,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"
                  alt="img"
                />
                <p className="text-center">Chrome Books</p>
              </div>
            </Link>
          </div>
          {firstSecProducts?.length && (
            <div className="my-10 w-screen xxsm:px-3 md:px-10 flex flex-col justify-center items-center">
              <Link
                to={"/productsCat/chrome book"}
                className="flex justify-between my-4 w-full"
              >
                <h1 className="xxsm:text-sm xsm:text-xl sm:text-2xl md:text-3xl font-bold">Latest Chrome Books</h1>
                <button
                  onMouseOver={() => {
                    setHoverOn(true);
                  }}
                  onMouseLeave={() => {
                    setHoverOn(false);
                  }}
                  className={`${
                    hoverOn ? "w-32" : " w-[85px]"
                  } flex-nowrap text-center flex justify-between overflow-hidden  items-center gap-x-5 border border-black border-opacity-30 px-3 py-1 cursor-pointer hover:bg-red-600  hover:text-white transition-all ease-in duration-300`}
                >
                  <p className="text-nowrap">View All</p>{" "}
                  <FaLocationArrow className="text-white" />
                </button>
              </Link>
              <div className="py-5 flex flex-wrap sm:gap-10 xxxsm:gap-4 justify-center items-center">
                {firstSecProducts?.map((productt, i) => {
                  return <ProductCard key={productt?._id} product={productt} />;
                })}
              </div>
            </div>
          )}
          <div className=" bg-no-repeat bg-center bg-cover bg-fixed bg-[url('https://media.geeksforgeeks.org/wp-content/uploads/20231102162212/CASH-ON-DELIVERY-copy-(2).webp')] h-[70vh]"></div>
          {secondSecProducts?.length && (
            <div className="my-10 w-screen xxsm:px-3 md:px-10 flex flex-col justify-center items-center">
              <Link
                to={"/productsCat/chrome book"}
                className="flex justify-between my-4 w-full"
              >
                <h1 className="xxsm:text-sm xsm:text-xl sm:text-2xl md:text-3xl font-bold">Latest Chrome Books</h1>
                <button
                  onMouseOver={() => {
                    setHoverOn(true);
                  }}
                  onMouseLeave={() => {
                    setHoverOn(false);
                  }}
                  className={`${
                    hoverOn ? "w-32" : " w-[85px]"
                  } flex-nowrap text-center flex justify-between overflow-hidden  items-center gap-x-5 border border-black border-opacity-30 px-3 py-1 cursor-pointer hover:bg-red-600  hover:text-white transition-all ease-in duration-300`}
                >
                  <p className="text-nowrap">View All</p>{" "}
                  <FaLocationArrow className="text-white" />
                </button>
              </Link>
              <div className="py-5 flex flex-wrap sm:gap-10 xxxsm:gap-4 justify-center items-center">
                {secondSecProducts?.map((productt, i) => {
                  return <ProductCard key={productt?._id} product={productt} />;
                })}
              </div>
            </div>
          )}
          <div
            className={` bg-no-repeat bg-center bg-cover bg-fixed bg-[url('https://res.cloudinary.com/dj0k9z7tr/image/upload/v1734607400/you%20can%20delete/r4ndyre056ujqr19mtgt.webp')] h-[70vh]`}
          ></div>
          {thirdSecProducts?.length && (
            <div className="my-10 w-screen xxsm:px-3 md:px-10 flex flex-col justify-center items-center">
              <Link
                to={"/productsCat/chrome book"}
                className="flex justify-between my-4 w-full"
              >
                <h1 className="xxsm:text-sm xsm:text-xl sm:text-2xl md:text-3xl font-bold">Latest Chrome Books</h1>
                <button
                  onMouseOver={() => {
                    setHoverOn(true);
                  }}
                  onMouseLeave={() => {
                    setHoverOn(false);
                  }}
                  className={`${
                    hoverOn ? "w-32" : " w-[85px]"
                  } flex-nowrap text-center flex justify-between overflow-hidden  items-center gap-x-5 border border-black border-opacity-30 px-3 py-1 cursor-pointer hover:bg-red-600  hover:text-white transition-all ease-in duration-300`}
                >
                  <p className="text-nowrap">View All</p>{" "}
                  <FaLocationArrow className="text-white" />
                </button>
              </Link>
              <div className="py-5 flex flex-wrap sm:gap-10 xxxsm:gap-4 justify-center items-center">
                {thirdSecProducts?.map((productt, i) => {
                  return <ProductCard key={productt?._id} product={productt} />;
                })}
              </div>
            </div>
          )}
          {fourthSecProducts?.length && (
            <div className="my-10 w-screen xxsm:px-3 md:px-10 flex flex-col justify-center items-center">
              <Link
                to={"/productsCat/chrome book"}
                className="flex justify-between my-4 w-full"
              >
                <h1 className="xxsm:text-sm xsm:text-xl sm:text-2xl md:text-3xl font-bold">Latest Chrome Books</h1>
                <button
                  onMouseOver={() => {
                    setHoverOn(true);
                  }}
                  onMouseLeave={() => {
                    setHoverOn(false);
                  }}
                  className={`${
                    hoverOn ? "w-32" : " w-[85px]"
                  } flex-nowrap text-center flex justify-between overflow-hidden  items-center gap-x-5 border border-black border-opacity-30 px-3 py-1 cursor-pointer hover:bg-red-600  hover:text-white transition-all ease-in duration-300`}
                >
                  <p className="text-nowrap">View All</p>{" "}
                  <FaLocationArrow className="text-white" />
                </button>
              </Link>
              <div className="py-5 flex flex-wrap sm:gap-10 xxxsm:gap-4 justify-center items-center">
                {fourthSecProducts?.map((productt, i) => {
                  return <ProductCard key={productt?._id} product={productt} />;
                })}
              </div>
            </div>
          )}
          {reviews?.reviews?.length > 0 ? (
            <div className="px-5 my-3 w-full xxsm:hidden lg:block">
              <h1 className=" text-3xl font-bold mb-3">Reviews</h1>
              <Swiper
                navigation
                slidesPerView={3}
                spaceBetween={30}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination, Navigation]}
                className="myuSwiper"
              >
                {reviews?.reviews?.map((rev, i) => {
                  return (
                    <SwiperSlide
                      key={rev?._id}
                      className="border p-4 rounded-md mb-4 bg-white shadow-lg "
                    >
                      <h2 className="text-xl font-semibold text-gray-800 text-center">
                        {reviews?.name.length < 25
                          ? reviews?.name
                          : reviews?.name.slice(0, 25) + "..."}
                      </h2>
                      <h3 className="text-sm font-semibold text-gray-800 text-center">
                        {rev.name}
                      </h3>
                      <div className="my-2 flex justify-center">
                        <ReactStars
                          count={5}
                          value={rev.rating}
                          size={24}
                          edit={false} // Makes it read-only
                          color2="#ffd700"
                        />
                      </div>
                      <p className="text-gray-600 text-center">
                        "{rev.comment}"
                      </p>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
}

export default Home;
