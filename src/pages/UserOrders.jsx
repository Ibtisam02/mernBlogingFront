import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders } from "../redux/orderSlice/getLogedInUserOrders";
import { HashLoader } from "react-spinners";

const UserOrders = () => {
  let dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  let { myOrders, loading } = useSelector((state) => state.getMyAllOrders);
  // Fetch orders (Replace this with your actual API call)
  useEffect(() => {
    // Simulated API data
    dispatch(getMyOrders()).then((res) => {
      console.log(res);
    });
  }, []);
  console.log(myOrders);

  return (
    <div className="min-h-screen bg-gray-100 p-6 mt-20">
    <h1 className="text-3xl font-bold text-center mb-6">Your Orders</h1>
    {myOrders && myOrders.length > 0 ? (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-3 px-4 text-left">Order ID</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Items</th>
              <th className="py-3 px-4 text-left">Total</th>
              <th className="py-3 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {myOrders.map((order) => (
              <tr key={order._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{order._id}</td>
                <td className="py-3 px-4">{order.createdAt.slice(0, 10)}</td>
                <td className="py-3 px-4">{order.orderItems?.length}</td>
                <td className="py-3 px-4">{order.totalPrice}</td>
                <td
                  className={`py-3 px-4 font-semibold ${
                    order.orderStatus === "Delivered"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {order.orderStatus}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <p className="text-center text-gray-600">No orders found.</p>
    )}
  </div>
  );
};

export default UserOrders;
