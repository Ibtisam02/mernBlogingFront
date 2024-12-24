import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../redux/cartSlice/GetCart";
import { placeOrder } from "../redux/orderSlice/placeOrder";
import toast from "react-hot-toast";

function Checkout() {
    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCart()).then((res) => {
            console.log(res);
        });
    }, []);

    let { cart } = useSelector((state) => state.getCart);
    const [formData, setFormData] = useState({
        address: "",
        city: "",
        state: "",
        country: "",
        pinCode: "",
        phoneNumber: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const [paymentMethod, setPaymentMethod] = useState("COD");

    const handlePaymentChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let dataToSend={ "shippingInfo":formData}
        dispatch(placeOrder(dataToSend)).then((res)=>{
            console.log(res);
            if (res.payload?.success) {
                if (res.payload.messege==="An Order is Already Pending!") {
                    toast.error(res.payload.messege)
                }
                else{
                    toast.success(res.payload.messege)
                }
            }
            else{
                toast.error("Somthing went wrong!")
            }
        })
        
    };

    return (
        <div className="min-h-screen bg-white text-gray-800 px-6 py-12">
            <div className="max-w-4xl mx-auto space-y-12">
                <h1 className="text-4xl font-bold text-center text-red-600">
                    Checkout
                </h1>

                {/* Order Summary */}
                <section className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                    <div className="space-y-2">
                        {cart?.[0]?.products.map((item) => {
                            return (
                                <div className="flex justify-between">
                                    <span>{item?.productDetails?.name}</span>
                                    <span className="flex gap-x-7">
                                        <span className="text-sm ">
                                            {(item?.pricePerUnit).toLocaleString()}&times;
                                            {item?.quantity} ={" "}
                                            <span className="text-lg font-semibold">
                                                Rs.
                                                {(item?.pricePerUnit * item?.quantity).toLocaleString()}
                                            </span>
                                        </span>
                                    </span>
                                </div>
                            );
                        })}
                        <hr className="border-2 " />
                        <div className="flex justify-between ">
                            <span>Subtotal</span>
                            <span className="text-xl">
                                Rs.{(cart?.[0]?.totalPrice).toLocaleString()}
                            </span>
                        </div>
                        <div className="flex justify-between ">
                            <span>Tax (5%) <span className="text-sm font-thin">if total is less then Rs.5,000</span></span>
                            <span className="text-xl">
                                Rs.{(cart?.[0]?.totalPrice*0.05).toLocaleString()}
                            </span>
                        </div>
                        <div className="flex justify-between ">
                            <span>Delivery Charges</span>
                            <span className="text-xl">
                                Rs.{cart?.[0]?.totalPrice>5000?(0):(200).toLocaleString()}
                            </span>
                        </div>
                        <hr className="border-2" />
                        <div className="flex justify-between font-bold">
                            <span>Grand Total</span>
                            <span className="text-xl">
                                Rs.{(cart?.[0]?.totalPrice + (cart?.[0]?.totalPrice>5000?0:200) +(cart?.[0]?.totalPrice*0.05) ).toLocaleString()}
                            </span>
                        </div>
                    </div>
                </section>

                {/* Payment Method */}
                <section className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <form onSubmit={handleSubmit}>
                        <div>

                            {/* Shipping Information Section */}
                            <div className="mb-4">
                                <label htmlFor="address" className="block text-gray-700">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    id="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="city" className="block text-gray-700">
                                    City
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    id="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="state" className="block text-gray-700">
                                    State
                                </label>
                                <input
                                    type="text"
                                    name="state"
                                    id="state"
                                    value={formData.state}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="country" className="block text-gray-700">
                                    Country
                                </label>
                                <input
                                    type="text"
                                    name="country"
                                    id="country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="pinCode" className="block text-gray-700">
                                    Pin Code
                                </label>
                                <input
                                    type="number"
                                    name="pinCode"
                                    id="pinCode"
                                    value={formData.pinCode}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="phoneNumber" className="block text-gray-700">
                                    Phone Number
                                </label>
                                <input
                                    type="number"
                                    name="phoneNumber"
                                    id="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
                            <div className="space-y-2">
                                <label className="flex items-center space-x-3">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="COD"
                                        checked={paymentMethod === "COD"}
                                        onChange={handlePaymentChange}
                                        className="form-radio h-5 w-5 text-red-600"
                                    />
                                    <span>Cash on Delivery (COD)</span>
                                </label>

                                
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-primary hover:bg-[#000000] text-white font-bold py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300"
                            >
                                Place Order
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
}

export default Checkout;
