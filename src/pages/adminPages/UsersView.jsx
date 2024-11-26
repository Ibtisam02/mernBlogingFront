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
      <p className="text-center text-2xl font-bold">Users</p>
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
        <div className="px-4 flex flex-col gap-y-3 mt-5 w-[95%]">
          {users?.map((user) => {
            return (
              <div className="px-3 h-16 border border-black flex gap-x-6 justify-between items-center">
                <img
                  className="h-14 w-14 rounded-full object-cover"
                  src={user?.avatar?.url}
                  alt="img"
                />
                <div className="w-1/4">
                <p>{user?.name}</p>
                </div>
                <div className="w-1/4">
                <p>{user?.email}</p>
                </div>
                <div className="w-1/4">
                {<p className="bg-green-400 w-fit float-right px-2 rounded-xl ">{user?.role}</p>}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default UsersView;
