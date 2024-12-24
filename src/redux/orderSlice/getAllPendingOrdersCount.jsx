
import axios from "axios"
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit"

const initialState={
    loading:false,
    pendingOrdersCountt:null,
}

export const getPendingOrdersCount=createAsyncThunk("/admin/pending-orders-count",async ()=>{
    try {
        let response= await axios.get("/admin/pending-orders-count",{withCredentials:true});
        return response.data;
    } catch (error) {
        console.log(error)
    }
})

const getPendingOrdersCountSlice=createSlice({
    name:"getdeliveredOrdersCountSlice",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getPendingOrdersCount.pending, (state) => {
            state.loading = true;
          })
        .addCase(getPendingOrdersCount.fulfilled, (state,action) => {
            state.loading = false;
            state.pendingOrdersCountt=action.payload.success?action.payload?.pendingOrders:null;
          })
        .addCase(getPendingOrdersCount.rejected, (state) => {
            state.loading = false;
            state.pendingOrdersCountt=null
          })
    }
})

export default getPendingOrdersCountSlice.reducer