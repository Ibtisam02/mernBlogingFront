import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  searchProductsOrFilter,
  resultPPage,
  sorting,
} from "../redux/productSlice/searchProductsOrfilter";
import { CiSearch } from "react-icons/ci";
import Card from "../components/compos/Card";
import { HashLoader } from "react-spinners";
import AdminCard from "../components/compos/AdminCard";
import { Link } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import ProductCard from "../components/compos/ProductCard";
import { FaFilter, FaMinus, FaPlus } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";
import { getAllSubCatagory } from "../redux/catagorySlice/addASubCatagory";
import { getAllCatagories } from "../redux/catagorySlice/addACatagory";
import { RxCross1, RxCross2 } from "react-icons/rx";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";

function Products() {
  //let [query, setQuery] = useState("");

  let dispatch = useDispatch();
  /*useEffect(() => {
    let queries = {
      resultsPerPage: 100,
      keyword: query,
    };
    dispatch(searchProductsOrFilter(queries)).then((res) => {
      console.log(res);
    });
  }, [dispatch, query]);*/
  let { products, loading } = useSelector((state) => state.searchProduct);
  let resultPerPage = useSelector((state) => state.searchProduct.resultPerPage);
  let sort = useSelector((state) => state.searchProduct.sort);
  console.log(sort);

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

  //get all catagories and sub catagory

  let { createdSubCatagory } = useSelector((state) => state.createSubCatagory);
  let { createdCatagory } = useSelector((state) => state.createCatagory);

  let [available, setAvailable] = useState(false);
  let [fromPrice, setFromPrice] = useState(Number);
  let [toPrice, setToPrice] = useState(Number);
  let [minRating, setMinRating] = useState(Number);
  let [catagory, setCatagory] = useState("");
  let [subCatagory, setSubCatagory] = useState("");
  //let [resultPerPage, setResultPerPage] = useState(10);
  let [curPage, setCurPage] = useState(1);
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
    if (sort) {
      filterQuries = { ...filterQuries, sort: sort };
    }
    if (toPrice) {
      filterQuries = { ...filterQuries, "price[lte]": toPrice };
    }
    if (minRating) {
      filterQuries = { ...filterQuries, "rating[gte]": minRating };
    }
    if (curPage) {
      filterQuries = { ...filterQuries, page: curPage };
    }
    if (catagory.length > 0) {
      filterQuries = { ...filterQuries, catagory: catagory };
    }
    if (subCatagory.length > 0) {
      filterQuries = { ...filterQuries, subCatagory: subCatagory };
    }
    /*if (query.length > 0) {
      filterQuries = { ...filterQuries, keyword: query };
    }
    if (minStock) {
      filterQuries = { ...filterQuries, "stock[gte]": minStock };
    }*/
    filterQuries = { ...filterQuries, resultsPerPage: resultPerPage };
    console.log(filterQuries);
    dispatch(searchProductsOrFilter(filterQuries)).then((res) => {
      console.log(res);
      let toatalProducts = res?.payload?.productCount;
      let pages = toatalProducts / resultPerPage;
      pages = Math.ceil(pages);
      let pageArr = [];
      for (let i = 0; i < pages; i++) {
        pageArr.push(i + 1);
      }
      setPagination(pageArr);
    });
  };
  useEffect(() => {
    filter();
  }, [
    available,
    catagory,
    subCatagory,
    fromPrice,
    toPrice,
    resultPerPage,
    minRating,
    sort,
    curPage,
  ]);
  let [showAvail, seShowAvail] = useState(false);
  let [showPri, setShowPri] = useState(false);
  let [showrat, setShowRat] = useState(false);
  let [showcat, setShowCat] = useState(false);
  let [showSubcat, setShowSuCat] = useState(false);
  const catRef = useRef(null);
  const subCatRef = useRef(null);
  // pagnation
  let [pagination, setPagination] = useState(Array);
  let [filterOn, setFilterOn] = useState(false);

  const toggleCat = () => {
    let content = catRef.current;
    if (showcat) {
      // Set explicit height before collapsing to enable smooth transition
      content.style.height = `${content.scrollHeight}px`;
      requestAnimationFrame(() => {
        content.style.height = "28px";
      });
    } else {
      // Set height to current content size to trigger transition
      content.style.height = "28px";
      content.style.height = `${content.scrollHeight}px`;
      requestAnimationFrame(() => {
        content.style.height = `${content.scrollHeight}px`;
      });
    }
    setShowCat(!showcat);
  };

  const toggleSubCat = () => {
    let content = subCatRef.current;
    if (showSubcat) {
      // Set explicit height before collapsing to enable smooth transition
      content.style.height = `${content.scrollHeight}px`;
      requestAnimationFrame(() => {
        content.style.height = "28px";
      });
    } else {
      // Set height to current content size to trigger transition
      content.style.height = "28px";
      content.style.height = `${content.scrollHeight}px`;
      requestAnimationFrame(() => {
        content.style.height = `${content.scrollHeight}px`;
      });
    }
    setShowSuCat(!showSubcat);
  };

  useEffect(() => {
    if (filterOn) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Cleanup on component unmount
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [filterOn]);
  return (
    <div className="relative mt-20">
      <div className="w-full   flex ">
        {filterOn ? (
          <div
            onClick={() => {
              setFilterOn(false);
            }}
            className="w-screen h-screen bg-black fixed top-0 z-10 opacity-40"
          ></div>
        ) : null}
        <div
          className={`fixed top-0 z-10 bg-[#ececec] pb-6  h-[100vh] overflow-y-scroll  scrollbar-thin  transition-all ease-in duration-200 overflow-hidden ${
            filterOn ? "md:w-1/4 xxsm:w-1/2 px-3" : "w-0"
          }`}
        >
          <div className="flex justify-between items-center mb-8  mt-20">
            <p className="text-red-600 text-2xl font-bold">Filters</p>
            <RxCross1
              className="cursor-pointer"
              onClick={() => {
                setFilterOn(false);
              }}
            />
          </div>

          <div className="flex flex-col gap-y-8 ">
            <div
              className={` ${
                showAvail ? "h-14" : "h-6"
              } overflow-hidden   transition-all ease-in duration-300`}
            >
              <div
                onClick={() => {
                  seShowAvail((prv) => !prv);
                }}
                className="flex justify-between items-center font-bold cursor-pointer"
              >
                <p className="">Availability</p>{" "}
                <p>
                  {showAvail ? <IoMdArrowDropdown /> : <IoMdArrowDropright />}
                </p>
              </div>
              <div className="flex justify-start gap-x-3 items-center">
                <span>Instock</span>
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
            </div>
            <div
              className={` ${
                showPri ? "h-[300px]" : "h-6"
              } overflow-hidden   transition-all ease-in duration-300`}
            >
              <div
                onClick={() => {
                  setShowPri((prv) => !prv);
                }}
                className="flex justify-between items-center font-bold cursor-pointer"
              >
                <p className="">Price</p>{" "}
                <p className="transition-all ease-in duration-300">
                  {showPri ? <IoMdArrowDropdown /> : <IoMdArrowDropright />}
                </p>
              </div>
              <ul className="mt-3 flex flex-col gap-y-4">
                <li
                  onClick={() => {
                    setFromPrice(500);
                    setToPrice(1000);
                  }}
                  className={` ${
                    fromPrice === 500 &&
                    toPrice === 1000 &&
                    "bg-red-600 text-white"
                  } hover:cursor-pointer hover:bg-primary hover:px-2 hover:text-white transition-all ease-in duration-300`}
                >
                  <span>500</span> to <span>1000</span>
                </li>
                <li
                  onClick={() => {
                    setFromPrice(1000);
                    setToPrice(5000);
                  }}
                  className={`${
                    fromPrice === 1000 &&
                    toPrice === 5000 &&
                    "bg-red-600 text-white"
                  } hover:cursor-pointer hover:bg-primary hover:px-2 hover:text-white transition-all ease-in duration-300`}
                >
                  <span>1000</span> to <span>5000</span>
                </li>
                <li
                  onClick={() => {
                    setFromPrice(5000);
                    setToPrice(10000);
                  }}
                  className={`${
                    fromPrice === 5000 &&
                    toPrice === 10000 &&
                    "bg-red-600 text-white"
                  } hover:cursor-pointer hover:bg-primary hover:px-2 hover:text-white transition-all ease-in duration-300`}
                >
                  <span>5000</span> to <span>10,000</span>
                </li>
                <li
                  onClick={() => {
                    setFromPrice(10000);
                    setToPrice(30000);
                  }}
                  className={`${
                    fromPrice === 10000 &&
                    toPrice === 30000 &&
                    "bg-red-600 text-white"
                  } hover:cursor-pointer hover:bg-primary hover:px-2 hover:text-white transition-all ease-in duration-300`}
                >
                  <span>10,000</span> to <span>30,000</span>
                </li>
                <li
                  onClick={() => {
                    setFromPrice(30000);
                    setToPrice(50000);
                  }}
                  className={`${
                    fromPrice === 30000 &&
                    toPrice === 50000 &&
                    "bg-red-600 text-white"
                  } hover:cursor-pointer hover:bg-primary hover:px-2 hover:text-white transition-all ease-in duration-300`}
                >
                  <span>30,000</span> to <span>50,000</span>
                </li>
                <li
                  onClick={() => {
                    setFromPrice(50000);
                    setToPrice(100000);
                  }}
                  className={`${
                    fromPrice === 50000 &&
                    toPrice === 100000 &&
                    "bg-red-600 text-white"
                  } hover:cursor-pointer hover:bg-primary hover:px-2 hover:text-white transition-all ease-in duration-300`}
                >
                  <span>50,000</span> to <span>100,000</span>
                </li>
                <li
                  onClick={() => {
                    setFromPrice(100000);
                  }}
                  className={`${
                    fromPrice === 100000 && "bg-red-600 text-white"
                  } hover:cursor-pointer hover:bg-primary hover:px-2 hover:text-white transition-all ease-in duration-300`}
                >
                  <span>100,000</span> or <span>above</span>
                </li>
              </ul>
            </div>
            <div
              className={` ${
                showrat ? "h-[340px]" : "h-7"
              } overflow-hidden   transition-all ease-in duration-300`}
            >
              <div
                onClick={() => {
                  setShowRat((prv) => !prv);
                }}
                className="flex justify-between items-center font-bold cursor-pointer"
              >
                <p className="">Rating</p>{" "}
                <p className="transition-all ease-in duration-300">
                  {showrat ? <IoMdArrowDropdown /> : <IoMdArrowDropright />}
                </p>
              </div>
              <ul className="mt-3 flex flex-col gap-y-4">
                <li
                  onClick={() => {
                    setMinRating(5);
                  }}
                  className={`${
                    minRating === 5 && "bg-red-600 "
                  } hover:bg-primary transition-all ease-in duration-300 hover:pl-3 cursor-pointer`}
                >
                  <ReactStars
                    count={5}
                    value={5}
                    size={24}
                    color2="#dc2626" // Red color for filled stars
                    edit={false}
                  />
                </li>
                <li
                  onClick={() => {
                    setMinRating(4);
                  }}
                  className={`${
                    minRating === 4 && "bg-red-600 "
                  } hover:bg-primary transition-all ease-in duration-300 hover:pl-3 cursor-pointer`}
                >
                  <ReactStars
                    count={5}
                    value={4}
                    size={24}
                    color2="#dc2626" // Red color for filled stars
                    edit={false}
                  />
                </li>
                <li
                  onClick={() => {
                    setMinRating(3);
                  }}
                  className={`${
                    minRating === 3 && "bg-red-600 "
                  } hover:bg-primary transition-all ease-in duration-300 hover:pl-3 cursor-pointer`}
                >
                  <ReactStars
                    count={5}
                    value={3}
                    size={24}
                    color2="#dc2626" // Red color for filled stars
                    edit={false}
                  />
                </li>
                <li
                  onClick={() => {
                    setMinRating(2);
                  }}
                  className={`${
                    minRating === 2 && "bg-red-600 "
                  } hover:bg-primary transition-all ease-in duration-300 hover:pl-3 cursor-pointer`}
                >
                  <ReactStars
                    count={5}
                    value={2}
                    size={24}
                    color2="#dc2626" // Red color for filled stars
                    edit={false}
                  />
                </li>
                <li
                  onClick={() => {
                    setMinRating(1);
                  }}
                  className={`${
                    minRating === 1 && "bg-red-600 "
                  } hover:bg-primary transition-all ease-in duration-300 hover:pl-3 cursor-pointer`}
                >
                  <ReactStars
                    count={5}
                    value={1}
                    size={24}
                    color2="#dc2626" // Red color for filled stars
                    edit={false}
                  />
                </li>
                <li
                  onClick={() => {
                    setMinRating(0);
                  }}
                  className={`${
                    minRating === 0 && "bg-red-600 "
                  } hover:bg-primary transition-all ease-in duration-300 hover:pl-3 cursor-pointer`}
                >
                  <ReactStars
                    count={5}
                    value={0}
                    size={24}
                    color2="#dc2626" // Red color for filled stars
                    edit={false}
                  />
                </li>
              </ul>
            </div>
            <div
              ref={catRef}
              onClick={toggleCat}
              className={`h-7 overflow-hidden transition-all ease-in duration-300`}
            >
              <div
                onClick={() => {
                  console.log("cat click");
                }}
                className="flex justify-between items-center font-bold cursor-pointer"
              >
                <p className="">Catagory</p>{" "}
                <p className="transition-all ease-in duration-300">
                  {showcat ? <IoMdArrowDropdown /> : <IoMdArrowDropright />}
                </p>
              </div>
              <ul className="mt-3 flex flex-col gap-y-4">
                {createdCatagory?.map((catagoryy, i) => {
                  return (
                    <li
                      onClick={() => {
                        setCatagory(catagoryy?.catagory);
                      }}
                      key={catagoryy?._id}
                      className={`${
                        catagory === catagoryy?.catagory &&
                        "bg-red-600 text-white"
                      } hover:cursor-pointer hover:bg-primary hover:px-2 hover:text-white transition-all ease-in duration-300`}
                    >
                      <p>{catagoryy?.catagory}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div
              ref={subCatRef}
              onClick={toggleSubCat}
              className={`h-7 overflow-hidden   transition-all ease-in duration-300`}
            >
              <div
                onClick={() => {
                  console.log("click");
                }}
                className="flex justify-between items-center font-bold cursor-pointer"
              >
                <p className="">Sub Catagory</p>{" "}
                <p className="transition-all ease-in duration-300">
                  {showSubcat ? <IoMdArrowDropdown /> : <IoMdArrowDropright />}
                </p>
              </div>
              <ul className="mt-3 flex flex-col gap-y-4">
                {createdSubCatagory?.map((subCatagoryy) => {
                  return (
                    <li
                      onClick={() => {
                        setSubCatagory(subCatagoryy?.subCatagory);
                      }}
                      key={subCatagoryy?._id}
                      className={`${
                        subCatagory === subCatagoryy?.subCatagory &&
                        "bg-red-600 text-white"
                      } hover:cursor-pointer hover:bg-primary hover:px-2 hover:text-white transition-all ease-in duration-300`}
                    >
                      <p>{subCatagoryy?.subCatagory}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="w-full  h-fit ">
          <p className="text-center text-xl font-bold mb-5">Products</p>
          <div className="px-2 flex justify-between items-center my-4">
            <div className="flex items-center">
              {available !== false ||
              catagory !== "" ||
              subCatagory !== "" ||
              fromPrice !== 0 ||
              toPrice !== 0 ||
              minRating !== 0 ? (
                <div className="flex items-center gap-x-2">
                  <p
                    onClick={() => {
                      setAvailable(false);
                      setFromPrice(0);
                      setToPrice(0);
                      setCatagory("");
                      setSubCatagory("");
                      setMinRating(0);
                    }}
                    className="text-left cursor-pointer bg-primary text-white px-2  rounded-lg text-[12px]"
                  >
                    clear filters
                  </p>
                  <div className="xxxsm:hidden md:block">
                  {available !== false ? (
                    <div
                      onClick={() => {
                        setAvailable(false);
                      }}
                      className="border-2 border-black px-2 rounded-lg flex items-center gap-x-[2px] text-[12px]"
                    >
                      <span>Available</span>{" "}
                      <span className="cursor-pointer hover:bg-slate-400 rounded-full">
                        <RxCross2 />
                      </span>
                    </div>
                  ) : null}
                  {fromPrice !== 0 || toPrice !== 0 ? (
                    <div
                      onClick={() => {
                        setFromPrice(0);
                        setToPrice(0);
                      }}
                      className="border-2 border-black px-2 rounded-lg flex items-center gap-x-[2px] text-[12px]"
                    >
                      <span>
                        Price:{" "}
                        <span className="text-red-600">
                          {fromPrice}-{toPrice}
                        </span>
                      </span>{" "}
                      <span className="cursor-pointer hover:bg-slate-400 rounded-full">
                        <RxCross2 />
                      </span>
                    </div>
                  ) : null}
                  {minRating !== 0 ? (
                    <div
                      onClick={() => {
                        setMinRating(0);
                      }}
                      className="border-2 border-black px-2 rounded-lg flex items-center gap-x-[2px] text-[12px]"
                    >
                      <span>
                        Min Rating:{" "}
                        <span className="text-red-600">{minRating}</span>
                      </span>{" "}
                      <span className="cursor-pointer hover:bg-slate-400 rounded-full">
                        <RxCross2 />
                      </span>
                    </div>
                  ) : null}
                  {catagory !== "" ? (
                    <div
                      onClick={() => {
                        setCatagory("");
                      }}
                      className="border-2 border-black px-2 rounded-lg flex items-center gap-x-[2px] text-[12px]"
                    >
                      <span>
                        Catagory:{" "}
                        <span className="text-red-600">{catagory}</span>
                      </span>{" "}
                      <span className="cursor-pointer hover:bg-slate-400 rounded-full">
                        <RxCross2 />
                      </span>
                    </div>
                  ) : null}
                  {subCatagory !== "" ? (
                    <div
                      onClick={() => {
                        setSubCatagory("");
                      }}
                      className="border-2 border-black px-2 rounded-lg flex items-center gap-x-[2px] text-[12px]"
                    >
                      <span>
                        Sub Catagory:{" "}
                        <span className="text-red-600">{subCatagory}</span>
                      </span>{" "}
                      <span className="cursor-pointer hover:bg-slate-400 rounded-full">
                        <RxCross2 />
                      </span>
                    </div>
                  ) : null}
                  </div>
                </div>
              ) : null}
            </div>
            <div className="flex items-center gap-x-4">
              <div
                onClick={() => {
                  setFilterOn((prv) => !prv);
                }}
                className="flex items-center cursor-pointer gap-x-2 border border-black px-2 py-1 rounded-xl"
              >
                <p>Filters</p>
                <FaFilter className={`${filterOn ? "text-red-600" : ""}`} />
              </div>
              <select
                onChange={(e) => {
                  dispatch(resultPPage(Number(e.target.value)));
                }}
                className="w-40 px-1 py-2  rounded-2xl outline-none border border-black"
                value={resultPerPage}
              >
                <option disabled={true}>Results Per Page</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="40">40</option>
                <option value="80">80</option>
              </select>
              <select
                onChange={(e) => {
                  dispatch(sorting(e.target.value));
                }}
                className="w-40 py-2 px-1 rounded-2xl outline-none border border-black"
                value={sort}
              >
                <option disabled={true}>Sort By</option>
                <option value="asc">Price, low to high</option>
                <option value="desc">Price, high to low</option>
              </select>
            </div>
          </div>
          {loading ? (
            <div className="sweet-loading w-full h-screen flex justify-center items-center -z-30">
              <HashLoader
                color="#ff0000"
                cssOverride={{}}
                loading={loading}
                size={60}
                speedMultiplier={2}
              />
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-11 mb-4 ">
              {products?.map((product) => {
                return (
                  <ProductCard key={product?._id + "hdfds"} product={product} />
                );
              })}
            </div>
          )}

          {pagination > 1 ? (
            <div className="px-6 flex items-center gap-x-3 my-4">
              <p className="text-2xl font-bold">Pages: </p>
              {pagination?.map((page, i) => {
                return (
                  <div
                    onClick={() => {
                      setCurPage(page);
                    }}
                    className={`text-xl p-3 cursor-pointer underline  ${
                      page === curPage
                        ? "bg-white border-black border text-black"
                        : "bg-primary text-white"
                    }`}
                    key={i}
                  >
                    {page}
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Products;
