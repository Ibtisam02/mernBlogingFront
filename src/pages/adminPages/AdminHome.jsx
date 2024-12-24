import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPoster } from "../../redux/posterSlice/AddPoster";
import { BeatLoader, BounceLoader, FadeLoader } from "react-spinners";
import { getPosters } from "../../redux/posterSlice/GetPoster";
import { deletePoster } from "../../redux/posterSlice/DeletePoster";
import { FaShopify, FaUser } from "react-icons/fa";
import { getUsersCount } from "../../redux/userSlice/getUsersCount";
import { getProductsCount } from "../../redux/productSlice/countProducts";
import { FiPackage } from "react-icons/fi";
import { getOrdersCount } from "../../redux/orderSlice/getAllOrdersCount";
import { getDeliveredOrdersCount } from "../../redux/orderSlice/getAllDeliveredOrdersCount";
import { TbTruckDelivery } from "react-icons/tb";
import { getPendingOrdersCount } from "../../redux/orderSlice/getAllPendingOrdersCount";
import { getLowProductsCount } from "../../redux/productSlice/lowStockProducts";
import { BsHourglassSplit } from "react-icons/bs";
import { CgDanger } from "react-icons/cg";

function AdminHome() {
  let dispatch = useDispatch();
  let [img, setImg] = useState(null);
  let [posterLocalSrc, setPosterLocalSrc] = useState(null);
  let [productIdTosend,setProductIdToSend]=useState("");
  let loadAvatar = (e) => {
    setImg(e.target.files[0]);
    setPosterLocalSrc(URL.createObjectURL(e.target.files[0]));
  };
  console.log(img);
  let uploadPosterr = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("poster", img);
    formData.append("productId",productIdTosend)
    console.log(formData);
    dispatch(uploadPoster(formData)).then((res) => {
      console.log(res);
    });
  };

  let { isLoading } = useSelector((state) => state.poster);
  

  useEffect(() => {
    dispatch(getPosters()).then((res) => {
      console.log(res);
    });
    dispatch(getUsersCount()).then((res) => {
      console.log(res);
    });
    dispatch(getProductsCount()).then((res) => {
      console.log(res);
    });
    dispatch(getOrdersCount()).then((res) => {
      console.log(res);
    });
    dispatch(getDeliveredOrdersCount()).then((res) => {
      console.log(res);
    });
    dispatch(getPendingOrdersCount()).then((res) => {
      console.log(res);
    });
    dispatch(getLowProductsCount()).then((res) => {
      console.log(res);
    });
  }, [dispatch]);
  let { loading } = useSelector((state) => state.getPoster);
  let { posters } = useSelector((state) => state.getPoster);
  let { usersCount } = useSelector((state) => state.userCount);
  let { productsCount } = useSelector((state) => state.productCount);
  let { ordersCount } = useSelector((state) => state.orderCount);
  let { deliveredOrdersCount } = useSelector((state) => state.deliveredOrdersCount);
  let { pendingOrdersCountt } = useSelector((state) => state.pendingOrdersCount);
  let { lowStockProductsCount } = useSelector((state) => state.lowStockProductsCount);
console.log(productsCount)
  let deletePosterr = (e) => {
    dispatch(deletePoster(e.target.id)).then((res) => {
      console.log(res);
    });
  };
