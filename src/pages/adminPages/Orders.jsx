import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrderss } from '../../redux/orderSlice/getAllOrders';
import { HashLoader } from 'react-spinners';

function Orders() {
  let dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getAllOrderss()).then((res)=>{
      console.log(res)
    })
  },[dispatch])
  let { loading ,getAllOrders} = useSelector((state) => state.getAllOders);
  return (
    <div className='ml-[70px] flex flex-col justify-center items-center'>
      <p className='text-center text-2xl font-bold'>Orders</p>
      {loading?<div className="sweet-loading w-full h-screen flex justify-center items-center">
              <HashLoader
                color="#ff0000"
                cssOverride={{}}
                loading={loading}
                size={60}
                speedMultiplier={2}
              />
            </div>:<div className='px-4 flex flex-col gap-y-3 mt-5 w-[95%]'>
        { getAllOrders?.map((order)=>{
          return(
            <div className='px-3 h-16 border border-black flex gap-x-6 justify-between items-center'>
          <img src={order?.user?.avatar?.url} alt="img" />
          <p>{order?.user?.name}</p>
          <p>Items: {order?.orderItems.length}</p>
          <p>{order?.shippingInfo?.phoneNumber}</p>
          <p className='text-red-300'>{order?.user?.email}</p>
          <p className='text-center'>{`${order?.shippingInfo?.city} ${order?.shippingInfo?.country}`}</p>
          <p>Rs: {order?.totalPrice}</p>
          <select className='border border-red-600'>
            <option >--proceed--</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
          <p className='bg-green-400 px-2 rounded-xl '>{order?.orderStatus}</p>
          <p>{order?.createdAt}</p>
        </div>
          )
        })}
      </div>}
    </div>
    
  )
}

export default Orders