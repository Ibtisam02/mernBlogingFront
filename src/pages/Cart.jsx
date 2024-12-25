import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import banksLogo from "../assets/logos.avif";
import CartItem from "../components/compos/CartItem";
import { getCart } from "../redux/cartSlice/GetCart";
import { Link } from "react-router-dom";

function Cart() {
  let dispatch = useDispatch();
let [trigger,setTriger]=useState(false);
  useEffect(() => {
    dispatch(getCart()).then((res) => {
      console.log(res);
    });
  }, [trigger]);
  
    let { cart } = useSelector((state) => state.getCart);
    
  
    let [price,setPrice]=useState(Number)
    let handleTriger=()=>{
      setTriger(prv=>!prv)
    }
   
  return (
    <div className="font-montserrat mt-20">
      <div>
        <h2 className=" text-[20px] font-black text-center">SHOPPING CART</h2>
      </div>
      <div className="flex justify-end my-4">
        <div className="flex flex-col px-10 gap-y-2">
          <div className="flex gap-x-11  items-center">
            <strong className="text-[18px]">SUBTOTAL: </strong>
            <strong className="text-[20px] ">
              Rs.{" "}
              <span className="tracking-widest">{cart?.[0]?.totalPrice.toLocaleString()||0}</span>{" "}
            </strong>
          </div>
          {cart?.[0]?.totalPrice>0?<Link to={"/checkout"} className="bg-primary px-6 py-2 text-[14px] text-center text-white font-bold rounded-md">
            CHECKOUT
          </Link>:null}
        </div>
      </div>
      <CartItem  cart={cart} refresh={handleTriger}/>
      <div className="flex justify-end my-4">
        <div className="flex flex-col px-10 gap-y-2">
          <div className="flex gap-x-11  items-center">
            <strong className="text-[18px]">SUBTOTAL: </strong>
            <strong className="text-[20px] ">
              Rs.{" "}
              <span className="tracking-widest">{cart?.[0]?.totalPrice.toLocaleString()||0}</span>{" "}
            </strong>
          </div>
          <p className="text-sm">Taxes and shipping calculated at checkout</p>
          {cart?.[0]?.totalPrice>0?<Link to={"/checkout"}  className="bg-primary text-center px-6 py-2 text-[14px] text-white font-bold rounded-md">
            CHECKOUT
          </Link>:null}
          <div className="flex items-center gap-x-2">
            <img width={300} src={banksLogo} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
