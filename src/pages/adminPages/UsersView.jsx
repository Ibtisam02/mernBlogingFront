import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrderss } from "../../redux/orderSlice/getAllOrders";
import { HashLoader } from "react-spinners";
import { getUsers } from "../../redux/userSlice/getAllUsers";

function UsersView() {
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers()).then((res) => {
      console.log(res);
    });
  }, [dispatch]);
  let { loading, users } = useSelector((state) => state.allusers);
 
  return (
    <div className="ml-[70px] flex flex-col justify-center items-center">
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
        <div className="px-4 mt-5 w-full">
  <h1 className="text-2xl font-semibold mb-4 text-center">User Management</h1>
  <div className="overflow-x-auto">
    <table className="table-auto w-full border-collapse border border-gray-300 shadow-md">
      <thead className="bg-gray-200">
        <tr>
          <th className="border border-gray-300 px-4 py-2">Avatar</th>
          <th className="border border-gray-300 px-4 py-2">Name</th>
          <th className="border border-gray-300 px-4 py-2">Email</th>
          <th className="border border-gray-300 px-4 py-2">Role</th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user) => (
          <tr key={user?.id} className="text-center hover:bg-gray-100">
            <td className="border border-gray-300 px-4 py-2">
              <img
                className="h-14 w-14 rounded-full object-cover mx-auto"
                src={user?.avatar?.url}
                alt="User Avatar"
              />
            </td>
            <td className="border border-gray-300 px-4 py-2">{user?.name}</td>
            <td className="border border-gray-300 px-4 py-2 text-gray-600">
              {user?.email}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              <span
                className={`px-3 py-1 rounded-xl text-white font-medium ${
                  user?.role === "Admin"
                    ? "bg-blue-500"
                    : "bg-green-500"
                }`}
              >
                {user?.role}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
      )}
    </div>
  );
}

export default UsersView;
