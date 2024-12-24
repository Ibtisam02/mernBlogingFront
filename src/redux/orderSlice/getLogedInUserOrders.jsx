import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit"

const initialState={
    loading:false,
    myOrders:null,
}

export const getMyOrders=createAsyncThunk("/my/order",async()=>{
    try {
        let response= await axios.get(`/orders/me`,{withCredentials:true});
        return response.data;
    } catch (error) {
        console.log(error)
    }
})

const myOrdersSlice=createSlice({
    name:"myOrdersSlice",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getMyOrders.pending,(state)=>{
            state.loading = true;
        })
        .addCase(getMyOrders.fulfilled, (state,action) => {
            state.loading = false;
            state.myOrders=action.payload?.success?action.payload?.orders:null;
          })
        .addCase(getMyOrders.rejected, (state) => {
            state.loading = false;
            state.message=null
          })
    }
})

export default myOrdersSlice.reducer