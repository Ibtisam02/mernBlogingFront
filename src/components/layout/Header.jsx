import React, { useEffect, useRef, useState } from "react";
import { ReactNavbar } from "overlay-navbar";
import { CiSearch } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import logo from "../../assets/download.svg";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, logoutUser } from "../../redux/authSlice";
import { IoCloseSharp } from "react-icons/io5";
import { searchProductsOrFilter } from "../../redux/productSlice/searchProductsOrfilter";
import { useNavigate } from "react-router-dom";
import { getNoOfItemsInCart } from "../../redux/cartSlice/NoOfItemsInCart";

export default function Header({ fixed }) {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getNoOfItemsInCart()).then((res) => {
      console.log(res);
    });
  }, []);
  const { noOfItems } = useSelector((state) => state.getNoOfProductsInCart);
  console.log(noOfItems);

  let [query, setQuery] = useState("");
  useEffect(() => {
    let queries = {
      resultsPerPage: 10,
      keyword: query,
    };
    if (isAuthenticated && user && searchActive) {
      dispatch(searchProductsOrFilter(queries)).then((res) => {
        console.log(res);
      });
    }
  }, [dispatch, query]);
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  let [active, setActive] = useState(false);

  let logoutUserr = () => {
    dispatch(logoutUser()).then((res) => {
      console.log(res);
    });
  };
  let [searchActive, setSearchActive] = useState(false);
  let { products, loading } = useSelector((state) => state.searchProduct);
  let [showSearch, setShowSearch] = useState(false);
  let searchRef = useRef(null);
  const handleClickOutside = (event) => {
    // Check if the click is outside the dropdown
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setShowSearch(false); // Close the dropdown
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="w-screen static  flex flex-wrap items-center justify-between px-2 py-3 bg-slate-800 mb-3 z-30">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <img src={logo} alt="" />
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>

          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex gap-x-5 flex-col lg:flex-row lg:items-center list-none lg:ml-auto">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-red-600" : "text-white"
                }
                to={"/"}
              >
                <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i>
                <span className="ml-2 text-lg font-bold">Home</span>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-red-600" : "text-white"
                }
                to={"/products"}
              >
                <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i>
                <span className="ml-2 text-lg font-bold">Products</span>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-red-600" : "text-white"
                }
                to={"/about"}
              >
                <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i>
                <span className="ml-2 text-lg font-bold">About</span>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-red-600" : "text-white"
                }
                to={"/contact"}
              >
                <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i>
                <span className="ml-2 text-lg font-bold">Contact</span>
              </NavLink>

              <NavLink
                to={"/cart"}
                className={({ isActive }) =>
                  isActive ? "text-red-600 nav-item" : "text-white nav-item"
                }
              >
                <i className="fab fa-pinterest text-xl leading-lg text-white opacity-75 relative">
                  <FaShoppingCart />
                  {noOfItems?<div className="absolute rounded-full -top-4 -right-3 bg-red-600 w-5 h-5  flex items-center justify-center">
                    <p className="text-sm ">{noOfItems}</p>
                  </div>:null}
                </i>
              </NavLink>

              <i
                onClick={() => {
                  navigate("/products");
                  setShowSearch(!showSearch);
                }}
                className="fab fa-pinterest text-xl leading-lg text-white opacity-75"
              >
                <CiSearch />
              </i>
              <div>
                <i
                  onClick={() => setActive((pre) => !pre)}
                  className="relative fab fa-pinterest text-xl leading-lg text-white opacity-75"
                >
                  <FaCircleUser />
                </i>

                {active === true && isAuthenticated === false ? (
                  <div className="bg-white absolute right-0 top-16 px-3 py-2 z-20">
                    <div>
                      <Link to={"/login"}>login</Link>
                    </div>
                    <div>
                      <Link to={"/singup"}>singup</Link>
                    </div>
                  </div>
                ) : null}
                {active === true && isAuthenticated === true ? (
                  <div className="bg-slate-400 absolute right-0 top-16 px-3 py-2 z-20">
                    <div onClick={logoutUserr} className="cursor-pointer hover:border-b-2">
                      logout
                    </div>
                    <Link to={"/user/orders"} className="cursor-pointer hover:border-b-2">
                      Orders
                    </Link>
                  </div>
                ) : null}
              </div>
            </ul>
          </div>
        </div>
        {showSearch ? (
  <div
    ref={searchRef}
    className="flex flex-col items-center absolute top-16 left-1/2 -translate-x-1/2 w-full max-w-4xl bg-white shadow-lg rounded-lg z-50 transition-all ease-in duration-300"
  >
    <div className="flex items-center border-b border-gray-300 w-full px-4 py-2">
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        onClick={() => setSearchActive(true)}
        className="flex-grow text-lg px-2 py-1 focus:outline-none"
        type="text"
        placeholder="Search for products..."
      />
      <CiSearch
        onClick={() => {
          setSearchActive(false);
          setShowSearch(false);
        }}
        className="text-2xl text-gray-500 cursor-pointer hover:text-red-500"
      />
    </div>

    {searchActive && (
      <div className="absolute top-16 w-full max-w-4xl bg-white border border-gray-300 rounded-lg shadow-md">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-100 rounded-t-lg">
          <p className="text-lg font-semibold text-gray-700">Search Results:</p>
          <IoCloseSharp
            onClick={() => {
              setSearchActive(false);
              setQuery("");
            }}
            className="text-3xl text-gray-500 cursor-pointer hover:text-red-500"
          />
        </div>
        <div className="flex flex-col divide-y divide-gray-200 overflow-y-auto max-h-[60vh]">
          <div className="flex items-center justify-around py-2 bg-gray-200 font-semibold text-gray-700">
            <span>Image</span>
            <span>Name</span>
            <span>Price</span>
            <span>Rating</span>
          </div>
          {products?.map((product) => (
            <Link
              key={product?._id}
              to={`/product/${product?._id}`}
              onClick={() => setShowSearch(false)}
              className="flex items-center justify-around py-2 px-4 hover:bg-gray-100 transition"
            >
              <img
                className="h-10 w-10 object-cover rounded-full"
                src={product?.images[0]?.url}
                alt="product"
              />
              <span className="truncate w-1/4 text-gray-700">{product?.name}</span>
              <span className="text-gray-700">{`$${product?.price}`}</span>
              <span className="text-yellow-500">{product?.rating} ★</span>
            </Link>
          ))}
        </div>
      </div>
    )}
  </div>
) : null}

      </nav>
    </>
  );
}
