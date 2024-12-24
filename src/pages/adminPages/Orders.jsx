import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrderss } from "../../redux/orderSlice/getAllOrders";
import { HashLoader } from "react-spinners";
import toast from "react-hot-toast";
import { updateOrderStatus } from "../../redux/orderSlice/updateOrderStatus";

function Orders() {
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrderss()).then((res) => {
      console.log(res);
    });
  }, [dispatch]);
  let { loading, getAllOrders } = useSelector((state) => state.getAllOders);

  let [orderModel, setOrderModel] = useState(false);
  let [modelContent, setModelContent] = useState({});

  //function to change status
  let changeStatus = (id, status) => {
    let newStatus;
    if (status === "Delivered") {
      return toast.error("this order is already delivered");
    }
    if (status === "Pending") {
      newStatus = "Shipped";
    } else if (status === "Shipped") {
      newStatus = "Delivered";
    } else {
      return toast.error("error please reload");
    }
    dispatch(updateOrderStatus({ id: id, status: newStatus })).then((res) => {
      console.log(res);
    });
  };
  return (
    <div className="ml-[70px] flex flex-col justify-center items-center ">
      <p className="text-center text-2xl font-bold">Orders</p>
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
        <div className="px-4 mt-5 w-full relative min-h-[90vh]">
          <h1 className="text-2xl font-semibold mb-4 text-center">
            Order History
          </h1>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300 shadow-md">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Avatar</th>
                  <th className="border border-gray-300 px-4 py-2">Name</th>
                  <th className="border border-gray-300 px-4 py-2">Items</th>
                  <th className="border border-gray-300 px-4 py-2">Phone</th>
                  <th className="border border-gray-300 px-4 py-2">Email</th>
                  <th className="border border-gray-300 px-4 py-2">Location</th>
                  <th className="border border-gray-300 px-4 py-2">Price</th>
                  <th className="border border-gray-300 px-4 py-2">Status</th>
                  <th className="border border-gray-300 px-4 py-2">Date</th>
                  <th className="border border-gray-300 px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {getAllOrders?.map((order) => (
                  <tr
                    key={order?._id}
                    className={`text-center ${
                      orderModel ? "blur-sm" : "blur-0"
                    } hover:bg-gray-100`}
                  >
                    <td className="border border-gray-300 px-4 py-2">
                      <img
                        className="h-10 w-10 object-cover rounded-full mx-auto"
                        src={order?.user?.[0]?.avatar?.url}
                        alt="Avatar"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {order?.user?.[0]?.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {order?.orderItems?.length}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {order?.shippingInfo?.phoneNumber}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-red-500">
                      {order?.user?.[0]?.email}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {`${order?.shippingInfo?.city}, ${order?.shippingInfo?.country}`}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-green-500">
                      Rs: {order?.totalPrice}
                    </td>
                    <td
                      className={`border border-gray-300 px-4 py-2 text-white font-semibold ${
                        order?.orderStatus === "Delivered"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {order?.orderStatus}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {order?.createdAt.slice(0, 10)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {order?.orderStatus !== "Delivered" ? (
                        <button
                          disabled={orderModel}
                          onClick={() => {
                            setModelContent(order);
                            setOrderModel(true);
                          }}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                        >
                          View
                        </button>
                      ) : (
                        <span className="text-gray-400">Completed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {orderModel && (
            <div className="absolute top-1/2 left-1/2 rounded-lg -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl w-3/4 max-w-lg p-6">
              <p className="text-right">
                <span
                  onClick={() => setOrderModel(false)}
                  className="cursor-pointer text-xl font-bold text-gray-500 hover:text-gray-800"
                >
                  &times;
                </span>
              </p>
              <div className="flex justify-center mb-4">
                <img
                  className="w-20 h-20 rounded-full object-cover"
                  src={modelContent?.user?.[0]?.avatar?.url}
                  alt="Avatar"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p>
                    <span className="font-semibold">Price:</span>{" "}
                    {modelContent?.totalPrice}
                  </p>
                </div>
                <div>
                  <p>
                    <span className="font-semibold">Items:</span>{" "}
                    {modelContent?.orderItems.length}
                  </p>
                </div>
                <div>
                  <p>
                    <span className="font-semibold">Location:</span>{" "}
                    {`${modelContent?.shippingInfo?.city}, ${modelContent?.shippingInfo?.state}`}
                  </p>
                </div>
                <div>
                  <p>
                    <span className="font-semibold">Order Status:</span>{" "}
                    {modelContent?.orderStatus}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-center font-bold">Order Items</p>
                <ul className="divide-y divide-gray-300">
                  {modelContent?.orderItems.map((item, index) => (
                    <li
                      key={index}
                      className="py-2 flex justify-between text-sm"
                    >
                      <span>Name: {item?.name}</span>
                      <span>Quantity: {item?.quantity}</span>
                      <span>Rs: {item?.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-center mt-6">
                {modelContent?.orderStatus !== "Delivered" ? (
                  <button
                    onClick={() =>
                      changeStatus(modelContent?._id, modelContent?.orderStatus)
                    }
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
                  >
                    Change status to{" "}
                    {modelContent?.orderStatus === "Pending"
                      ? "Shipped"
                      : "Delivered"}
                  </button>
                ) : (
                  <p className="text-green-500 font-semibold">
                    Order already delivered
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Orders;
