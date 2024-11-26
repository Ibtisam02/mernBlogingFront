import axios from "axios"
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit"

const initialState={
    loading:false,
    lowStockProductsCount:null,
}

export const getLowProductsCount=createAsyncThunk("/admin/low-stock-products-length",async ()=>{
    try {
        let response= await axios.get("/admin/low-stock-products-length",{withCredentials:true});
        return response.data;
    } catch (error) {
        console.log(error)
    }
})

const getUsersCountSlice=createSlice({
    name:"getLowProductsCountSlice",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getLowProductsCount.pending, (state) => {
            state.loading = true;
          })
        .addCase(getLowProductsCount.fulfilled, (state,action) => {
            state.loading = false;
            state.lowStockProductsCount=action.payload.success?action.payload?.lowStockProducts:null;
          })
        .addCase(getLowProductsCount.rejected, (state) => {
            state.loading = false;
            state.lowStockProductsCount=null
          })
    }
})

export default getUsersCountSlice.reducer