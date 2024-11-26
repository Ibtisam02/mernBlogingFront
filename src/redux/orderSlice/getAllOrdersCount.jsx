import axios from "axios"
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit"

const initialState={
    loading:false,
    ordersCount:null,
}

export const getOrdersCount=createAsyncThunk("/admin/orders-count",async ()=>{
    try {
        let response= await axios.get("/admin/orders-count",{withCredentials:true});
        return response.data;
    } catch (error) {
        console.log(error)
    }
})


const getOrderssCountSlice=createSlice({
    name:"getOrdersCountSlice",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getOrdersCount.pending, (state) => {
            state.loading = true;
          })
        .addCase(getOrdersCount.fulfilled, (state,action) => {
            state.loading = false;
            state.ordersCount=action.payload.success?action.payload?.orders:null;
          })
        .addCase(getOrdersCount.rejected, (state) => {
            state.loading = false;
            state.ordersCount=null
          })
    }
})

export default getOrderssCountSlice.reducer