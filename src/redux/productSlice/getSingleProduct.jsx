import axios from "axios"
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit"

const initialState={
    loading:false,
    SingleProduct:null,
}

export const getSingleProduct=createAsyncThunk("get-single-product",async (id)=>{
    try {
        let response= await axios.get(`/product/${id}`);
        return response.data;
    } catch (error) {
        console.log(error)
    }
})

const getSingleProductSlice=createSlice({
    name:"getLowProductsCountSlice",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getSingleProduct.pending, (state) => {
            state.loading = true;
          })
        .addCase(getSingleProduct.fulfilled, (state,action) => {
            state.loading = false;
            state.SingleProduct=action.payload?.success?action.payload?.product:null;
          })
        .addCase(getSingleProduct.rejected, (state) => {
            state.loading = false;
            state.SingleProduct=null
          })
    }
})

export default getSingleProductSlice.reducer