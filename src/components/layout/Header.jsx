import React, { useEffect, useRef, useState } from "react";
import { FaBars, FaShoppingCart } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import logo from "../../assets/download.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/authSlice";
import { searchProductsOrFilter } from "../../redux/productSlice/searchProductsOrfilter";
import { getNoOfItemsInCart } from "../../redux/cartSlice/NoOfItemsInCart";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { noOfItems } = useSelector((state) => state.getNoOfProductsInCart);
  const { products, loading } = useSelector((state) => state.searchProduct);
  const searchRef = useRef(null);
  const [searchActive, setSearchActive] = useState(false);
  const [query, setQuery] = useState("");
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);

  useEffect(() => {
    dispatch(getNoOfItemsInCart());
  }, [dispatch]);

  useEffect(() => {
    const queries = { resultsPerPage: 10, keyword: query };
    if (isAuthenticated && user && searchActive) {
      dispatch(searchProductsOrFilter(queries)).then((res) => console.log(res));
    }
  }, [dispatch, query, isAuthenticated, user, searchActive]);
  

  

  const handleLogout = () => {
    dispatch(logoutUser());
  };
  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setSearchVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <header className="w-full bg-slate-800 text-white fixed top-0 left-0 z-30">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-4 py-3 md:px-8">
        {/* Logo */}
        <img src={logo} alt="Logo" className="h-10 md:h-14" />

        {/* Hamburger Menu */}
        <button
          onClick={() => setNavbarOpen(!navbarOpen)}
          className="md:hidden text-2xl focus:outline-none"
        >
          {navbarOpen ? <IoCloseSharp /> : <FaBars />}
        </button>

        {/* Navbar Links */}
        <div
          className={`${
            navbarOpen ? "block" : "hidden"
          } absolute md:relative top-16 left-0 md:top-0 w-full md:w-auto bg-slate-800 md:flex md:items-center transition-all duration-300`}
        >
          <ul className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 list-none p-4 md:p-0">
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-red-500" : "text-white"
              }
              to="/home"
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-red-500" : "text-white"
              }
              to="/products"
            >
              Products
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-red-500" : "text-white"
              }
              to="/about"
            >
              About
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-red-500" : "text-white"
              }
              to="/contact"
            >
              Contact
            </NavLink>
          </ul>
        </div>

        {/* Cart, Search, and User Icons */}
        <div className="flex items-center gap-x-4">
          {/* Cart */}
          <NavLink to="/cart" className="relative">
            <FaShoppingCart className="text-2xl" />
            {noOfItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-xs px-1 rounded-full">
                {noOfItems}
              </span>
            )}
          </NavLink>

          {/* Search */}
          <i onClick={() => { navigate("/products"); setSearchVisible(!searchVisible); setNavbarOpen(false) }} className="fab fa-pinterest text-xl leading-lg text-white opacity-75">
                  <CiSearch />
                </i>

          {/* User */}
          <div className="relative">
            <FaCircleUser
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="cursor-pointer text-2xl"
            />
            {userMenuOpen && (
              <div className="absolute top-10 right-0 bg-slate-900 text-white text-sm py-2 px-4 rounded-md shadow-md">
                {isAuthenticated ? (
                  <>
                    <Link to="/user/orders" className="block hover:text-red-500">
                      Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block hover:text-red-500"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="block hover:text-red-500">
                      Login
                    </Link>
                    <Link to="/signup" className="block hover:text-red-500">
                      Signup
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Search Box */}
      {searchVisible && (
          <div ref={searchRef} className="flex flex-col items-center absolute top-16 left-1/2 -translate-x-1/2 w-full max-w-4xl bg-white shadow-lg rounded-lg z-50 transition-all ease-in duration-300">
            <div className="flex items-center border-b border-gray-300 w-full px-4 py-2">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onClick={() => setSearchActive(true)}
                className="flex-grow text-lg px-2 text-black py-1 focus:outline-none"
                type="text"
                placeholder="Search for products..."
              />
              <CiSearch onClick={() => { setSearchActive(false); setSearchVisible(false); }} className="text-2xl text-gray-500 cursor-pointer hover:text-red-500" />
            </div>

            {searchActive && (
              <div className="absolute top-16 w-full max-w-4xl bg-white border border-gray-300 rounded-lg shadow-md">
                <div className="flex items-center justify-between px-4 py-2 bg-gray-100 rounded-t-lg">
                  <p className="text-lg font-semibold text-gray-700">Search Results:</p>
                  <IoCloseSharp onClick={() => { setSearchActive(false); setQuery(""); }} className="text-3xl text-gray-500 cursor-pointer hover:text-red-500" />
                </div>
                <div className="flex flex-col divide-y divide-gray-200 overflow-y-auto max-h-[60vh]">
                  <div className="flex items-center justify-around py-2 bg-gray-200 font-semibold text-gray-700">
                    <span>Image</span>
                    <span>Name</span>
                    <span>Price</span>
                    <span>Rating</span>
                  </div>
                  {products?.map((product) => (
                    <Link key={product?._id} to={`/product/${product?._id}`} onClick={() => setSearchVisible(false)} className="flex items-center justify-around py-2 px-4 hover:bg-gray-100 transition">
                      <img className="h-10 w-10 object-cover rounded-full" src={product?.images[0]?.url} alt="product" />
                      <span className="truncate w-1/4 text-gray-700">{product?.name}</span>
                      <span className="text-gray-700">{`$${product?.price}`}</span>
                      <span className="text-yellow-500">{product?.rating} ★</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
    </header>
  );
}
