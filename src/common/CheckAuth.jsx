import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

function CheckAuth({isAuthenticated,user,children}) {
  

  let location=useLocation()

  if(location.pathname==="/"){
    if (!isAuthenticated) {
        return <Navigate to={"/login"}/>
      
    }
    else{
      if (user?.role==="admin") {
        return <Navigate to={"/admin/home"}/>
      }
      if (user?.role==="user") {
        return <Navigate to={"/home"}/>
      }
     
    }
  }
  if(!isAuthenticated && !((location.pathname.includes("/login")|| (location.pathname.includes("/singup"))) )){
    
    return <Navigate to={"/login"}/>
  }
  if (isAuthenticated && user?.role!=="admin" && (location.pathname.includes("/admin"))) {
    return <Navigate to={"/"}/>
  }
  if(isAuthenticated && ((location.pathname.includes("/login")|| location.pathname.includes("/singup")) )){
    if (user?.role==="admin") {
      return <Navigate to={"/admin/home"} />
    }
    else{

      return <Navigate to={"/home"}/>
    }
  }
  


  return <>{children}</>
}

export default CheckAuth