import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit"

const initialState={
    loading:false,
    getAllOrders:null,
}

export const getAllOrderss=createAsyncThunk("/admin/get-orders",async()=>{
    try {
        let response= await axios.get("/admin/orders",{withCredentials:true});
        return response.data;
    } catch (error) {
        console.log(error)
    }
})

const getAllOrdersSlice=createSlice({
    name:"getAllOrdersSlice",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getAllOrderss.pending,(state)=>{
            state.loading = true;
        })
        .addCase(getAllOrderss.fulfilled, (state,action) => {
            state.loading = false;
            state.getAllOrders=action.payload?.success?action.payload?.orders:null;
          })
        .addCase(getAllOrderss.rejected, (state) => {
            state.loading = false;
            state.getAllOrders=null
          })
    }
})

export default getAllOrdersSlice.reducer