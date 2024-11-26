
import axios from "axios"
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit"

const initialState={
    loading:false,
    deliveredOrdersCount:null,
}

export const getDeliveredOrdersCount=createAsyncThunk("/admin/delivered-orders-count",async ()=>{
    try {
        let response= await axios.get("/admin/delivered-orders-count",{withCredentials:true});
        return response.data;
    } catch (error) {
        console.log(error)
    }
})

const getDeliveredOrdersCountSlice=createSlice({
    name:"getdeliveredOrdersCountSlice",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getDeliveredOrdersCount.pending, (state) => {
            state.loading = true;
          })
        .addCase(getDeliveredOrdersCount.fulfilled, (state,action) => {
            state.loading = false;
            state.deliveredOrdersCount=action.payload.success?action.payload?.deliveredOrders:null;
          })
        .addCase(getDeliveredOrdersCount.rejected, (state) => {
            state.loading = false;
            state.deliveredOrdersCount=null
          })
    }
})

export default getDeliveredOrdersCountSlice.reducer