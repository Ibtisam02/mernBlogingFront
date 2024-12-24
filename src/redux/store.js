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
import updateOrderStatusReducer from "./orderSlice/updateOrderStatus"
import addAReviewReducer from "./reviewSlice/AddAReview"
import addToCartReducer from "./cartSlice/AddToCart"
import getCartReducer from "./cartSlice/GetCart"
import rmFromCartReducer from "./cartSlice/RemoveFromCart"
import homeProductsReducer from "./productSlice/HomeProducts"
import noOfItemsInCartReducer from "./cartSlice/NoOfItemsInCart"
import getAllReviewsReducer from "./reviewSlice/GetAllReviews"
import forgetPasswordReducer from "./userSlice/resetPassword"
import resetPasswordReducer from "./userSlice/forgetPassword"
import placeOrderReducer from "./orderSlice/placeOrder"
import getMyOrdersReducer from "./orderSlice/getLogedInUserOrders"


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
        createSubCatagory:createSubCatagoryReducer,
        updateOrder:updateOrderStatusReducer,
        addAReview:addAReviewReducer,
        addToCartt:addToCartReducer,
        getCart:getCartReducer,
        rmFromCart:rmFromCartReducer,
        homeProducts:homeProductsReducer,
        getNoOfProductsInCart:noOfItemsInCartReducer,
        getAllReviews:getAllReviewsReducer,
        forgetPassword:forgetPasswordReducer,
        resetPasswordReducer:resetPasswordReducer,
        placeTheOrder:placeOrderReducer,
        getMyAllOrders:getMyOrdersReducer
    }
})

export default store