console.log(pendingOrdersCountt)
  return (
    <div className="ml-[70px] bg-zinc-400 h-screen px-4 py-4">
      <p className="text-center text-2xl font-bold">
        Welcome to Admin Dashboard
      </p>
      <div className="mt-5 flex flex-wrap h-[50vh] gap-4 justify-center">
        <form
          onSubmit={uploadPosterr}
          className="bg-white w-1/4 h-full px-3 py-2 flex flex-col rounded-md shadow-md"
        >
          <p className="text-center font-bold">Add a Poster</p>
          <p className="text-red-500 font-thin">
            width : 1896px and height : 448px{" "}
          </p>

          <div className="flex flex-col items-center justify-center gap-y-2 mt-5">
            <input
              onChange={loadAvatar}
              required
              className="m-auto"
              accept="image/*"
              type="file"
              name=""
              id=""
            />
            <img
              className="w-full h-20 object-contain"
              src={
                posterLocalSrc ||
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQIAAACUCAMAAABP2deIAAAAHlBMVEX09PTa2tr39/fk5OTh4eHs7Ozo6Ojd3d3x8fHX19fIcQROAAADSklEQVR4nO2bCY6kMAxFQzYn97/w2E6AAAVVLXU1GvOfRrWJlvAjcZxlnAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAID/Fs/cfQ93IFF7xaUc8923cw8iIYU41Wmaoit3386foq2eHz1p9BMRTfQMBa2/l5I0+hWSLw8w4HvwQaMn/dcNyC813X2D30QSHkfPwc8tX5t+iz7knFJgBdnmmKDpXoLX6IcHr9Fz7EmaP48Ikg/NKeDYJXqJnTZ9ntuBRF/Gvi8K6LZb/RJFMt740DsxbINXfJEr77jNL+KjJjxaLLRH73oRuJPgnVzubPUEHza9nh/9VRHsXWAFyZiC1GLnhC8ZT2vhq+szXx1sKXBFDMhQ/1FcYozMDQmSCsoSlH9D4gqZlm933vcvMtS8XBa8RfrN+s3GtDFyTD3BxePY+IZw883/Cl4SXH62glSn2iOJ04sayb4CHRJi+ygK4gf5oKWBaEfBmg9FQW6p/t3IwGQ7CuKogD6dCnutK40okFDakNAUFFkvYEJ7OyK/J2dIAde81GveroCbRa26YsKvtb/Im36UN06gxZKCNFGNWwU6MNDVGGlNgUyAhVGBzhvCQxRIyFU/DQoo+TnlPUCBFIW1tA+zAuqVQtnETcuLNQWBM5zOd0YFfWzc1osxzF+NKViWQV61AhraQHAyWbaoQMLSkMd02HLBMChQuya3ZUZbCtZl4c2IkEurmtZe0BZWgkEFvUT2h7pgs7ZONK8mB4Mdwc0l8lbBjnkrUXuHseqwV/vXCrhOWOdP3DysKZinvRcKxkVCSR7WFOiysLtSsFsmTTI+mlJQ5PBIOVdQD5FmYwo49jYp2CmopwZks9GggrxVIL/EqjJex2lLgZdyJ+w6QiytdJ7XVo9/ZEpBkllB8bsCWQ4dxUonx6uMKdC91TK0grDsMqaz01W2FLS91bS0gmEZ+fyEnWkF+aMzFMYU6KQ4+5/sI5hTkLkGiFokPlVBO0yn564eq6A8XkFx8yrJfkJ0iqU9RcVH4uJIz9qfbCTu4euMKci5lIvNozMMKRA268XPVPDYs0Yj6ceY+x8qVo5SAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADg6fwDiwoYmnU/UJMAAAAASUVORK5CYII="
              }
              alt="ht"
            />
            <input value={productIdTosend} onChange={(e)=>{setProductIdToSend(e.target.value)}} className="outline-none border px-1 placeholder:text-sm  border-black" id="toRdirect" placeholder="Product Id be careful" type="text"  />

            <div>
              {isLoading ? (
                <BeatLoader color="#000000 " />
              ) : (
                <input
                  type="submit"
                  className="bg-primary text-white px-2 py-1"
                  value="upload"
                />
              )}
            </div>
          </div>
        </form>
        <div className="bg-white w-1/4 h-full  px-3 py-2 flex flex-col justify-between rounded-md shadow-md">
          <p className="text-center font-bold">Delete a Poster</p>

          <div className="flex flex-col items-center overflow-y-scroll gap-y-4 mt-5">
            {loading?<FadeLoader  color="#000000" radius={0} height={6} width={20} />:<div className="flex flex-col gap-y-4">
              {posters?.map((poster, index) => {
                return (
                  <div
                    key={poster._id}
                    className="flex flex-col bg-red-600 gap-y-2 py-3 h-fit rounded-md justify-around items-center "
                  >
                    <img
                      className="h-16 w-full object-cover"
                      src={poster.posterUrl}
                      alt=""
                    />
                    <p
                      onClick={deletePosterr}
                      id={poster._id}
                      className="bg-white  text-black px-2 rounded-sm py-1 cursor-pointer"
                    >
                      Delete
                    </p>
                  </div>
                );
              })}
            </div>}
          </div>
        </div>
        <div className=" w-1/4 h-full  px-3 py-2 flex flex-col justify-between rounded-md ">
        <div className="w-full bg-orange-500 h-[47%] px-5 py-4 flex ">
          <div className="w-1/2 flex flex-col justify-around">
            <p className="text-lg font-bold text-center text-white ">
              Pending Orders
            </p>
            <p className="text-center text-2xl text-white">
            {pendingOrdersCountt != null ? pendingOrdersCountt : <FadeLoader color="#ffffff" radius={0} height={6} width={20} />}
            </p>
          </div>
          <div className="w-1/2 flex justify-center items-center">
            <BsHourglassSplit className="text-8xl text-white opacity-45" />
          </div>
        </div>
        <div className="w-full bg-pink-500 h-[47%]  px-5 py-4 flex ">
          <div className="w-1/2 flex flex-col justify-around">
            <p className="text-lg font-bold text-center text-white ">
              Low Stock
            </p>
            <p className="text-center text-2xl text-white">
              {lowStockProductsCount != null ? lowStockProductsCount : <FadeLoader color="#ffffff" radius={0} height={6} width={20} />}
            </p>
          </div>
          <div className="w-1/2 flex justify-center items-center">
            <CgDanger   className="text-8xl text-white opacity-45" />
          </div>
        </div>
            
        </div>
      </div>

      <div className="flex justify-center items-center flex-wrap gap-3 my-5">
        <div className="w-1/5 bg-purple-500 h-fit px-5 py-4 flex ">
          <div className="w-1/2 flex flex-col justify-around">
            <p className="text-lg font-bold text-center text-white ">
              Total Users
            </p>
            <p className="text-center text-2xl text-white">
              {usersCount != null ? usersCount : <FadeLoader color="#ffffff" radius={0} height={6} width={20} />}
            </p>
          </div>
          <div className="w-1/2 flex justify-center items-center">
            <FaUser className="text-9xl text-white opacity-45" />
          </div>
        </div>
        <div className="w-1/5 bg-red-500 h-fit px-5 py-4 flex">
          <div className="w-1/2 flex flex-col justify-around">
            <p className="text-lg font-bold text-center text-white">
              Total Products
            </p>
            <p className="text-center text-2xl text-white">
            {productsCount != null ? productsCount : <FadeLoader color="#ffffff" radius={0} height={6} width={20} />}
            </p>
          </div>
          <div className="w-1/2 flex justify-center items-center">
            <FiPackage  className="text-9xl text-white opacity-45" />
          </div>
        </div>
        <div className="w-1/5 bg-green-500 h-fit px-5 py-4 flex">
          <div className="w-1/2 flex flex-col justify-around">
            <p className="text-lg font-bold text-center text-white">
              Total Orders
            </p>
            <p className="text-center text-2xl text-white">
              {ordersCount != null ? ordersCount : <FadeLoader color="#ffffff" radius={0} height={6} width={20} />}
            </p>
          </div>
          <div className="w-1/2 flex justify-center items-center">
            <FaShopify className="text-9xl text-white opacity-45" />
          </div>
        </div>
        <div className="w-1/5 bg-blue-500 h-fit px-5 py-4 flex">
          <div className="w-1/2 flex flex-col justify-around">
            <p className="text-lg font-bold text-center text-white">
              Dilivered Orders
            </p>
            <p className="text-center text-2xl text-white">
            {deliveredOrdersCount != null ? deliveredOrdersCount : <FadeLoader color="#ffffff" radius={0} height={6} width={20} />}
            </p>
          </div>
          <div className="w-1/2 flex justify-center items-center">
            <TbTruckDelivery  className="text-9xl text-white opacity-45" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
