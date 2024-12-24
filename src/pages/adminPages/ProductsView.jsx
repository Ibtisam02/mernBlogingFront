import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchProductsOrFilter } from "../../redux/productSlice/searchProductsOrfilter";
import { CiSearch } from "react-icons/ci";
import Card from "../../components/compos/Card";
import { HashLoader } from "react-spinners";
import AdminCard from "../../components/compos/AdminCard";
import { Link } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import { getAllSubCatagory } from "../../redux/catagorySlice/addASubCatagory";
import { getAllCatagories } from "../../redux/catagorySlice/addACatagory";
import ProductCard from "../../components/compos/ProductCard";
function ProductsView() {
  let [query, setQuery] = useState("");

  let dispatch = useDispatch();
  useEffect(() => {
    let queries = {
      resultsPerPage: 100,
      keyword: query,
    };
    dispatch(searchProductsOrFilter(queries)).then((res) => {
      console.log(res);
    });
  }, [dispatch, query]);

  useEffect(() => {
    dispatch(getAllCatagories()).then((res) => {
      console.log(res);
    });
  }, []);
  useEffect(() => {
    dispatch(getAllSubCatagory()).then((res) => {
      console.log(res);
    });
  }, []);
  let { createdSubCatagory } = useSelector((state) => state.createSubCatagory);
  let { createdCatagory } = useSelector((state) => state.createCatagory);
  let { products, loading } = useSelector((state) => state.searchProduct);

  console.log(products);

  let [available, setAvailable] = useState(false);
  let [fromPrice, setFromPrice] = useState(Number);
  let [toPrice, setToPrice] = useState(Number);
  let [minRating, setMinRating] = useState(Number);
  let [catagory, setCatagory] = useState("");
  let [subCatagory, setSubCatagory] = useState("");
  let [minStock, setMinStock] = useState(Number);
  let [resultPerPage, setResultPerPage] = useState(100);

  let filterQuries = {};
  let filter = () => {
    if (available) {
      console.log("data");
      filterQuries = { ...filterQuries, "stock[gt]": 0 };
      console.log(filterQuries);
    }
    if (fromPrice) {
      console.log("data2");
      filterQuries = { ...filterQuries, "price[gte]": fromPrice };
      console.log(filterQuries);
    }
    if (toPrice) {
      filterQuries = { ...filterQuries, "price[lte]": toPrice };
    }
    if (minRating) {
      filterQuries = { ...filterQuries, "rating[gte]": minRating };
    }
    if (catagory.length > 0) {
      filterQuries = { ...filterQuries, catagory: catagory };
    }
    if (subCatagory.length > 0) {
      filterQuries = { ...filterQuries, subCatagory: subCatagory };
    }
    if (minStock) {
      filterQuries = { ...filterQuries, "stock[gte]": minStock };
    }
    filterQuries = { ...filterQuries, resultsPerPage: resultPerPage };
    console.log(filterQuries);
    dispatch(searchProductsOrFilter(filterQuries)).then((res) => {
      console.log(res);
    });
  };
  let [searchActive, setSearchActive] = useState(false);
  console.log(catagory, subCatagory);
  return (
    <div className="ml-[70px]">
      <div className=" flex flex-col justify-center items-center  h-24 w-full">
        <div className="flex justify-center items-center z-20  border border-red-500 w-1/2 h-10 rounded-br-sm rounded-tr-sm ">
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            onClick={() => setSearchActive(true)}
            className="outline-none text-2xl h-full w-full focus:shadow-xl pl-1"
            type="text"
            name=""
            id=""
          />
          <CiSearch
            onClick={() => {
              setSearchActive(false);
            }}
            className="bg-red-600 text-2xl p-1 text-white w-20 h-full cursor-pointer"
          />
          {searchActive ? (
  <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-[85vw] bg-white shadow-2xl rounded-lg border border-gray-300">
    <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-red-600 to-red-400 rounded-t-lg">
      <p className="text-lg font-semibold text-white">Search Results</p>
      <IoCloseSharp
        onClick={() => {
          setSearchActive(false);
          setQuery("");
        }}
        className="text-3xl text-white cursor-pointer hover:scale-110 transition-transform"
      />
    </div>
    <div className="flex flex-col">
    { /*<div className="grid grid-cols-4 gap-4 px-4 py-2 bg-gray-100 text-gray-700 font-bold text-center">
        <p>Image</p>
        <p>Name</p>
        <p>Price</p>
        <p>Rating</p>
      </div>*/}
      <div className="max-h-[70vh] overflow-y-auto">
        {products?.map((product) => (
          <Link
            key={product?._id}
            to={`/admin/update/${product?._id}`}
            className="flex items-center justify-between px-4 py-2 hover:bg-red-500 hover:text-white transition-colors duration-200"
          >
            <img
              className="h-10 w-10 object-cover rounded-full"
              src={product?.images[0]?.url}
              alt={product?.name}
            />
            <p className="w-1/4 truncate">{product?.name}</p>
            <p className="w-1/4 text-center">${product?.price-product?.discount}</p>
            <p className="w-1/4 text-center">{product?.rating}</p>
          </Link>
        ))}
      </div>
    </div>
  </div>
) : null}

        </div>
      </div>
      <div className="w-full   flex">
        <div className="w-1/6 border-t border-r h-[100vh] px-3 scrollbar-thin overflow-scroll">
          <p className="text-center text-xl font-bold">Filters</p>
          <div className="flex flex-col gap-y-2 ">
            <div className="flex items-center border  gap-x-3">
              <span>Available</span>{" "}
              <input
                value={available}
                onChange={() => {
                  setAvailable((prv) => !prv);
                }}
                checked={available}
                className="inline"
                type="checkbox"
              />
            </div>
            <div className=" border items-center  gap-x-3 p-3">
              <p className="text-center">Price</p>
              <p className="">from:</p>
              <input
                value={fromPrice || ""}
                onChange={(e) => {
                  setFromPrice(e.target.value);
                }}
                className="border-red-600 border w-full outline-none"
                min={0}
                type="number"
                name=""
                id=""
              />
              <p>to:</p>
              <input
                value={toPrice || ""}
                onChange={(e) => {
                  setToPrice(e.target.value);
                }}
                min={0}
                className="border-red-600 border w-full outline-none"
                type="number"
                name=""
                id=""
              />
            </div>
            <div className="border items-center  gap-x-3 p-3">
              <p className="mb-1">Minimum Rating:</p>
              <input
                value={minRating || ""}
                onChange={(e) => {
                  setMinRating(e.target.value);
                }}
                className="border-red-600 border w-full outline-none"
                max={5}
                min={0}
                type="number"
                name=""
                id=""
              />
            </div>
            <div className="border items-center  gap-x-3 p-3">
              <p className="mb-1">Catagory:</p>
              <select
                className=" border border-red-600 w-full"
                onClick={(e) => {
                  setCatagory(e.target.value);
                }}
              >
                <option value="">---select---</option>
                {createdCatagory?.map((cata) => {
                  return (
                    <option key={cata?._id} value={cata?.catagory}>
                      {cata?.catagory}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="border items-center  gap-x-3 p-3">
              <p className="mb-1">Sub Catagory:</p>
              <select
                className=" border border-red-600 w-full"
                onClick={(e) => {
                  setSubCatagory(e.target.value);
                }}
              >
                <option value="">---select---</option>
                {createdSubCatagory?.map((cata) => {
                  return (
                    <option key={cata?._id} value={cata?.subCatagory}>
                      {cata?.subCatagory}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="border items-center  gap-x-3 p-3">
              <p className="mb-1">Minimum Stock:</p>
              <input
                value={minStock || ""}
                onChange={(e) => {
                  setMinStock(e.target.value);
                }}
                className="border-red-600 border w-full outline-none"
                min={1}
                type="number"
                name=""
                id=""
              />
            </div>
            <div className="border items-center  gap-x-3 p-3">
              <p className="mb-1">Results Per Page:</p>
              <input
                value={resultPerPage}
                onChange={(e) => {
                  setResultPerPage(e.target.value);
                }}
                className="border-red-600 border w-full outline-none"
                min={10}
                type="number"
                name=""
                id=""
              />
            </div>
            <input
              onClick={filter}
              className="bg-red-600 text-white rounded-sm cursor-pointer"
              type="button"
              value="Apply"
            />
          </div>
        </div>
        <div className="w-full  h-[100vh] ">
          <p className="text-center text-xl font-bold mb-5">Products</p>
          {loading ? (
            <div className="sweet-loading w-full h-screen flex justify-center items-center">
              <HashLoader
                color="#ff0000"
                cssOverride={{}}
                loading={loading}
                size={60}
                speedMultiplier={2}
              />
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-4">
              {products?.map((product) => {
                return (
                  <AdminCard
                    product={product}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductsView;
