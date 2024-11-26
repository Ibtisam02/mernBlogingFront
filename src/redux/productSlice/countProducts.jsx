import axios from "axios"
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit"

const initialState={
    loading:false,
    productsCount:null,
}

export const getProductsCount=createAsyncThunk("/admin/products-length",async ()=>{
    try {
        let response= await axios.get("/admin/products-length",{withCredentials:true});
        return response.data;
    } catch (error) {
        console.log(error)
    }
})

const getUsersCountSlice=createSlice({
    name:"getProductsCountSlice",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getProductsCount.pending, (state) => {
            state.loading = true;
          })
        .addCase(getProductsCount.fulfilled, (state,action) => {
            state.loading = false;
            state.productsCount=action.payload.success?action.payload?.products:null;
          })
        .addCase(getProductsCount.rejected, (state) => {
            state.loading = false;
            state.productsCount=null
          })
    }
})

export default getUsersCountSlice.reducer