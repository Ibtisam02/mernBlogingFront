import {configureStore} from '@reduxjs/toolkit';
import authReducers from "./authSlice"
import posterReducer from "./posterSlice/AddPoster"
import getPosterReducer from "./posterSlice/GetPoster"
import getDeletePosterReducer from "./posterSlice/DeletePoster"
import getUserCountReducer from "./userSlice/getUsersCount"
import getProductCountReducer from "./productSlice/countProducts"
import getOrderCountReducer from "./orderSlice/getAllOrdersCount"
import getdeliveredOrdersCountSlice from "./orderSlice/getAllDeliveredOrdersCount"
import getPendingOrdersCountSlice from "./orderSlice/getAllPendingOrdersCount"
import getLowStockProductssCountSlice from "./productSlice/lowStockProducts"
import searchProductsOrFilterSlice from "./productSlice/searchProductsOrfilter"
import getAllOrdersSlice from "./orderSlice/getAllOrders"
import createProductSlice from "./productSlice/createProduct"
import getSingleProductSlice from "./productSlice/getSingleProduct"
import updateProductReducer from "./productSlice/updateProduct"
import getAllUsersReducer from "./userSlice/getAllUsers"
import createCatagoryReducer from "./catagorySlice/addACatagory"
import createSubCatagoryReducer from "./catagorySlice/addASubCatagory"


 const store = configureStore({
    reducer:{
        auth:authReducers,
        poster:posterReducer,
        getPoster:getPosterReducer,
        deletePoster:getDeletePosterReducer,
        userCount:getUserCountReducer,
        productCount:getProductCountReducer,
        orderCount:getOrderCountReducer,
        deliveredOrdersCount:getdeliveredOrdersCountSlice,
        pendingOrdersCount:getPendingOrdersCountSlice,
        lowStockProductsCount:getLowStockProductssCountSlice,
        searchProduct:searchProductsOrFilterSlice,
        getAllOders:getAllOrdersSlice,
        createProductss:createProductSlice,
        getSingleProductt:getSingleProductSlice,
        updateProductt:updateProductReducer,
        allusers:getAllUsersReducer,
        createCatagory:createCatagoryReducer,
        createSubCatagory:createSubCatagoryReducer
    }
})

export default store