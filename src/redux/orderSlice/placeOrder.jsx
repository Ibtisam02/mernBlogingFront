import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit"

const initialState={
    loading:false,
    message:null,
}

export const placeOrder=createAsyncThunk("/place/order",async(data)=>{
    console.log(data)
    try {
        let response= await axios.post(`/order/new`,data,{withCredentials:true});
        return response.data;
    } catch (error) {
        console.log(error)
    }
})

const placeOrderSlice=createSlice({
    name:"placeOrderSlice",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(placeOrder.pending,(state)=>{
            state.loading = true;
        })
        .addCase(placeOrder.fulfilled, (state,action) => {
            state.loading = false;
            state.message=action.payload?.success?action.payload?.message:null;
          })
        .addCase(placeOrder.rejected, (state) => {
            state.loading = false;
            state.message=null
          })
    }
})

export default placeOrderSlice.reducer